import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import HomeScreen from 'core/modules/home/home.screen';
import { PartnersScreen } from 'core/modules/partners';

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const DrawerInstance = createDrawerNavigator();

export function Drawer() {
  return (
    <DrawerInstance.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerInstance.Screen name="Home" component={HomeScreen as any} />
      <DrawerInstance.Screen
        name="Partners"
        component={PartnersScreen as any}
      />
    </DrawerInstance.Navigator>
  );
}
