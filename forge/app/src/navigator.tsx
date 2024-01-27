/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import DocumentsScreen from 'core/modules/documents/documents.screen';
import WalletScreen from 'core/modules/wallet/wallet.screen';
import { AppNavigator } from 'core/navigators/app-navigator/app.navigator';
import { AuthNavigator } from 'core/navigators/auth.navigator';
import CabinetScreen from './home/cabinet.screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { Loader } from 'core/components/loader';
import { userAtom } from 'core/features/users/users.atoms';
import { useAuth } from 'core/providers/auth.provider';
import { NavigatorScreensEnum } from 'core/types/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useInit } from 'core/hooks/use-public-init';
import { View } from 'react-native';
import { ProgressBar } from 'core/ui/components/progress-bar';
import { appLoadingAtom } from 'core/atoms/app-loading.atom';

export function Navigator() {
  // Загружаем стартовые данные
  useInit();

  const { isLoading } = useAuth();
  const user = useRecoilValue(userAtom);
  const loading = useRecoilValue(appLoadingAtom);

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
        if (user) {
          const serializedState = JSON.stringify(state);
          await AsyncStorage.setItem('navigationState', serializedState);
        }
      } catch (error) {
        console.error('Error persisting navigation state:', error);
      }
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <NavigationContainer
      initialState={restoredState}
      onStateChange={(state) => persistNavigationState(state)}
    >
      {loading && (
        <View
          id="app-progress-bar"
          style={{
            position: 'absolute',
            width: '100%',
            height: 20,
            top: 0,
            zIndex: 1,
          }}
        >
          <ProgressBar />
        </View>
      )}
      {(() => {
        if (user) {
          return (
            <AppNavigator
              screens={[
                {
                  name: NavigatorScreensEnum.wallet,
                  component: WalletScreen,
                  iconSrc: require('assets/wallet-icon.png'),
                },
                {
                  name: NavigatorScreensEnum.cabinet,
                  component: CabinetScreen,
                  iconSrc: require('assets/profile-icon.png'),
                },
                // {
                //   name: NavigatorScreensEnum.grpahGrow,
                //   component: GrowthChartScreen,
                //   iconSrc: require('assets/growth-icon.png'),
                // },
                // {
                //   name: NavigatorScreensEnum.partners,
                //   component: PartnersScreen,
                //   iconSrc: require('assets/partners-icon.png'),
                // },
                {
                  name: NavigatorScreensEnum.documents,
                  component: DocumentsScreen,
                  iconSrc: require('assets/documents-icon.png'),
                },
                // {
                //   name: NavigatorScreensEnum.news,
                //   component: NewsScreen,
                //   iconSrc: require('assets/news-icon.png'),
                // },
                // {
                //   name: NavigatorScreensEnum.faq,
                //   component: FaqScreen,
                //   iconSrc: require('assets/faq-icon.png'),
                // },
                // {
                //   name: NavigatorScreensEnum.payment,
                //   component: PaymentScreen,
                //   hidden: true,
                // },
              ]}
            />
          );
        } else {
          return <AuthNavigator />;
        }
      })()}
    </NavigationContainer>
  );
}
