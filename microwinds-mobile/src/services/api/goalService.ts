import { apiClient } from './apiClient';
import { 
  CreateGoalRequest, 
  GoalType, 
  GoalWithSteps, 
  GoalProcessingStatus 
} from '@/types/goal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

interface GoalApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  processing_status?: string;
}

interface PaginatedGoalsResponse {
  success: boolean;
  message: string;
  data: GoalType[];
  meta: {
    current_page: number;
    total: number;
    per_page: number;
  };
}

class GoalService {
  private static instance: GoalService;
  private processingStatusCache: Map<string, GoalProcessingStatus> = new Map();
  private pollingIntervals: Map<string, NodeJS.Timeout> = new Map();

  private constructor() {}

  static getInstance(): GoalService {
    if (!GoalService.instance) {
      GoalService.instance = new GoalService();
    }
    return GoalService.instance;
  }

  /**
   * Create a new goal with AI processing
   */
  async createGoal(goalData: CreateGoalRequest): Promise<GoalApiResponse<GoalType>> {
    try {
      const response = await apiClient.post<GoalApiResponse<GoalType>>(
        '/api/goals',
        goalData
      );

      // Cache the created goal
      await this.cacheGoal(response.data.data);

      // Start polling for processing status if needed
      if (response.data.processing_status === 'queued') {
        this.startProcessingStatusPolling(response.data.data.id);
      }

      return response.data;
    } catch (error: any) {
      console.error('Failed to create goal:', error);
      
      // Check if offline and queue for later
      const networkState = await NetInfo.fetch();
      if (!networkState.isConnected) {
        await this.queueGoalForOfflineCreation(goalData);
        throw new Error('Goal queued for creation when online');
      }
      
      throw error;
    }
  }

