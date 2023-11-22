import api from 'core/services/api';
import { User } from './users.types';

export enum UserRoutes {
  me = 'users/me',
}

export const fetchMe = (): Promise<User> => {
  return api.get<User>(UserRoutes.me);
};
