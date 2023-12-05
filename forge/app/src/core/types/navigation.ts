import { NavigationProp } from '@react-navigation/native';

export type ScreenNames = [
  'Home',
  'Partners',
  'Payment',
  'SignIn',
  'SignUp',
  'Welcome',
  'Finished',
  'Article',
  'News'
]; // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

export type NavigationStack = {
  Home: undefined;
  Partners: undefined;

  // Payment
  Payment: undefined;

  // Auth navigator
  SignIn: undefined;
  SignUp: undefined;
  Welcome: undefined;
  Finished: undefined;

  // News details
  Article: undefined;
  News: undefined;
};
