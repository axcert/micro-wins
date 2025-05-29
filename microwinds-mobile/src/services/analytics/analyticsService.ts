import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { apiClient } from '@/services/api/apiClient';
import {
  DashboardSummary,
  ProgressData,
  GoalProgress,
  StreakData,
  ChartData,
  ExportOptions,
  CachedAnalytics,
} from '@/types/analytics';

class AnalyticsService {
  private static instance: AnalyticsService;
  private cacheKeyPrefix = 'analytics_';
  private cacheDuration = 15 * 60 * 1000; // 15 minutes
  private unsubscribeNetInfo: (() => void) | null = null;
  private isOnline: boolean = true;

  private constructor() {
    this.initializeNetworkListener();
  }

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  private initializeNetworkListener(): void {
    this.unsubscribeNetInfo = NetInfo.addEventListener(state => {
      this.isOnline = state.isConnected ?? false;
    });
  }

  public cleanup(): void {
    if (this.unsubscribeNetInfo) {
      this.unsubscribeNetInfo();
    }
  }

  /**
   * Fetch dashboard summary with caching
   */
  public async getDashboardSummary(forceRefresh: boolean = false): Promise<DashboardSummary> {
    const cacheKey = `${this.cacheKeyPrefix}dashboard`;

    if (!forceRefresh && !this.isOnline) {
      const cached = await this.getCachedData<DashboardSummary>(cacheKey);
      if (cached) {
        return cached;
      }
      throw new Error('No internet connection and no cached data available');
    }

    if (!forceRefresh) {
      const cached = await this.getCachedData<DashboardSummary>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    try {
      const response = await apiClient.get<{ data: DashboardSummary }>('/api/progress/dashboard');
      const data = response.data.data;
      
      await this.setCachedData(cacheKey, data);
      return data;
    } catch (error: any) {
      console.error('Failed to fetch dashboard summary:', error);
      
      // Try to return cached data on error
      const cached = await this.getCachedData<DashboardSummary>(cacheKey);
      if (cached) {
        return cached;
      }
      
      throw error;
    }
  }

  /**
   * Fetch progress timeline with pagination
   */
  public async getProgressTimeline(
    page: number = 1,
    perPage: number = 30,
    dateRange?: { startDate: string; endDate: string }
  ): Promise<{ data: ProgressData[]; hasMore: boolean }> {
    const cacheKey = `${this.cacheKeyPrefix}timeline_${page}_${perPage}`;

    if (!this.isOnline) {
      const cached = await this.getCachedData<ProgressData[]>(cacheKey);
      if (cached) {
        return { data: cached, hasMore: false };
      }
    }

    try {
      const params: any = { page, per_page: perPage };
      if (dateRange) {
        params.start_date = dateRange.startDate;
        params.end_date = dateRange.endDate;
      }

      const response = await apiClient.get<{
        data: ProgressData[];
        meta: { current_page: number; total: number; per_page: number };
      }>('/api/progress/timeline', { params });

      const { data, meta } = response.data;
      const hasMore = meta.current_page * meta.per_page < meta.total;

      await this.setCachedData(cacheKey, data);
      return { data, hasMore };
    } catch (error: any) {
      console.error('Failed to fetch progress timeline:', error);
      
      const cached = await this.getCachedData<ProgressData[]>(cacheKey);
      if (cached) {
        return { data: cached, hasMore: false };
      }
      
      throw error;
    }
  }

  /**
   * Fetch goal progress statistics
   */
  public async getGoalProgress(): Promise<GoalProgress[]> {
    const cacheKey = `${this.cacheKeyPrefix}goal_progress`;

    if (!this.isOnline) {
      const cached = await this.getCachedData<GoalProgress[]>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    try {
      const response = await apiClient.get<{ data: GoalProgress[] }>('/api/progress/stats');
      const data = response.data.data;
      
      await this.setCachedData(cacheKey, data);
      return data;
    } catch (error: any) {
      console.error('Failed to fetch goal progress:', error);
      
      const cached = await this.getCachedData<GoalProgress[]>(cacheKey);
      if (cached) {
        return cached;
      }
      
      throw error;
    }
  }

  /**
   * Fetch streak information
   */
  public async getStreakData(): Promise<StreakData> {
    const cacheKey = `${this.cacheKeyPrefix}streaks`;

    try {
      const response = await apiClient.get<{ data: StreakData }>('/api/progress/streaks');
      const data = response.data.data;
      
      await this.setCachedData(cacheKey, data);
      return data;
    } catch (error: any) {
      console.error('Failed to fetch streak data:', error);
      
      const cached = await this.getCachedData<StreakData>(cacheKey);
      if (cached) {
        return cached;
      }
      
      throw error;
    }
  }

  /**
   * Transform data for charts
   */
  public prepareChartData(progressData: ProgressData[], days: number = 7): ChartData {
    const recentData = progressData.slice(-days);
    
    return {
      labels: recentData.map(item => {
        const date = new Date(item.date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }),
      datasets: [
        {
          data: recentData.map(item => item.completionRate),
          color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    };
  }

  /**
   * Export progress data
   */
  public async exportProgressData(options: ExportOptions): Promise<{ url: string }> {
    try {
      const response = await apiClient.post<{ data: { url: string } }>(
        '/api/progress/export',
        options
      );
      
      return response.data.data;
    } catch (error: any) {
      console.error('Failed to export progress data:', error);
      throw error;
    }
  }

  /**
   * Clear all analytics cache
   */
  public async clearCache(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const analyticsKeys = keys.filter(key => key.startsWith(this.cacheKeyPrefix));
      await AsyncStorage.multiRemove(analyticsKeys);
    } catch (error) {
      console.error('Failed to clear analytics cache:', error);
    }
  }

  /**
   * Get cached data with expiration check
   */
  private async getCachedData<T>(key: string): Promise<T | null> {
    try {
      const cached = await AsyncStorage.getItem(key);
      if (!cached) return null;

      const { data, timestamp, expiresAt }: CachedAnalytics = JSON.parse(cached);
      
      if (new Date() > new Date(expiresAt)) {
        await AsyncStorage.removeItem(key);
        return null;
      }

      return data as T;
    } catch (error) {
      console.error('Failed to read cached analytics data:', error);
      return null;
    }
  }

  /**
   * Set cached data with expiration
   */
  private async setCachedData<T>(key: string, data: T): Promise<void> {
    try {
      const cached: CachedAnalytics = {
        data,
        timestamp: new Date().toISOString(),
        expiresAt: new Date(Date.now() + this.cacheDuration).toISOString(),
      };
      
      await AsyncStorage.setItem(key, JSON.stringify(cached));
    } catch (error) {
      console.error('Failed to cache analytics data:', error);
    }
  }
}

export const analyticsService = AnalyticsService.getInstance();