import { ApiError } from '../error/error';

export interface ApiResponse<T> {
    data?: T;
    error?: ApiError;
}
