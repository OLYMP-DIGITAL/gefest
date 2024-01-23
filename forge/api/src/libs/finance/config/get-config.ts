/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { configUUID } from './config.types';

export async function getConfig() {
  try {
    return await strapi.entityService.findOne(configUUID, 1);
  } catch (error) {
    return Promise.reject(error);
  }
}
