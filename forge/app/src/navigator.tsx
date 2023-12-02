import { AppNavigator } from 'core/navigators/app.navigator';
import { AuthNavigator } from 'core/navigators/auth.navigator';

import FaqScreen from 'core/modules/FaqScreen';
import NewsScreen from 'core/modules/NewsScreen';
import HomeScreen from './home/home.screen';
import WalletScreen from 'core/modules/wallet/wallet.screen';
import PartnersScreen from 'core/modules/partners/partners.screen';
import { DocumentsScreen } from 'core/modules/documents';
import GrowthChartScreen from 'core/modules/GrowthChartScreen';

import { useAuth } from 'core/providers/auth.provider';
import { userAtom } from 'core/features/users/users.atoms';
import { useRecoilValue } from 'recoil';
import { Loader } from 'core/components/loader';
import { useTranslation } from 'react-i18next';

export function Navigator() {
  const { t } = useTranslation();
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
        ]}
      />
    )) || <AuthNavigator />
  );
}
