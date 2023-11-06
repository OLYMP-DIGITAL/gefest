import { DrawerScreenProps } from '@react-navigation/drawer';
import { NavigationStack } from 'core/types/navigation';
import { Button, Text, View } from 'react-native';

export function HomeScreen({ navigation }: DrawerScreenProps<NavigationStack>) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to parters"
        onPress={() => navigation.navigate('Partners')}
      />
      <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
    </View>
  );
}

export default HomeScreen;
