/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
export const configUUID = 'api::config.config';

export interface Config {
  companyValue: string;
  payloadRedirect: string;
  referralCommission: string;
}
