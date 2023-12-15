import { DrawerItem } from '@react-navigation/drawer';
import { LangSwitcher } from 'core/components/lang-switcher';
import { configAtom } from 'core/features/config/config.feature';
import { userAtom } from 'core/features/users/users.atoms';
import { useTheme, useWindowSize } from 'core/providers/theme.provider';
import { useTranslation } from 'react-i18next';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';

interface Props {
  title: string;
  navigation: any;
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

export const Header: React.FC<Props> = ({ title, navigation }) => {
  const user = useRecoilValue(userAtom);
  const config = useRecoilValue(configAtom);

  const { t } = useTranslation();
  const { theme } = useTheme();
  const { smallSize, sizeType } = useWindowSize();

  return (
    <ImageBackground
      id="app-bar-image"
      source={require('assets/headerBack.png')}
      resizeMode="cover"
      style={[styles.backgroundImage, { backgroundColor: theme.dark }]}
    >
      <View
        style={[
          styles.headerContainer,
          smallSize && {
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

        {!smallSize && (
          <View style={styles.infoContainer}>
            <Text style={styles.boldText}>{t('referalLink')}</Text>
            <Text style={{ color: '#fff' }}>{user?.id}</Text>
          </View>
        )}

        <View style={[styles.infoContainer, { marginRight: 10 }]}>
          <Text style={smallSize ? styles.thinText : styles.boldText}>
            {t('companyCost')}
          </Text>
          <Text style={[{ color: '#fff' }, smallSize && { fontSize: 12 }]}>
            {config?.companyValue} <Text style={styles.greenText}>+850%</Text>
          </Text>
        </View>

        {!smallSize && (
          <>
            <View style={styles.infoContainer}>
              <LangSwitcher />
            </View>

            <View style={styles.userWrapper}>
              <Text style={styles.valueText}>
                {user?.username}{' '}
                {(user?.lastname ? user?.lastname[0] : '') + '.'}
              </Text>
            </View>
          </>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    color: 'white',
    alignItems: 'center',
  },

  valueText: {
    color: '#fff',
  },

  userWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },

  greenText: {
    color: 'green',
    fontWeight: 'bold',
  },

  thinText: {
    color: 'white',
    fontWeight: '200',
    fontSize: 12,
    textTransform: 'uppercase',
  },

  boldText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },

  headerContainer: {
    color: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,

    borderBottomWidth: 1,
    borderBottomColor: '#737373',
  },

  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
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
});
