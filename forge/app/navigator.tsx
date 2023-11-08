import { useAtom } from 'jotai';

import HomeScreen from './home/home.screen';
import PartnersScreen from '@core/modules/partners/partners.screen';

import { authAtom } from './app.atoms';
import { AppNavigator } from '@core/navigators/app.navigator';
import { AuthNavigator } from '@core/navigators/auth.navigator';

export function Navigator() {
  const [auth] = useAtom(authAtom);

  return (
    (auth && (
      <AppNavigator
        screens={[
          {
            name: 'Home',
            component: HomeScreen,
          },
          {
            name: 'Partners',
            component: PartnersScreen,
          },
        ]}
      />
    )) || <AuthNavigator />
  );
}
