/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

declare var localStorage: {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};

// Функция для определения платформы
const isWeb = () => {
  return Platform.OS === 'web';
};

// Функция для сохранения токена в AsyncStorage (React Native) или localStorage (веб)
export const saveToken = (token: string) => {
  if (isWeb()) {
    localStorage.setItem('token', token);
  } else {
    AsyncStorage.setItem('token', token);
  }
};

// Функция для извлечения токена из AsyncStorage (React Native) или localStorage (веб)
export const getToken = async () => {
  let token = null;
  if (isWeb()) {
    token = localStorage.getItem('token');
  } else {
    token = await AsyncStorage.getItem('token');
  }
  return token;
};

// Пример использования функций сохранения и извлечения токена
// const yourToken = 'your_jwt_token_here';

// // Сохранение токена
// saveToken(yourToken);

// // Извлечение токена
// getToken().then((token) => {
//   if (token) {
//     console.log('Token:', token);
//   } else {
//     console.log('Token not found');
//   }
// });
