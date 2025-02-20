/**
 * API for authentication
 * @description This file exports functions that make requests to the server API for authentication.
 * The login function sends a POST request to /auth/login with the user's credentials.
 * The register function sends a POST request to /auth/register with the user's credentials.
 */
import { api } from './axios';
import { LoginCredentials, User } from '../types/user';

interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export const authApi = {
  login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>('/auth/login', credentials),
  
  register: (credentials: LoginCredentials) =>
    api.post<AuthResponse>('/auth/register', credentials),
};