  /**
   * Get user's goals with optional filters
   */
  async getUserGoals(filters?: {
    status?: string;
    per_page?: number;
    page?: number;
  }): Promise<PaginatedGoalsResponse> {
    try {
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.per_page) params.append('per_page', filters.per_page.toString());
      if (filters?.page) params.append('page', filters.page.toString());

      const response = await apiClient.get<PaginatedGoalsResponse>(
        `/api/goals?${params.toString()}`
      );

      // Cache goals for offline access
      await this.cacheUserGoals(response.data.data);

      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch goals:', error);
      
      // Try to return cached goals if offline
      const networkState = await NetInfo.fetch();
      if (!networkState.isConnected) {
        const cachedGoals = await this.getCachedUserGoals();
        if (cachedGoals) {
          return {
            success: true,
            message: 'Loaded from cache',
            data: cachedGoals,
            meta: {
              current_page: 1,
              total: cachedGoals.length,
              per_page: cachedGoals.length
            }
          };
        }
      }
      
      throw error;
    }
  }

  /**
   * Get goal with micro-steps
   */
  async getGoalWithSteps(goalId: string): Promise<GoalApiResponse<GoalWithSteps>> {
    try {
      const response = await apiClient.get<GoalApiResponse<GoalWithSteps>>(
        `/api/goals/${goalId}`
      );

      // Cache goal with steps
      await this.cacheGoalWithSteps(response.data.data);

      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch goal with steps:', error);
      
      // Try cached version
      const cached = await this.getCachedGoalWithSteps(goalId);
      if (cached) {
        return {
          success: true,
          message: 'Loaded from cache',
          data: cached
        };
      }
      
      throw error;
    }
  }

  /**
   * Get goal processing status
   */
  async getProcessingStatus(goalId: string): Promise<GoalProcessingStatus> {
    // Check memory cache first
    const cached = this.processingStatusCache.get(goalId);
    if (cached) return cached;

    try {
      const response = await apiClient.get<GoalApiResponse<GoalProcessingStatus>>(
        `/api/goals/${goalId}/processing-status`
      );

      const status = response.data.data;
      this.processingStatusCache.set(goalId, status);

      // Stop polling if processing is complete
      if (status.status === 'completed' || status.status === 'failed') {
        this.stopProcessingStatusPolling(goalId);
      }

      return status;
    } catch (error: any) {
      console.error('Failed to fetch processing status:', error);
      throw error;
    }
  }

  /**
   * Start polling for goal processing status
   */
  private startProcessingStatusPolling(goalId: string, interval: number = 5000): void {
    // Clear existing interval if any
    this.stopProcessingStatusPolling(goalId);

    const pollInterval = setInterval(async () => {
      try {
        const status = await this.getProcessingStatus(goalId);
        
        // Notify listeners about status update
        this.notifyProcessingStatusUpdate(goalId, status);

        // Stop polling if complete
        if (status.status === 'completed' || status.status === 'failed') {
          this.stopProcessingStatusPolling(goalId);
        }
      } catch (error) {
        console.error('Error polling processing status:', error);
      }
    }, interval);

    this.pollingIntervals.set(goalId, pollInterval);
  }

  /**
   * Stop polling for goal processing status
   */
  private stopProcessingStatusPolling(goalId: string): void {
    const interval = this.pollingIntervals.get(goalId);
    if (interval) {
      clearInterval(interval);
      this.pollingIntervals.delete(goalId);
    }
  }

  /**
   * Subscribe to processing status updates
   */
  subscribeToProcessingStatus(
    goalId: string,
    callback: (status: GoalProcessingStatus) => void
  ): () => void {
    const eventName = `goal-processing-${goalId}`;
    const handler = (event: any) => callback(event.detail);
    
    window.addEventListener(eventName, handler);
    
    // Return unsubscribe function
    return () => window.removeEventListener(eventName, handler);
  }

  /**
   * Notify about processing status update
   */
  private notifyProcessingStatusUpdate(goalId: string, status: GoalProcessingStatus): void {
    const event = new CustomEvent(`goal-processing-${goalId}`, { detail: status });
    window.dispatchEvent(event);
  }

  /**
   * Cache goal for offline access
   */
  private async cacheGoal(goal: GoalType): Promise<void> {
    try {
      const key = `goal_${goal.id}`;
      await AsyncStorage.setItem(key, JSON.stringify(goal));
    } catch (error) {
      console.error('Failed to cache goal:', error);
    }
  }

  /**
   * Cache user goals
   */
  private async cacheUserGoals(goals: GoalType[]): Promise<void> {
    try {
      await AsyncStorage.setItem('user_goals', JSON.stringify(goals));
      await AsyncStorage.setItem('user_goals_timestamp', Date.now().toString());
    } catch (error) {
      console.error('Failed to cache user goals:', error);
    }
  }

  /**
   * Get cached user goals
   */
  private async getCachedUserGoals(): Promise<GoalType[] | null> {
    try {
      const goalsJson = await AsyncStorage.getItem('user_goals');
      if (!goalsJson) return null;
      
      return JSON.parse(goalsJson);
    } catch (error) {
      console.error('Failed to get cached user goals:', error);
      return null;
    }
  }

  /**
   * Cache goal with steps
   */
  private async cacheGoalWithSteps(goal: GoalWithSteps): Promise<void> {
    try {
      const key = `goal_with_steps_${goal.id}`;
      await AsyncStorage.setItem(key, JSON.stringify(goal));
    } catch (error) {
      console.error('Failed to cache goal with steps:', error);
    }
  }

  /**
   * Get cached goal with steps
   */
  private async getCachedGoalWithSteps(goalId: string): Promise<GoalWithSteps | null> {
    try {
      const key = `goal_with_steps_${goalId}`;
      const goalJson = await AsyncStorage.getItem(key);
      if (!goalJson) return null;
      
      return JSON.parse(goalJson);
    } catch (error) {
      console.error('Failed to get cached goal with steps:', error);
      return null;
    }
  }

  /**
   * Queue goal for offline creation
   */
  private async queueGoalForOfflineCreation(goalData: CreateGoalRequest): Promise<void> {
    try {
      const queuedGoals = await AsyncStorage.getItem('queued_goals');
      const queue = queuedGoals ? JSON.parse(queuedGoals) : [];
      
      queue.push({
        ...goalData,
        queuedAt: Date.now(),
        id: `temp_${Date.now()}`
      });
      
      await AsyncStorage.setItem('queued_goals', JSON.stringify(queue));
    } catch (error) {
      console.error('Failed to queue goal for offline creation:', error);
    }
  }

  /**
   * Process queued goals when online
   */
  async processQueuedGoals(): Promise<void> {
    try {
      const queuedGoals = await AsyncStorage.getItem('queued_goals');
      if (!queuedGoals) return;
      
      const queue = JSON.parse(queuedGoals);
      const remainingQueue = [];
      
      for (const goalData of queue) {
        try {
          await this.createGoal(goalData);
        } catch (error) {
          // Keep in queue if failed
          remainingQueue.push(goalData);
        }
      }
      
      // Update queue with remaining items
      if (remainingQueue.length > 0) {
        await AsyncStorage.setItem('queued_goals', JSON.stringify(remainingQueue));
      } else {
        await AsyncStorage.removeItem('queued_goals');
      }
    } catch (error) {
      console.error('Failed to process queued goals:', error);
    }
  }

  /**
   * Clear all cached goals
   */
  async clearGoalCache(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const goalKeys = keys.filter(key => 
        key.startsWith('goal_') || 
        key === 'user_goals' || 
        key === 'user_goals_timestamp'
      );
      
      await AsyncStorage.multiRemove(goalKeys);
    } catch (error) {
      console.error('Failed to clear goal cache:', error);
    }
  }

  /**
   * Cleanup on logout
   */
  async cleanup(): void {
    // Stop all polling intervals
    this.pollingIntervals.forEach((interval) => clearInterval(interval));
    this.pollingIntervals.clear();
    
    // Clear memory caches
    this.processingStatusCache.clear();
    
    // Clear storage cache
    await this.clearGoalCache();
  }
}

export const goalService = GoalService.getInstance();