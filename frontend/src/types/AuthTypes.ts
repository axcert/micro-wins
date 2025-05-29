export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData extends LoginData {
  name: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}