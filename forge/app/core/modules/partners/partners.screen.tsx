import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
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
      <Text>Partners Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Home')}
      />

      {partners.map((partner: any, index) => (
        <Text key={`partner-title-${index}`}>{partner.attributes.title}</Text>
      ))}
    </View>
  );
};

export default PartnersScreen;
