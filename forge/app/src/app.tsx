import { NavigationContainer } from '@react-navigation/native';

import { Navigator } from './navigator';
import { ThemeProvider } from './core/providers/theme.provider';

import i18n from './i18';
import AuthProvider from 'core/providers/auth.provider';
import { RecoilRoot } from 'recoil';
import { ToastProvider } from 'react-native-toast-notifications';
const initI18n = i18n;

function App() {
  return (
    <RecoilRoot>
      <AuthProvider>
        <ThemeProvider>
          <NavigationContainer>
            <ToastProvider placement="top">
              <Navigator />
            </ToastProvider>
          </NavigationContainer>
        </ThemeProvider>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default App;
