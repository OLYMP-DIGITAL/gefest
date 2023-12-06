import api from 'core/services/api';
import {
  SignInPayload,
  SignInResponse,
  User,
  UserPayload,
} from './users.types';

export enum UserRoutes {
  me = 'users/me?populate=*',
  signIn = 'auth/local',
  update = 'users/:id',
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
