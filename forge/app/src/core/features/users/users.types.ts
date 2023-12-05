import { ErrorResponse } from 'core/types/requests';

export const UserAtomKey = 'UserAtomKey';
export const TokenAtomKey = 'TokenKey';

export interface UserPayload {
  name: string;
  email: string;
  sername: string;
  patronymic: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  sername: string;
  username: string;

  blocked: boolean;
  provider: string;
  confirmed: boolean;
  createdAt: string;
  updatedAt: string;
  patronymic: string;
}

export type SignInResponse = ErrorResponse & SignInSuccessResponse;

export interface SignInPayload {
  identifier: string;
  password: string;
}

export interface SignInSuccessResponse {
  jwt: string;
  user: User;
}
