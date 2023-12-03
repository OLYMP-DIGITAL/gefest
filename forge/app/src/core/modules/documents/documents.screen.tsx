import Button from 'core/components/button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export const DocumentsScreen = () => {
  const { t } = useTranslation();
  const documents = [
    t('documents.instructions'),
    t('documents.agreement'),
    t('documents.legalInfo'),
    t('documents.legalRegulation'),
    t('documents.conditions'),
    t('documents.confidentiality'),
    t('documents.trust'),
    t('documents.risk'),
  ];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
    >
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&display=swap');
      </style>
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
                  {document.toUpperCase()}
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
    fontFamily: `'Montserrat', sans-serif`,
  },
});

export default DocumentsScreen;
