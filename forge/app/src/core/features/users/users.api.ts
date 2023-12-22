import api from 'core/services/api';
import {
  ResetPasswordPayload,
  SignInPayload,
  SignInResponse,
  SupportEmailResponse,
  User,
  UserPayload,
} from './users.types';
import env, { envKyes } from 'core/services/env';

export enum UserRoutes {
  me = 'users/me?populate=*',
  signIn = 'auth/local',
  update = 'users/:id',
  getSupport = 'support',
  resetPassword = '/auth/forgot-password',
}

export const fetchMe = (): Promise<User> => {
  return api.get<User>(UserRoutes.me);
};

export const signIn = (values: SignInPayload): Promise<SignInResponse> => {
  return api.post<SignInResponse>(UserRoutes.signIn, values);
};

export const update = (user: UserPayload, id: User['id']): Promise<User> => {
  return api.put<User>(UserRoutes.update.replace(/:id/g, String(id)), user);
};

export const fetchSupportEmail = (): Promise<SupportEmailResponse> => {
  return api.get<SupportEmailResponse>(UserRoutes.getSupport);
  
export const resetPassword = (email: ResetPasswordPayload): Promise<{ data: any}> => {
  return api.post(`${env[envKyes.apiHost]}${UserRoutes.resetPassword}`, email);
};
