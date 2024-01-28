/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import api from 'core/services/api';
import { Brand, BrandResponse } from './brand.types';

export enum BrandRoutes {
  get = 'brand?populate=*',
}

export const getBrand = async (): Promise<BrandResponse> => {
  return await api.get<BrandResponse>(BrandRoutes.get);
};
