import {
  DrawerItem,
  DrawerItemList,
  DrawerScreenProps,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { NavigationStack } from '@core/types/navigation';

interface DrawerMenuItem {
  label: string;
  onPress?: () => void;
}

interface DrawerScreen {
  name: string;
  component: ({ navigation }: DrawerScreenProps<NavigationStack>) => Element;
}

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

interface DrawerProps {
  screens: Array<DrawerScreen>;
  menuItems?: Array<DrawerMenuItem>;
}

const DrawerNavigatorInstance = createDrawerNavigator();

export function AppNavigator({ screens }: DrawerProps) {
  return (
    <DrawerNavigatorInstance.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {screens.map(({ name, component: Component }) => (
        <DrawerNavigatorInstance.Screen
          key={`screen-${name}`}
          name={name}
          component={Component as any}
        />
      ))}
    </DrawerNavigatorInstance.Navigator>
  );
}
