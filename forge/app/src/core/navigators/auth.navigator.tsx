import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import { useMemo } from 'react';
import { Image, View } from 'react-native';

import { useTheme } from 'core/providers/theme.provider';

import SignInScreen from 'core/modules/auth/sign-in/sign-in.screen';
import WelcomeScreen from 'core/modules/auth/welcome.screen';
import SignUpScreen from 'core/modules/auth/sign-up.screen';
import FinishedScreen from 'core/modules/auth/finished.screen';
import { AuthScreensEnum } from 'core/types/navigation';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from 'core/components/lang-switcher';

const navigationOptions: NativeStackNavigationOptions = {
  title: 'Custom Header Title', // Заголовок шапки
  headerStyle: {
    backgroundColor: '#263238', // Цвет фона шапки
  },
  headerTintColor: 'white', // Цвет текста в шапке
};

interface NavigatorItem {
  name: string;
  component: any;
}

const screens: Array<NavigatorItem> = [
  {
    name: AuthScreensEnum.finished,
    component: FinishedScreen,
  },
  {
    name: AuthScreensEnum.welcome,
    component: WelcomeScreen,
  },
  {
    name: AuthScreensEnum.signIn,
    component: SignInScreen,
  },
  {
    name: AuthScreensEnum.signUp,
    component: SignUpScreen,
  },
];

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const options = useMemo(
    () => ({
      ...navigationOptions,
      headerStyle: {
        ...(navigationOptions.headerStyle as Object),
        backgroundColor: theme.dark,
      },
      headerTintColor: theme.secondaryText,
      headerTitle() {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ width: 200, height: 40, marginRight: 10 }}
              source={require('assets/logo.png')}
            />
          </View>
        );
      },
      headerRight() {
        return (
          <View style={{ marginRight: 20 }}>
            <LangSwitcher />
          </View>
        )
      },
    }),
    [theme]
  );

  return (
    <Stack.Navigator initialRouteName={AuthScreensEnum.welcome}>
      {screens.map(({ name, component }) => (
        <Stack.Screen
          key={`navigator-screen-${name}`}
          name={name}
          options={{
            ...options, title: t(`authScreens.${name as string}`)
          }}
          component={component}
        />
      ))}
    </Stack.Navigator>
  );
}
