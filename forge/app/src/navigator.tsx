import { AppNavigator } from 'core/navigators/app.navigator';
import { AuthNavigator } from 'core/navigators/auth.navigator';

import FaqScreen from 'core/modules/FaqScreen';
import NewsScreen from 'core/modules/NewsScreen';
import HomeScreen from './home/home.screen';
import WalletScreen from 'core/modules/wallet/wallet.screen';
import PartnersScreen from 'core/modules/partners/partners.screen';
import DocumentsScreen from 'core/modules/DocumentsScreen';
import GrowthChartScreen from 'core/modules/GrowthChartScreen';

import { useAuth } from 'core/providers/auth.provider';
import { userAtom } from 'core/features/users/users.atoms';
import { useRecoilValue } from 'recoil';
import { Loader } from 'core/components/loader';

export function Navigator() {
  const { isLoading } = useAuth();
  const user = useRecoilValue(userAtom);

  if (isLoading) {
    return <Loader />;
  }

  return (
    (user && (
      <AppNavigator
        screens={[
          {
            name: 'Мой кошелек',
            component: WalletScreen,
            iconSrc: require('assets/wallet-icon.png'),
          },
          {
            name: 'Личный кабинет',
            component: HomeScreen,
            iconSrc: require('assets/profile-icon.png'),
          },
          {
            name: 'График роста',
            component: GrowthChartScreen,
            iconSrc: require('assets/growth-icon.png'),
          },
          {
            name: 'Партнеры',
            component: PartnersScreen,
            iconSrc: require('assets/partners-icon.png'),
          },
          {
            name: 'Документы',
            component: DocumentsScreen,
            iconSrc: require('assets/documents-icon.png'),
          },
          {
            name: 'Новости',
            component: NewsScreen,
            iconSrc: require('assets/news-icon.png'),
          },
          {
            name: 'Faq',
            component: FaqScreen,
            iconSrc: require('assets/faq-icon.png'),
          },
        ]}
      />
    )) || <AuthNavigator />
  );
}
