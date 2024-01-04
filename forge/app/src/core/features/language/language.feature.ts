import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

declare var localStorage: {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

// Функция для определения платформы
export const isWeb = () => {
  return Platform.OS === 'web';
};

// Функция для сохранения языка в AsyncStorage (React Native) или localStorage (веб)
export const saveLang = (lang: string) => {
  if (isWeb()) {
    localStorage.setItem('lang', lang);
  } else {
    AsyncStorage.setItem('lang', lang);
  }
};

// Функция для извлечения языка из AsyncStorage (React Native) или localStorage (веб)
export const getLang = async () => {
  let lang = null;
  if (isWeb()) {
    lang = localStorage.getItem('lang');
  } else {
    lang = await AsyncStorage.getItem('lang');
  }
  return lang;
};
