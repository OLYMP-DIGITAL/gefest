import { NavigationProp } from '@react-navigation/native';

export enum NavigatorScreensEnum {
  wallet = 'wallet',
  cabinet = 'cabinet',
  grpahGrow = 'grpahGrow',
  partners = 'partners',
  documents = 'documents',
  news = 'news',
  faq = 'faq',
  payment = 'payment',
}

export type ScreenNames = [
  'Home',
  'Partners',
  'Payment',
  'SignIn',
  'SignUp',
  'Welcome',
  'Finished',
  'News'
]; // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

export type NavigationStack = {
  Home: undefined;
  Partners: undefined;
  News: undefined;

  // Payment
  Payment: undefined;

  // Auth navigator
  SignIn: undefined;
  SignUp: undefined;
  Welcome: undefined;
  Finished: undefined;
};
