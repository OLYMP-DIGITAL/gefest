import { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';
import { NavigationStack } from 'core/types/navigation';

import api from 'core/services/api';

type Props = NativeStackScreenProps<NavigationStack, 'Partners'>;

export const PartnersScreen = ({ navigation }: Props) => {
  useEffect(() => {
    api.get('api/partners').then((result) => {
      console.log('RESULT!', result);
    });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>PartnersScreen Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default PartnersScreen;
