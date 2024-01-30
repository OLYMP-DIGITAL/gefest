/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { LangsEnum } from 'core/features/language/language.types';

export interface DocumentsResponse {
  data: DocumentsResponseData[];
}

type DocumentsResponseData = {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: LangsEnum;
    agreement: boolean;
    title: string;
    document: ImageFile | PdfFile;
  };
};

type ImageFile = {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        thumbnail: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: string | null;
          size: number;
          width: number;
          height: number;
        };
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
};

type PdfFile = {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: string | null;
      height: string | null;
      formats: string | null;
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export interface Document {
  id: number;
  title: string;
  link: string;
  name: string;
}

export interface faqResponse {
  data: responseDataObject[];
}

type responseDataObject = {
  id: number;
  attributes: { title: string; description: string };
};

export interface faq {
  id: number;
  title: string;
  description: string;
}

export const FaqAtomKey = 'FaqAtomKey';
