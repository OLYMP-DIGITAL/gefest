import { NavigationContainer, NavigationState } from '@react-navigation/native';

import { Navigator } from './navigator';
import { ThemeProvider } from './core/providers/theme.provider';

import i18n from './i18';
import AuthProvider from 'core/providers/auth.provider';
import { RecoilRoot } from 'recoil';
import { ToastProvider } from 'react-native-toast-notifications';
import { LanguageProvider } from 'core/providers/language.provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
const initI18n = i18n;

function App() {
  return (
    <RecoilRoot>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
              <ToastProvider placement="bottom">
                <Navigator />
              </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default App;
