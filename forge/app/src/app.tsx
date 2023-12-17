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
  const [restoredState, setRestoredState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem('navigationState');
        if (savedStateString) {
          const savedState = JSON.parse(savedStateString);
          setRestoredState(savedState);
        }
      } catch (error) {
        console.error('Error restoring navigation state:', error);
      }
    };

    restoreState();
  }, []);

  const persistNavigationState = async (state: NavigationState | undefined) => {
    if (state) {
      try {
        const serializedState = JSON.stringify(state);
        await AsyncStorage.setItem('navigationState', serializedState);
      } catch (error) {
        console.error('Error persisting navigation state:', error);
      }
    }
  };
  
  return (
    <RecoilRoot>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <NavigationContainer
              initialState={restoredState}
              onStateChange={(state) => persistNavigationState(state)}
            >
              <ToastProvider placement="bottom">
                <Navigator />
              </ToastProvider>
            </NavigationContainer>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </RecoilRoot>
  );
}

export default App;
