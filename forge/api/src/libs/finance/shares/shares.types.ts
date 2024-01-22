/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
export const ShareUUID = 'api::share-amount.share-amount';

export interface ShareCost {
  id: number;
  value: number;
  news: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale: string;
}
