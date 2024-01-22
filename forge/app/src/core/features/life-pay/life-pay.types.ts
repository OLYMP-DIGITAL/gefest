/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
export interface LifePayTransaction {
  id: number;
  points: number;
  shareCount: number;
  dollarRate: number;
  transactionId: string;
  transactionLink: string;
  createdAt: string;
  updatedAt: string;
  shareValue: string;
  status: string;
  amount: number;
}
