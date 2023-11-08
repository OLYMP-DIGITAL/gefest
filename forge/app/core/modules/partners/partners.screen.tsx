import { useEffect, useState } from 'react';
import { Button, Image, Text, View } from 'react-native';
import { NavigationStack } from '@core/types/navigation';

import api from '@core/services/api';
import { DrawerScreenProps } from '@react-navigation/drawer';

export const PartnersScreen = ({
  navigation,
}: DrawerScreenProps<NavigationStack>) => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    api.get('api/partners').then((result: any) => {
      console.log('RESULT!', result);
      setPartners(result.data);
    });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>{t('welcome')}</Text> */}
      <Image
        style={{ width: '70%', height: '100%' }}
        source={{ uri: require('@assets/partners.png') }}
      />

      {/* <View style={styles.line}>
        <Button
          title="Go to parters"
          onPress={() => navigation.navigate('Partners')}
        />
      </View>

      <Button title="Open drawer" onPress={() => navigation.openDrawer()} /> */}
    </View>
  );
};

export default PartnersScreen;
