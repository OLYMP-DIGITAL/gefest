import Button from 'core/components/button';
import env, { envKyes } from 'core/services/env';
import i18next from 'i18next';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Linking,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRecoilState } from 'recoil';
import { fetchDocuments } from './documents.api';
import { documentsAtom } from './documents.atom';
import { document } from './documents.types';

export const DocumentsScreen = () => {
  const { t } = useTranslation();
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
  }, []);

  const handleDownload = (document: document) => {
    const url = `${env[envKyes.apiHost]}${document.link}`;

    if (url) {
      Linking.openURL(url)
        .then(() => console.log('Document opened'))
        .catch((error) => console.error('Error opening document:', error));
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
          {Array.isArray(documents) &&
            documents.map((document) => (
              <View key={`document-${document.id}`} style={styles.btnContainer}>
                <Button
                  title={
                    i18next.language === 'ru'
                      ? document.ru.toUpperCase()
                      : document.eng.toUpperCase()
                  }
                  onPress={() => handleDownload(document)}
                />
              </View>
            ))}
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
  container: {
    alignSelf: 'center',
    width: '95%',
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
