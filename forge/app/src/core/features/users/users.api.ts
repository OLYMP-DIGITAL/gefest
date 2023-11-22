import api from 'core/services/api';
import { SignInPayload, SignInResponse, User } from './users.types';

export enum UserRoutes {
  me = 'users/me',
  signIn = 'auth/local',
}

export const fetchMe = (): Promise<User> => {
  return api.get<User>(UserRoutes.me);
};

export const signIn = (values: SignInPayload): Promise<SignInResponse> => {
  return api.post<SignInResponse>(UserRoutes.signIn, values);
};
