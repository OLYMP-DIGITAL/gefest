import { AppNavigator } from 'core/navigators/app.navigator';
import { AuthNavigator } from 'core/navigators/auth.navigator';

import FaqScreen from 'core/modules/FaqScreen';
import NewsScreen from 'core/modules/NewsScreen';
import HomeScreen from './home/home.screen';
import WalletScreen from 'core/modules/WalletScreen';
import PartnersScreen from 'core/modules/partners/partners.screen';
import DocumentsScreen from 'core/modules/DocumentsScreen';
import GrowthChartScreen from 'core/modules/GrowthChartScreen';
import { useAuth } from 'core/providers/auth.provider';
import { ActivityIndicator, View } from 'react-native';
import { useEffect } from 'react';

const LoaderView = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export function Navigator() {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <LoaderView />;
  }

  console.log('USER!!!', user);

  useEffect(() => {
    console.log('User was updated', user);
  }, [user]);

  return (
    (user && (
      <AppNavigator
        screens={[
          {
            name: 'Личный кабинет',
            component: HomeScreen,
          },
          {
            name: 'Мой кошелек',
            component: WalletScreen,
          },
          {
            name: 'График роста',
            component: GrowthChartScreen,
          },
          {
            name: 'Партнеры',
            component: PartnersScreen,
          },
          {
            name: 'Документы',
            component: DocumentsScreen,
          },
          {
            name: 'Новости',
            component: NewsScreen,
          },
          {
            name: 'Faq',
            component: FaqScreen,
          },
        ]}
      />
    )) || <AuthNavigator />
  );
}
