export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  error_code?: string;
  meta?: {
    current_page?: number;
    total?: number;
    per_page?: number;
    links?: {
      next?: string;
      prev?: string;
    };
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    current_page: number;
    total: number;
    per_page: number;
    links?: {
      next?: string;
      prev?: string;
    };
  };
}

export interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
  error_code?: string;
}