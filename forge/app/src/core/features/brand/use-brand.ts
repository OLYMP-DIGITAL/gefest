/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useRecoilState } from 'recoil';
import { brandAtom } from './brand.atoms';
import { useEffect } from 'react';
import { getBrand } from './brand.api';
import { Brand } from './brand.types';
import { envKyes, getEnv } from 'core/services/env';

export const useBrand = () => {
  const [brand, setBrand] = useRecoilState<Brand>(brandAtom);

  useEffect(() => {
    if (!brand.headImage) {
      getBrand().then((response) => {
        setBrand({
          headImage: `${getEnv(envKyes.apiHost)}${
            response.data.attributes.headImage.data.attributes.formats.large.url
          }`,
          primaryColor: response.data.attributes.primaryColor,
        });
      });
    }
  }, []);

  return brand;
};
