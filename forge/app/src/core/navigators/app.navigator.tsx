import {
  DrawerItem,
  DrawerItemList,
  DrawerScreenProps,
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { NavigationStack } from 'core/types/navigation';
import { useEffect, useMemo, useState } from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, View, ImageBackground } from 'react-native';
import {
  useWindowSize,
  useTheme,
  ScreenSize,
} from 'core/providers/theme.provider';
import { useAuth } from 'core/providers/auth.provider';
import { PaymentScreen } from 'core/modules/payment/payment.screen';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { configAtom, fetchConfig } from 'core/features/config/config.feature';
import { useCopyToClipboard } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import { userAtom } from 'core/features/users/users.atoms';

interface DrawerMenuItem {
  label: string;
  onPress?: () => void;
}

interface DrawerScreen {
  name: string;
  component: ({ navigation }: DrawerScreenProps<NavigationStack>) => Element;
  iconSrc: any;
}

function CustomDrawerContent(props: any) {
  const { user } = useAuth();
  const { state, smallScreen, ...rest } = props;
  const newState = { ...state };
  const refValue = user?.id;

  const [, setCopiedValue] = useCopyToClipboard();

  /**
   * Один из способо убрать элементы из меню
   */
  // newState.routes = newState.routes.filter(
  //   (item: any) => item.name !== 'Payment'
  // );

  return (
    <ImageBackground
      source={require('assets/sidebarBack.png')}
      resizeMode="stretch"
      style={styles.backgroundImage}
    >
      <View
        style={[styles.sidebarBlock, !smallScreen && { paddingVertical: 30 }]}
      >
        <DrawerContentScrollView {...props}>
          {smallScreen && (
            <>
              <View style={[styles.sidebarBlock, { padding: 20 }]}>
                <View style={styles.reverseRow}>
                  <Text style={styles.sidebarInfo}>en rus</Text>
                </View>

                <View style={[styles.sidebarBlock, { paddingTop: 10 }]}>
                  <Image
                    style={styles.profileImage}
                    source={require('assets/avatar.png')} // Путь к случайному круглому фото
                  />
                  <Text style={[styles.sidebarInfo, { paddingTop: 10 }]}>
                    {user?.username}{' '}
                    {(user?.sername ? user?.sername[0] : '') + '.'}
                  </Text>
                </View>
              </View>

              <DrawerItem
                label="Реферальная ссылка"
                onPress={() => {
                  setCopiedValue(refValue);
                  console.log('Copied');
                }}
                labelStyle={styles.menuItems}
                icon={() => (
                  <Image
                    style={{ width: 20, height: 19, marginLeft: 10 }}
                    source={require('assets/ref-icon.png')}
                  />
                )}
              />
            </>
          )}

          <DrawerItemList state={newState} {...rest} />

          {/* Дополнительные манипуляции с выпадающем меню */}
          {/* <DrawerItem
            label="Close drawer"
            onPress={() => props.navigation.closeDrawer()}
          />

          <DrawerItem
            label="Toggle drawer"
            onPress={() => props.navigation.toggleDrawer()}
          /> */}
        </DrawerContentScrollView>
      </View>
    </ImageBackground>
  );
}

const navigationOptions: NativeStackNavigationOptions = {
  // title: 'Custom Header Title', // Заголовок шапки
  headerStyle: {
    backgroundColor: 'blue', // Цвет фона шапки
  },
  headerTintColor: 'white', // Цвет текста в шапке
};

const screenOptions: any = {
  drawerActiveTintColor: 'white',
  drawerInactiveTintColor: 'white',
  activeBackgroundColor: 'white',
  inactiveBackgroundColor: 'white',
};

interface DrawerProps {
  screens: Array<DrawerScreen>;
  menuItems?: Array<DrawerMenuItem>;
}

const DrawerNavigatorInstance = createDrawerNavigator();

