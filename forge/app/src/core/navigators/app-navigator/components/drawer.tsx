import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { LogoutButton } from 'core/components/logout-button';
import { useAuth } from 'core/providers/auth.provider';
import { useWindowSize } from 'core/providers/theme.provider';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useCopyToClipboard } from 'usehooks-ts';

export function Drawer(props: any) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { state, ...rest } = props;

  const toast = useToast();
  const newState = { ...state };
  const refValue = user?.id;

  const { smallSize } = useWindowSize();
  const [, setCopiedValue] = useCopyToClipboard();

  return (
    // <ImageBackground
    //   source={require('assets/sidebarBack.png')}
    //   resizeMode="stretch"
    //   style={styles.backgroundImage}
    // >
    <View
      style={[styles.sidebarBlock, !smallSize && { paddingVertical: 30 }]}
    >
      <DrawerContentScrollView {...props}>
        {smallSize && (
          <>
            <View style={{ ...styles.row, paddingVertical: 20, paddingHorizontal: 15, height: 100 }}>
              <View style={{ ...styles.row, flex: 10 }}>
                <Text style={styles.sidebarInfo}>
                  {user?.username}{' '}
                  {(user?.lastname ? user?.lastname[0] : '') + '.'}
                </Text>
              </View>

              <LogoutButton />
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
    // </ImageBackground>
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
    backgroundColor: '#35383F',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  row: {
    flex: 1,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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
