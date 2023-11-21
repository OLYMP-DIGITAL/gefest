import {
  DrawerItem,
  DrawerItemList,
  DrawerScreenProps,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { NavigationStack } from 'core/types/navigation';
import { useMemo } from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'core/providers/theme.provider';
import { useAuth } from 'core/providers/auth.provider';

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

      {/* <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />

      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      /> */}
    </DrawerContentScrollView>
  );
}

const navigationOptions: NativeStackNavigationOptions = {
  // title: 'Custom Header Title', // Заголовок шапки
  headerStyle: {
    backgroundColor: 'blue', // Цвет фона шапки
  },
  headerTintColor: 'white', // Цвет текста в шапке
};

interface DrawerProps {
  screens: Array<DrawerScreen>;
  menuItems?: Array<DrawerMenuItem>;
}

const DrawerNavigatorInstance = createDrawerNavigator();

export function AppNavigator({ screens, nav }: DrawerProps) {
  const { theme } = useTheme();

  const options = useMemo(
    () => ({
      ...navigationOptions,
      headerStyle: {
        ...(navigationOptions.headerStyle as Object),
        backgroundColor: theme.dark,
      },
      headerTitle() {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <DrawerItem
              label="☰"
              onPress={() => navigation.toggleDrawer()}
            /> */}

            <Image
              style={{ width: 200, height: 40, marginRight: 10 }}
              source={require('assets/logo.png')}
            />
          </View>
        );
      },
    }),
    [theme]
  );

  return (
    <DrawerNavigatorInstance.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {screens.map(({ name, component: Component }) => (
        <DrawerNavigatorInstance.Screen
          key={`screen-${name}`}
          name={name}
          options={{
            ...(options as any),
            header: ({ navigation }) => (
              <>
                <CustomHeader navigation={navigation} title={name} />
              </>
            ),
          }}
          component={Component as any}
        />
      ))}
    </DrawerNavigatorInstance.Navigator>
  );
}

interface CustomHeaderProps {
  title: string;
  navigation: any;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, navigation }) => {
  const { user } = useAuth();
  const { theme } = useTheme();

  return (
    <View style={[styles.headerContainer, { backgroundColor: theme.dark }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <DrawerItem label="☰" onPress={() => navigation.toggleDrawer()} />
        {/* <Image
          style={{ width: 40, height: 40, marginRight: 10 }}
          source={require('assets/burger-1.png')}
        /> */}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{ width: 200, height: 40, marginRight: 10 }}
          source={require('assets/logo.png')}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.boldText}>Реферальная ссылка</Text>
        <Text style={{ color: '#fff' }}>https://PUaOVKv96YbJWEW/eZSYLEL</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.boldText}>Время</Text>
        <Text style={{ color: '#fff' }}>{getCurrentTime()}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.boldText}>Стоимость компаний</Text>
        <Text style={{ color: '#fff' }}>
          10000$ <Text style={styles.greenText}>+850%</Text>
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={{ color: '#fff' }}>en rus</Text>
      </View>
      <View style={styles.userWrapper}>
        <Text style={styles.valueText}>
          {user?.username} {(user?.sername ? user?.sername[0] : '') + '.'}
        </Text>
        <Image
          style={styles.profileImage}
          source={require('assets/avatar.png')} // Путь к случайному круглому фото
        />
      </View>
    </View>
  );
};

function getCurrentTime() {
  const now = new Date();
  const formattedDate = `${now.getDate()}.${
    now.getMonth() + 1
  }.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
  return formattedDate;
}

const styles = StyleSheet.create({
  userWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerContainer: {
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  infoContainer: {
    color: 'white',
    alignItems: 'center',
  },
  boldText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  greenText: {
    color: 'green',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  valueText: {
    color: '#fff',
  },
});

// export default CustomHeader;
// И в вашем компоненте навигатора используйте этот кастомный заголовок в опциях каждого экрана:

{
  /* <DrawerNavigatorInstance.Screen
  key={`screen-${name}`}
  name={name}
  options={{
    ...options as any,
    header: (props) => <CustomHeader title={props.scene.route.name} />,
  }}
  component={Component as any}
/>
Таким образом, вы создадите кастомный верхний бар навигатора с нужной вам информацией. */
}
