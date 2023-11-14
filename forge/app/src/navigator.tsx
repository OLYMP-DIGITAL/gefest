import { AppNavigator } from 'core/navigators/app.navigator';
import { AuthNavigator } from 'core/navigators/auth.navigator';

import FaqScreen from 'core/modules/FaqScreen';
import NewsScreen from 'core/modules/NewsScreen';
import HomeScreen from './home/home.screen';
import WalletScreen from 'core/modules/WalletScreen';
import PartnersScreen from 'core/modules/partners/partners.screen';
import DocumentsScreen from 'core/modules/DocumentsScreen';
import GrowthChartScreen from 'core/modules/GrowthChartScreen';

export function Navigator() {
  // const [token] = useAtom(tokenAtom);
  const token = false;

  return (
    (!token && (
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
