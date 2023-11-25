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
import { userAtom } from 'core/features/users/users.atoms';
import { useRecoilValue } from 'recoil';
import { ActivityIndicator, View } from 'react-native';

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
  const { isLoading } = useAuth();
  const user = useRecoilValue(userAtom);

  if (isLoading) {
    return <LoaderView />;
  }

  return (
    (user && (
      <AppNavigator
        screens={[
          {
            name: 'Мой кошелек',
            component: WalletScreen,
          },
          {
            name: 'Личный кабинет',
            component: HomeScreen,
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
