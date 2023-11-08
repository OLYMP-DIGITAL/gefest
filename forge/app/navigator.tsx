import { useAtom } from 'jotai';

import HomeScreen from './home/home.screen';
import PartnersScreen from '@core/modules/partners/partners.screen';

import { AppNavigator } from '@core/navigators/app.navigator';
import { AuthNavigator } from '@core/navigators/auth.navigator';
import { tokenAtom } from './app.atoms';
import WalletScreen from '@core/modules/WalletScreen';
import GrowthChartScreen from '@core/modules/GrowthChartScreen';
import DocumentsScreen from '@core/modules/DocumentsScreen';
import NewsScreen from '@core/modules/NewsScreen';
import FaqScreen from '@core/modules/FaqScreen';

export function Navigator() {
  const [token] = useAtom(tokenAtom);

  return (
    (token && (
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
