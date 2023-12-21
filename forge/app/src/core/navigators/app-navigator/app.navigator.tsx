import {
  DrawerScreenProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { Drawer } from 'core/navigators/app-navigator/components/drawer';
import { Header } from 'core/navigators/app-navigator/components/header';
import { NavigationStack } from 'core/types/navigation';
import { configAtom, fetchConfig } from 'core/features/config/config.feature';
import { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';

const initialRoute = 'wallet';
interface AppNavigatorScreen {
  name: string;
  component: ({ navigation }: DrawerScreenProps<NavigationStack>) => Element;

  hidden?: boolean; // is visible on menu or not
  iconSrc?: any;
}

const screenOptions: any = {
  drawerActiveTintColor: 'white',
  activeBackgroundColor: 'white',
  drawerInactiveTintColor: 'white',
  inactiveBackgroundColor: 'white',
  drawerActiveBackgroundColor: '#41454c',
};

interface Props {
  screens: Array<AppNavigatorScreen>;
}

const DrawerNavigatorInstance = createDrawerNavigator();

export function AppNavigator({ screens }: Props) {
  const { t } = useTranslation();

  const setConfig = useSetRecoilState(configAtom);

  useEffect(() => {
    fetchConfig().then((conf) => {
      if (conf.data) {
        setConfig(conf.data.attributes);
      }
    });
  }, []);

  return (
    <DrawerNavigatorInstance.Navigator
      initialRouteName={initialRoute}
      // to make the drawer open permanently on web
      // screenOptions={Platform.OS === 'web' ? { drawerType: 'permanent' } : {}}
      drawerContent={(props) => <Drawer {...props} />}
    >
      {screens.map(({ name, component: Component, iconSrc, hidden }) => (
        <DrawerNavigatorInstance.Screen
          key={`screen-${name}`}
          name={name}
          component={Component as any}
          options={{
            ...(screenOptions as any),
            drawerLabelStyle: {
              ...styles.menuItems,
              display: hidden ? 'none' : 'flex',
            },
            title: t(`screens.${name as string}`),

            drawerIcon: () => (
              <Image style={styles.drawerIcon} source={iconSrc} />
            ),

            header: ({ navigation }) => (
              <Header title={name} navigation={navigation} />
            ),
          }}
        />
      ))}
    </DrawerNavigatorInstance.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },

  menuItems: {
    color: 'white',
    fontSize: 16,
    textWrap: 'wrap',
    wordWrap: 'break-word',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
});
