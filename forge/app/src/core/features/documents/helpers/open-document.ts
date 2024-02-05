/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import env, { envKyes } from 'core/services/env';
import { Document } from '../documents.types';
import { Linking } from 'react-native';

export const openDocument = (document: Document): void => {
  const url = `${env[envKyes.apiHost]}${document.link}`;

  if (url) {
    Linking.openURL(url).catch((error) =>
      console.error('Error opening document:', error)
    );
  }
};
