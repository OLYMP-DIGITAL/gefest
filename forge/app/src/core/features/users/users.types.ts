import { ErrorResponse } from 'core/types/requests';

export const UserAtomKey = 'UserAtomKey';
export const TokenAtomKey = 'TokenKey';

interface Image {
  id: number;
}

export interface UserPayload {
  name: string;
  email: string;
  lastname: string;
  middlename: string;
}

export interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  lastname: string;
  username: string;

  passportFace: null | Image;
  passportConfirmed: boolean;
  faceWithPassport: null | Image;
  passportRegistration: null | Image;

  blocked: boolean;
  provider: string;
  confirmed: boolean;
  createdAt: string;
  updatedAt: string;
  middlename: string;
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

export type ResetPasswordPayload = {
  email: string;
}