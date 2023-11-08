import { Provider, atom } from 'jotai';
import { NavigationContainer } from '@react-navigation/native';

import { Navigator } from './navigator';
import { ThemeProvider } from '@core/providers/theme.provider';

import i18n from './i18';
const initI18n = i18n;

function App() {
  return (
    <Provider>
      <ThemeProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
