import api from 'core/services/api';
import { SignInPayload, SignInResponse, User } from './users.types';

export enum UserRoutes {
  me = 'users/me',
  signIn = 'auth/local',
  update = 'users/:id',
}

export const fetchMe = (): Promise<User> => {
  return api.get<User>(UserRoutes.me);
};

export const signIn = (values: SignInPayload): Promise<SignInResponse> => {
  return api.post<SignInResponse>(UserRoutes.signIn, values);
};

export const update = (user: User): Promise<User> => {
  return api.put<User>(
    UserRoutes.update.replace(/:id/g, String(user.id)),
    user
  );
};
