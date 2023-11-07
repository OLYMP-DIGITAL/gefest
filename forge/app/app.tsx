import { Drawer } from 'core/components/drawer';
import { PartnersScreen } from 'core/modules/partners';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './home/home.screen';

import i18n from './i18';
const initI18n = i18n;

function App() {
  return (
    <NavigationContainer>
      <Drawer
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
    </NavigationContainer>
  );
}

export default App;
