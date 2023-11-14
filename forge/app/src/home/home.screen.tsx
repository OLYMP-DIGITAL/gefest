import { useTranslation } from 'react-i18next';
import { NavigationStack } from 'core/types/navigation';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { Image, StyleSheet, View } from 'react-native';

// import Button from 'core/components/button';

export function HomeScreen({ navigation }: DrawerScreenProps<NavigationStack>) {
  const { t } = useTranslation();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      }}
    >
      {/* <Text>{t('welcome')}</Text> */}
      <Image
        style={{ width: '70%', height: '100%' }}
        source={{ uri: require('assets/cabinet.png') }}
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
}

const styles = StyleSheet.create({
  line: {
    marginBottom: 20,
  },
});

export default HomeScreen;
