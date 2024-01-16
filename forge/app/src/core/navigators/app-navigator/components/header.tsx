import { Entypo } from '@expo/vector-icons';
import { DrawerItem } from '@react-navigation/drawer';
import { LangSwitcher } from 'core/components/lang-switcher';
import { LogoutButton } from 'core/components/logout-button';
import { useWindowSize } from 'core/providers/theme.provider';
import { useCallback } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useToast } from 'react-native-toast-notifications';
import { useRecoilValue } from 'recoil';
import { useCopyToClipboard } from 'usehooks-ts';
import { userAtom } from '../../../features/users/users.atoms';
import { useTranslation } from 'react-i18next';

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
      style={{ width: 25, height: 25, tintColor: '#bdbdbd' }}
      source={require('assets/burger-1.png')}
    />
  );
};

export const Header: React.FC<Props> = ({ title, navigation }) => {
  const { t } = useTranslation();
  const user = useRecoilValue(userAtom);
  const toast = useToast();
  const { smallSize, sizeType } = useWindowSize();
  const [, setCopiedValue] = useCopyToClipboard();

  const clickToReferal = useCallback(() => {
    setCopiedValue(`${user?.id}`);
    toast.show(t('messages.referalCopied'));
  }, [user]);

  return (
    // <ImageBackground
    //   id="app-bar-image"
    //   source={require('assets/headerBack.png')}
    //   resizeMode="cover"
    //   style={[styles.backgroundImage, { backgroundColor: theme.dark }]}
    // >
    <View
      style={[
        styles.headerContainer,
        smallSize && {
          paddingHorizontal: 5,
        },
      ]}
    >
      <View style={styles.rowBlock}>
        <DrawerItem label={Burger} onPress={() => navigation.toggleDrawer()} />

        <View style={styles.rowBlock}>
          <Image
            style={styles[`${sizeType}Logo` as logoStyles]}
            source={require('assets/logo.png')}
          />
        </View>
      </View>

      <View style={styles.rowBlock}>
        <View style={styles.userReferal}>
          <TouchableOpacity
            style={styles.userReferalButton}
            onPress={clickToReferal}
          >
            <Entypo name="copy" size={18} color="gray" />
            <Text style={styles.userNameLabel}>Referal ID: {user?.id}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.langContainer}>
          <LangSwitcher />
        </View>
        {!smallSize && <LogoutButton />}
      </View>
    </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  langContainer: {
    color: 'white',
    alignItems: 'center',
    marginRight: 25,
  },

  userReferal: {
    color: 'white',
    alignItems: 'center',
    marginRight: 25,
  },

  userReferalButton: {
    display: 'flex',
    flexDirection: 'row',
  },

  userNameLabel: {
    paddingHorizontal: 5,
    color: '#bdbdbd',
    fontSize: 18,
    fontWeight: '400',
  },
  valueText: {
    color: '#fff',
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

  rowBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerContainer: {
    backgroundColor: '#35383F',
    color: '#bdbdbd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,

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
    marginLeft: -20,
  },
  mediumLogo: {
    width: 180,
    height: 36,
    marginRight: 10,
  },
  largeLogo: {
    width: 180,
    height: 36,
    marginRight: 10,
  },
});
