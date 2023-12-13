import Button from 'core/components/button';
import i18next from 'i18next';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRecoilValue } from 'recoil';
import { documentsAtom } from './documents.atom';
import { fetchDocuments } from './documents.api';

export const DocumentsScreen = () => {
  const { t } = useTranslation();
  const documents = useRecoilValue(documentsAtom);

  console.log(i18next.language);

  useEffect(() => {
      fetchDocuments();
    },
    []);
  /*   const documents = [
    t('documents.instructions'),
    t('documents.agreement'),
    t('documents.legalInfo'),
    t('documents.legalRegulation'),
    t('documents.conditions'),
    t('documents.confidentiality'),
    t('documents.trust'),
    t('documents.risk'),
  ];
 */
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
    >
      {Array.isArray(documents) &&
        documents.map((document, index) => (
          <View key={`document-${index}`} style={styles.btnContainer}>
            <Button
              title={
                <TouchableOpacity
                  onPress={() => {
                    const url = 'https://google.com';
                    Linking.openURL(url)
                      .then(() => console.log(`Открыт URL: ${url}`))
                      .catch((err) =>
                        console.error('Ошибка при открытии URL: ', err)
                      );
                  }}
                  style={styles.link}
                >
                  {i18next.language === 'ru' && document.ru.toUpperCase()}
                  {i18next.language === 'eng' && document.eng.toUpperCase()}
                </TouchableOpacity>
              }
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
});

export default DocumentsScreen;
