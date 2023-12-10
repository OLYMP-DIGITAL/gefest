import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { languageAtom } from 'core/features/language/language.atoms';
import { LangsEnum } from 'core/features/language/language.types';
import { useAuth } from 'core/providers/auth.provider';
import { useWindowSize } from 'core/providers/theme.provider';
import { useTranslation } from 'react-i18next';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useRecoilState } from 'recoil';
import { useCopyToClipboard } from 'usehooks-ts';

export function Drawer(props: any) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { state, ...rest } = props;

  const toast = useToast();
  const newState = { ...state };
  const refValue = user?.id;

  const { smallSize } = useWindowSize();
  const [, setCopiedValue] = useCopyToClipboard();

  const [lang, setLang] = useRecoilState(languageAtom);

  return (
    <ImageBackground
      source={require('assets/sidebarBack.png')}
      resizeMode="stretch"
      style={styles.backgroundImage}
    >
      <View
        style={[styles.sidebarBlock, !smallSize && { paddingVertical: 30 }]}
      >
        <DrawerContentScrollView {...props}>
          {smallSize && (
            <>
              <View style={[styles.sidebarBlock, { padding: 20 }]}>
                <View style={styles.reverseRow}>
                  <Text style={styles.sidebarInfo} onPress={() => setLang(LangsEnum.en)}>en</Text>
                  <Text style={styles.sidebarInfo} onPress={() => setLang(LangsEnum.ru)}>rus</Text>
                </View>

                <View style={[styles.sidebarBlock, { paddingTop: 10 }]}>
                  <Text style={[styles.sidebarInfo, { paddingTop: 10 }]}>
                    {user?.username}{' '}
                    {(user?.lastname ? user?.lastname[0] : '') + '.'}
                  </Text>
                </View>
              </View>

              <DrawerItem
                label={t('referalLink')}
                labelStyle={styles.menuItems}
                onPress={() => {
                  setCopiedValue(`${refValue}`);
                  toast.show(t('messages.referalCopied'));
                }}
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
        </DrawerContentScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
  },
  sidebarBlock: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  reverseRow: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  sidebarInfo: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  menuItems: {
    color: 'white',
    fontSize: 16,
    wordWrap: 'break-word',
    textWrap: 'wrap',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
});
