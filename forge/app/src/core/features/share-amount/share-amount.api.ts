import api from 'core/services/api';

export enum ShareAmountRoutes {
  get = 'shares-amount',
}

export interface ResponsePagination {
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface GetShareAmountResponse extends ResponsePagination {
  data: [
    {
      id: number;
      attributes: {
        amount: number;
        news: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        locale: string;
      };
    }
  ];
}

export const getShareAmount = (): Promise<GetShareAmountResponse> => {
  return api.get<GetShareAmountResponse>(ShareAmountRoutes.get);
};
