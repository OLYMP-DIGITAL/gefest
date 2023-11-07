import {
  DrawerItem,
  DrawerItemList,
  DrawerScreenProps,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { NavigationStack } from 'core/types/navigation';

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

const DrawerInstance = createDrawerNavigator();

export function Drawer({ screens }: DrawerProps) {
  return (
    <DrawerInstance.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {screens.map(({ name, component: Component }) => (
        <DrawerInstance.Screen
          key={`screen-${name}`}
          name={name}
          component={Component as any}
        />
      ))}
    </DrawerInstance.Navigator>
  );
}
