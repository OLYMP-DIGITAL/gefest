/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */

import { User, UsersUID } from '../../users/users.types';

export async function updateUserPoints(value: number, user: User) {
  console.log('UPDATING USER POINTS ===> ', value);

  return await strapi.entityService.update(UsersUID, user.id, {
    data: {
      points: value,
    } as any,
  });
}
