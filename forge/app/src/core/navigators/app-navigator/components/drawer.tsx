import { Entypo } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { SupportEmailLink } from 'core/features/support/support-email-link.component';
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
    <View style={[styles.sidebarBlock, !smallSize && { paddingVertical: 30 }]}>
      <DrawerContentScrollView {...props}>
        <View style={{ marginBottom: 13 }}>
          <Text style={styles.sidebarInfo}>{user?.email}</Text>
        </View>

        <DrawerItem
          label={t('referalLink')}
          labelStyle={styles.menuItems}
          onPress={() => {
            setCopiedValue(`${refValue}`);
            toast.show(t('messages.referalCopied'));
          }}
          icon={() => (
            <Entypo
              style={{ marginLeft: 13 }}
              name="copy"
              size={20}
              color="white"
            />
          )}
        />

        <DrawerItemList state={newState} {...rest} />

        <SupportEmailLink />
      </DrawerContentScrollView>
    </View>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  sidebarInfo: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },

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
    justifyContent: 'center',
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
