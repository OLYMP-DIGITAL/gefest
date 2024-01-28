/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { ThemeProvider } from './core/providers/theme.provider';
import { Navigator } from './navigator';

import AuthProvider from 'core/providers/auth.provider';
import { LanguageProvider } from 'core/providers/language.provider';
import { ToastProvider } from 'react-native-toast-notifications';
import { RecoilRoot } from 'recoil';

import i18n from './i18';
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