export function AppNavigator({ screens }: DrawerProps) {
  const { theme } = useTheme();
  const { size, sizeType } = useWindowSize();

  const [smallScreen, setSmallScreen] = useState<boolean>(true);
  const setConfig = useSetRecoilState(configAtom);

  useEffect(() => {
    fetchConfig().then((conf) => {
      if (conf.data) {
        setConfig(conf.data.attributes);
      }
    });
  }, []);

  useEffect(() => {
    size?.width < 900 ? setSmallScreen(true) : setSmallScreen(false);
  }, [size.width]);

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
      drawerContent={(props) => (
        <CustomDrawerContent {...props} smallScreen={smallScreen || false} />
      )}
    >
      {screens.map(({ name, component: Component, iconSrc }) => (
        <DrawerNavigatorInstance.Screen
          key={`screen-${name}`}
          name={name}
          options={{
            ...(options as any),
            ...(screenOptions as any),
            drawerLabelStyle: styles.menuItems,
            drawerIcon: () => (
              <Image
                style={{ width: 20, height: 20, marginLeft: 10 }}
                source={iconSrc}
              />
            ),
            /**
             * Отрисовка дополнительных элементов верхнего бара
             */
            header: ({ navigation }) => (
              <>
                <CustomHeader
                  navigation={navigation}
                  title={name}
                  hideItems={smallScreen}
                  sizeType={sizeType}
                />
              </>
            ),
          }}
          component={Component as any}
        />
      ))}

      <DrawerNavigatorInstance.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          ...(options as any),
          drawerItemStyle: { display: 'none' },
          ...(screenOptions as any),
          drawerLabelStyle: styles.menuItems,
          /**
           * Отрисовка дополнительных элементов верхнего бара
           */
          header: ({ navigation }) => (
            <>
              <CustomHeader
                navigation={navigation}
                title={'Payment'}
                hideItems={smallScreen}
                sizeType={sizeType}
              />
            </>
          ),
        }}
      />
    </DrawerNavigatorInstance.Navigator>
  );
}
interface CustomHeaderProps {
  title: string;
  navigation: any;
  hideItems: boolean;
  sizeType?: ScreenSize;
}

enum logoStyles {
  smallLogo = 'smallLogo',
  mediumLogo = 'mediumLogo',
  largeLogo = 'largeLogo',
}

const Burger = () => {
  return (
    <Image
      style={{ width: 40, height: 40 }}
      source={require('assets/burger-1.png')}
    />
  );
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  navigation,
  hideItems,
  sizeType,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const config = useRecoilValue(configAtom);
  const user = useRecoilValue(userAtom);

  return (
    <ImageBackground
      source={require('assets/headerBack.png')}
      resizeMode="cover"
      style={[styles.backgroundImage, { backgroundColor: theme.dark }]}
    >
      <View
        style={[
          styles.headerContainer,
          hideItems && {
            paddingHorizontal: 5,
            paddingVertical: 5,
          },
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <DrawerItem
            label={Burger}
            onPress={() => navigation.toggleDrawer()}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={styles[`${sizeType}Logo` as logoStyles]}
            source={require('assets/logo.png')}
          />
        </View>

        {!hideItems && (
          <View style={styles.infoContainer}>
            <Text style={styles.boldText}>{t('referalLink')}</Text>
            <Text style={{ color: '#fff' }}>{user?.id}</Text>
          </View>
        )}

        {/* <View style={styles.infoContainer}>
        <Text style={styles.boldText}>Время</Text>
        <Text style={{ color: '#fff' }}>{getCurrentTime()}</Text>
      </View> */}

        <View style={[styles.infoContainer, { marginRight: 10 }]}>
          <Text style={hideItems ? styles.thinText : styles.boldText}>
            {t('companyCost')}
          </Text>
          <Text style={[{ color: '#fff' }, hideItems && { fontSize: 12 }]}>
            {config?.companyValue} <Text style={styles.greenText}>+850%</Text>
          </Text>
        </View>

        {!hideItems && (
          <>
            <View style={styles.infoContainer}>
              <Text style={{ color: '#fff' }}>en rus</Text>
            </View>

            <View style={styles.userWrapper}>
              <Text style={styles.valueText}>
                {user?.username} {(user?.sername ? user?.sername[0] : '') + '.'}
              </Text>

              {/* <Image
                style={styles.profileImage}
                source={require('assets/avatar.png')} // Путь к случайному круглому фото
              /> */}
            </View>
          </>
        )}
      </View>
    </ImageBackground>
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
  thinText: {
    color: 'white',
    fontWeight: '200',
    fontSize: 12,
    textTransform: 'uppercase',
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

  smallLogo: {
    width: 140,
    height: 28,
    marginRight: 10,
    marginLeft: -30,
  },
  mediumLogo: {
    width: 180,
    height: 36,
    marginRight: 10,
  },
  largeLogo: {
    width: 200,
    height: 40,
    marginRight: 10,
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
  },
  sidebarBlock: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reverseRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row-reverse',
    width: '100%',
  },
  sidebarInfo: {
    fontWeight: '500',
    fontSize: 18,
    color: 'white',
  },
  menuItems: {
    fontSize: 16,
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 0.2,
    wordWrap: 'break-word',
    textWrap: 'wrap',
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
