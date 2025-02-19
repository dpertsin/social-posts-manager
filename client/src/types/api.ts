export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ErrorResponse {
  message: string;
}