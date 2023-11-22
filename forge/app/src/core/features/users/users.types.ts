export const UserAtomKey = 'UserAtomKey';

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
