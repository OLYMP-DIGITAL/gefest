/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
// themes.ts

export const lightTheme = {
  dark: '#263238',
  link: '#246BFD',
  white: '#ffff',
  primary: '#D43238',
  greyscale50: '#FAFAFA',
  greyscale200: '#EEEEEE',
  greyscale500: '#9E9E9E',
  greyscale900: '#212121',
  primaryBackground: '#ffffff', // Светлый фон
  primaryText: '#000000', // Цвет текста на светлом фоне
  // Добавьте другие цвета и свойства для светлой темы
  secondaryText: '#6e7376',
  cardBorder: '#424242',
  error: '#FF3C41',

  // Typography
  fontDisplay: '#F1F2F6',
  fontTitle: '#3E4157',
  fontBody: '#212121',
  fontCaption: '#757575',
};

export const darkTheme: typeof lightTheme = {
  dark: '#263238',
  link: '#246BFD',
  white: '#ffff',
  primary: '#D43238',
  greyscale50: '#FAFAFA',
  greyscale200: '#EEEEEE',
  greyscale500: '#9E9E9E',
  greyscale900: '#212121',
  primaryBackground: '#000000', // Темный фон
  primaryText: '#ffffff', // Цвет текста на темном фоне
  // Добавьте другие цвета и свойства для темной темы
  secondaryText: '#bdbdbd',
  cardBorder: '#424242',
  error: '#FF3C41',

  // Typography
  fontDisplay: '#F1F2F6',
  fontTitle: '#3E4157',
  fontBody: '#212121',
  fontCaption: '#757575',
};

export type Theme = typeof lightTheme;
