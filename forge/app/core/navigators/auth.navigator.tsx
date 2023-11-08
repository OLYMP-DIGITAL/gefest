import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { useMemo } from 'react';
import { Image, View } from 'react-native';

import { useTheme } from '@core/providers/theme.provider';

import SignInScreen from '@core/modules/auth/sign-in.screen';
import WelcomeScreen from '@core/modules/auth/welcome.screen';
import SignUpScreen from '@core/modules/auth/sign-up.screen';

const navigationOptions: NativeStackNavigationOptions = {
  title: 'Custom Header Title', // Заголовок шапки
  headerStyle: {
    backgroundColor: 'blue', // Цвет фона шапки
  },
  headerTintColor: 'white', // Цвет текста в шапке
};

interface NavigatorItem {
  name: string;
  component: any;
}

const screens: Array<NavigatorItem> = [
  {
    name: 'Welcome',
    component: WelcomeScreen,
  },
  {
    name: SignInScreen.route,
    component: SignInScreen,
  },
  {
    name: SignUpScreen.route,
    component: SignUpScreen,
  },
];

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  const { theme } = useTheme();

  const options = useMemo(
    () => ({
      ...navigationOptions,
      headerStyle: {
        ...(navigationOptions.headerStyle as Object),
        backgroundColor: theme.dark,
      },
      headerTitle() {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ width: 200, height: 40, marginRight: 10 }}
              source={require('@assets/logo.png')}
            />
          </View>
        );
      },
    }),
    [theme]
  );

  return (
    <Stack.Navigator initialRouteName="Welcome">
      {screens.map(({ name, component }) => (
        <Stack.Screen
          key={`navigator-screen-${name}`}
          name={name}
          options={options as any}
          component={component}
        />
      ))}
    </Stack.Navigator>
  );
}
