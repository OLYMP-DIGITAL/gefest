import { useEffect, useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
import { NavigationStack } from 'core/types/navigation';

import api from 'core/services/api';
import { DrawerScreenProps } from '@react-navigation/drawer';
import env, { envKyes } from 'core/services/env';
import { ScrollView } from 'react-native-gesture-handler';

interface ImageData {
  name: string,
  link: string
}
export const PartnersScreen = ({
  navigation,
}: DrawerScreenProps<NavigationStack>) => {
  const [partners, setPartners] = useState([]);
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    try {
      api.get('partners?populate=image').then((result: any) => {
        setPartners(result.data || []);
      })
    } catch (e) {
      console.log('Error on downloading partners', e)
    };
  }, []);

  useEffect(() => {
    if (partners && partners.length) {
      let imagesInfo: ImageData[] = [];

      partners.map((data: any) => {
        if (data && data.attributes) {
          imagesInfo.push({ name: data.attributes.title, link: data.attributes.image.data.attributes.url })
        }
      })

      setImages(imagesInfo)
    }
  }, [partners])

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <View style={{ flex: 1, flexDirection: "row", flexWrap: 'wrap', alignContent: 'flex-start', justifyContent: 'center' }}>
          {images && images.map((image) =>
            <View key={`image-${image.name}`}
              style={{ margin: 10 }}>
              <Image
                style={{ width: 300, height: 150 }}
                source={{ uri: `${env[envKyes.apiHost]}${image.link}` }}
              />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default PartnersScreen;
