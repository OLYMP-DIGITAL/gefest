import { ErrorResponse } from 'core/types/requests';

export const UserAtomKey = 'UserAtomKey';
export const TokenAtomKey = 'TokenKey';

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  sername: string;
  patronymic: string;
  createdAt: string;
  updatedAt: string;
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
