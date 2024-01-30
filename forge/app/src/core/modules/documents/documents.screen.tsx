/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import Button from 'core/components/button';
import { LangsEnum } from 'core/features/language/language.types';
import { useLanguage } from 'core/providers/language.provider';
import env, { envKyes } from 'core/services/env';
import { Card } from 'core/ui/components/card';
import { TextBody } from 'core/ui/components/typography/text-body';
import { TextDisplay } from 'core/ui/components/typography/text-display';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useRecoilState } from 'recoil';
import { fetchDocuments } from './documents.api';
import { documentsAtom } from './documents.atom';
import { document } from './documents.types';

export const DocumentsScreen = () => {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [documents, setDocuments] = useRecoilState(documentsAtom);

  const fetchDocumentList = async () => {
    try {
      const response = await fetchDocuments();

      if (response && response.data && response.data.length !== 0) {
        let cleanedData: document[] = response.data.map((value) => ({
          id: value.id,
          ru: value.attributes.ru,
          eng: value.attributes.eng,
          link: value.attributes.document.data.attributes.url,
          name: value.attributes.document.data.attributes.name,
        }));
        setDocuments(cleanedData);
      } else {
        console.error('No documents data', response);
      }
    } catch (e) {
      console.error('Error fetching documents', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocumentList();
  }, [lang]);

  const handleDownload = (document: document) => {
    const url = `${env[envKyes.apiHost]}${document.link}`;

    if (url) {
      Linking.openURL(url).catch((error) =>
        console.error('Error opening document:', error)
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fc440f" style={styles.loader} />
      ) : (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.container}
        >
          <TextDisplay>{t('documents.title')}</TextDisplay>
          <Card style={styles.card}>
            {(Array.isArray(documents) &&
              documents.length &&
              documents.map((document) => (
                <View
                  key={`document-${document.id}`}
                  style={styles.btnContainer}
                >
                  <Button
                    title={
                      lang === LangsEnum.ru
                        ? document.ru.toUpperCase()
                        : document.eng.toUpperCase()
                    }
                    onPress={() => handleDownload(document)}
                  />
                </View>
              ))) || <TextBody>{t('documents.documentsInWork')}</TextBody>}
          </Card>
          {/* <View style={styles.line}>
        <Button
          title="Go to parters"
          onPress={() => navigation.navigate('Partners')}
        />
      </View>

      <Button title="Open drawer" onPress={() => navigation.openDrawer()} /> */}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
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
