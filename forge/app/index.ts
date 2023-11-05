import registerRootComponent from 'expo/build/launch/registerRootComponent';

import App from './app';
import { enableLegacyWebImplementation } from 'react-native-gesture-handler';

enableLegacyWebImplementation(true);
registerRootComponent(App);
