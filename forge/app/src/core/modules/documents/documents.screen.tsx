/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import Button from 'core/components/button';
import { useDocuments } from 'core/features/documents/use-documents';
import env, { envKyes } from 'core/services/env';
import { Card } from 'core/ui/components/card';
import { ScreenLayout } from 'core/ui/components/screen-layout/screen-layout';
import { TextBody } from 'core/ui/components/typography/text-body';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Platform, StyleSheet } from 'react-native';
import { Document } from '../../features/documents/documents.types';

export const DocumentsScreen = () => {
  const { t } = useTranslation();
  const documents = useDocuments();

  const handleDownload = (document: Document) => {
    const url = `${env[envKyes.apiHost]}${document.link}`;

    if (url) {
      Linking.openURL(url).catch((error) =>
        console.error('Error opening document:', error)
      );
    }
  };

  return (
    <>
      <ScreenLayout title={t('documents.title')}>
        <Card style={styles.card}>
          {(Array.isArray(documents) &&
            documents.length &&
            documents.map((document) => (
              <Button
                key={`document-${document.id}`}
                title={document.title}
                onPress={() => handleDownload(document)}
              />
            ))) || <TextBody>{t('documents.documentsInWork')}</TextBody>}
        </Card>
      </ScreenLayout>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginTop: 20,
  },

  container: {
    alignSelf: 'center',
    marginTop: 20,
    width: '70%',
    ...Platform.select({
      ios: {
        width: '100%',
      },
      android: {
        width: '100%',
      },
    }),
  },
  btnContainer: {
    width: '100%',
    fontWeight: '600',
    padding: 3,
  },
  link: {
    color: '#3f9978',
    fontFamily: `'Montserrat-Regular', sans-serif`,
  },
  loader: {
    padding: 15,
  },
});

export default DocumentsScreen;
