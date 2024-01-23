/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
export const UsersUID = 'plugin::users-permissions.user';

export interface User {
  id: number;
  points: number;
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken: null;
  confirmationToken: null;
  confirmed: true;
  blocked: false;
  createdAt: string;
  updatedAt: string;
  name: string;
  phone: string;
  passportConfirmed: true;
  lastname: string;
  middlename: string;
  referal: number;
  role: {
    id: number;
    name: string;
    description: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
}
