import { useEffect, useState } from 'react';
import {
  Button,
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationStack } from 'core/types/navigation';

import api from 'core/services/api';
import { DrawerScreenProps } from '@react-navigation/drawer';
import env, { envKyes } from 'core/services/env';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { ImageData } from './partners.types';

export const PartnersScreen = ({
  navigation,
}: DrawerScreenProps<NavigationStack>) => {
  const { t } = useTranslation();
  const [partners, setPartners] = useState([]);
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    try {
      api.get('partners?populate=image').then((result: any) => {
        setPartners(result.data || []);
      });
    } catch (e) {
      console.log('Error on downloading partners', e);
    }
  }, []);

  useEffect(() => {
    if (partners && partners.length) {
      let imagesInfo: ImageData[] = [];

      partners.map((data: any) => {
        if (data && data.attributes) {
          imagesInfo.push({
            name: data.attributes.title,
            url: data.attributes.image.data.attributes.url,
            link: data.attributes.link,
          });
        }
      });

      setImages(imagesInfo);
    }
  }, [partners]);

  return (
    <ScrollView>
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
            paddingBottom: 20,
            color: '#403f3f',
            fontFamily: `'Montserrat-Regular', sans-serif`,
          }}
        >
          {t('partners')}
        </Text>
        <View
          style={{
            flex: 1,
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            justifyContent: 'center',
            padding: 20,
            backgroundColor: '#f0f7f8',
            ...Platform.select({
              ios: {
                flexDirection: 'column',
              },
              android: {
                flexDirection: 'column',
              },
              web: {
                flexDirection: 'row',
              },
            }),
          }}
        >
          {images &&
            images.map((image) => (
              <>
                <TouchableOpacity
                  onPress={() => {
                    if (image.link) {
                      Linking.canOpenURL(image.link)
                        .then((supported) => {
                          if (!supported) {
                            console.log("Can't handle url: " + image.link);
                          } else {
                            return Linking.openURL(image.link);
                          }
                        })
                        .catch((err) =>
                          console.error('An error occurred', err)
                        );
                    } else {
                      Linking.canOpenURL(`${env[envKyes.apiHost]}${image.url}`)
                        .then((supported) => {
                          if (!supported) {
                            console.log("Can't handle url: " + image.url);
                          } else {
                            return Linking.openURL(
                              `${env[envKyes.apiHost]}${image.url}`
                            );
                          }
                        })
                        .catch((err) =>
                          console.error('An error occurred', err)
                        );
                    }
                  }}
                  style={{ flex: 1 }}
                >
                  <View key={`image-${image.name}`} style={{ margin: 10 }}>
                    <Image
                      style={{ width: 300, height: 150 }}
                      source={{ uri: `${env[envKyes.apiHost]}${image.url}` }}
                      resizeMode="cover"
                    />
                  </View>
                </TouchableOpacity>
              </>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default PartnersScreen;
