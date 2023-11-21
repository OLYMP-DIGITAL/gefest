import { NavigationContainer } from '@react-navigation/native';

import { Navigator } from './navigator';
import { ThemeProvider } from 'core/providers/theme.provider';

import i18n from './i18';
import AuthProvider from 'core/providers/auth.provider';
const initI18n = i18n;

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
