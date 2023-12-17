import { AppNavigator } from 'core/navigators/app-navigator/app.navigator';
import { AuthNavigator } from 'core/navigators/auth.navigator';
import HomeScreen from './home/home.screen';
import WalletScreen from 'core/modules/wallet/wallet.screen';
import PartnersScreen from 'core/modules/partners/partners.screen';
import DocumentsScreen from 'core/modules/documents/documents.screen';
import { FaqScreen } from 'core/modules/FAQ';
import GrowthChartScreen from 'core/modules/GrowthChartScreen';
import { NewsScreen } from 'core/modules/news';

import { Loader } from 'core/components/loader';
import { userAtom } from 'core/features/users/users.atoms';
import { useAuth } from 'core/providers/auth.provider';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { PaymentScreen } from 'core/modules/payment/payment.screen';
import ArticleScreen from 'core/modules/ArticleScreen';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Navigator() {
  const { t } = useTranslation();
  const { isLoading } = useAuth();
  const user = useRecoilValue(userAtom);

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    (user && (
      <NavigationContainer
        initialState={restoredState}
        onStateChange={(state) => persistNavigationState(state)}
      >
        <AppNavigator
          screens={[
            {
              name: t('wallet.title'),
              component: WalletScreen,
              iconSrc: require('assets/wallet-icon.png'),
            },
            {
              name: t('cabinet'),
              component: HomeScreen,
              iconSrc: require('assets/profile-icon.png'),
            },
            {
              name: t('grpahGrow'),
              component: GrowthChartScreen,
              iconSrc: require('assets/growth-icon.png'),
            },
            {
              name: t('partners'),
              component: PartnersScreen,
              iconSrc: require('assets/partners-icon.png'),
            },
            {
              name: t('documents.title'),
              component: DocumentsScreen,
              iconSrc: require('assets/documents-icon.png'),
            },
            {
              name: t('news'),
              component: NewsScreen,
              iconSrc: require('assets/news-icon.png'),
            },
            {
              name: t('faq'),
              component: FaqScreen,
              iconSrc: require('assets/faq-icon.png'),
            },
            {
              name: 'Payment',
              component: PaymentScreen,
              hidden: true,
            },
            {
              name: 'Article',
              component: ArticleScreen,
              hidden: true,
            },
          ]}
        />
      </NavigationContainer>
    )) || <AuthNavigator />
  );
}
