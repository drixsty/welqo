// Common shared types

export interface ApiResponse<T> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface ApiError {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
  timestamp: string;
}

export type Locale = "fr" | "en";

export interface PaginationQuery {
  page?: number;
  limit?: number;
}
