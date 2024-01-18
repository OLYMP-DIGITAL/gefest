import { ErrorResponse } from 'core/types/requests';

export const UserAtomKey = 'UserAtomKey';
export const TokenAtomKey = 'TokenKey';

interface Image {
  id: number;
}

export interface UserPayload {
  name: string;
  email: string;
  phone: string;
  lastname: string;
  middlename: string;
  passportNumber: string;
  registeredAddress: string;
}

export interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  lastname: string;
  username: string;
  passportNumber: string;
  registeredAddress: string;

  passportFace: null | Image;
  faceWithPassport: null | Image;
  passportConfirmed: boolean;
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
};
