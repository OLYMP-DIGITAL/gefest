/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { ShareCost, ShareUUID } from './shares.types';

export const getCurrentShareValue = async () => {
  // Текущая стоимость доли
  const shareValue: ShareCost = await strapi
    .query(ShareUUID)
    .findOne({ orderBy: { createdAt: 'desc' } });

  return shareValue;
};
