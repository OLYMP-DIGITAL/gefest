/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
export interface InvestmentStage {
  start: string;
  end: string;
  title: string;
  description: string;
  max: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface GetInvestmentStageResponse {
  data: [
    {
      id: 1;
      attributes: InvestmentStage;
    }
  ];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
