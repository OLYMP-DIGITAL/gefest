/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
export interface Brand {
  headImage: string;
  primaryColor: string;
}

export interface BrandResponse {
  data: {
    id: number;
    attributes: {
      createdAt: '2024-01-24T23:06:01.607Z';
      updatedAt: '2024-01-24T23:06:01.607Z';
      locale: 'en';
      primaryColor: string;
      headImage: {
        data: {
          id: number;
          attributes: {
            name: string;
            alternativeText: null;
            caption: null;
            width: number;
            height: number;
            formats: {
              large: {
                ext: string;
                url: string;
                hash: string;
                mime: 'image/png';
                name: string;
                path: null;
                size: number;
                width: number;
                height: number;
              };
              small: {
                ext: string;
                url: string;
                hash: string;
                mime: 'image/png';
                name: string;
                path: null;
                size: number;
                width: number;
                height: number;
              };
              medium: {
                ext: string;
                url: string;
                hash: string;
                mime: 'image/png';
                name: string;
                path: null;
                size: number;
                width: number;
                height: number;
              };
              thumbnail: {
                ext: string;
                url: string;
                hash: string;
                mime: 'image/png';
                name: string;
                path: null;
                size: number;
                width: number;
                height: number;
              };
            };
            hash: string;
            ext: string;
            mime: 'image/png';
            size: number;
            url: string;
            previewUrl: null;
            provider: string;
            provider_metadata: null;
            createdAt: string;
            updatedAt: string;
          };
        };
      };
    };
  };
}
