import AsyncStorage from '@react-native-async-storage/async-storage';
import { tokenAtom, userAtom } from 'core/features/users/users.atoms';
import { saveToken } from 'core/services/token';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSetRecoilState } from 'recoil';

import { NativeModules } from 'react-native';
import { isWeb } from 'core/features/language/language.feature';
import { CommonActions, useNavigation } from '@react-navigation/native';

const { RNRestart: rnRestart } = NativeModules;

export const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const setToken = useSetRecoilState(tokenAtom);
  const navigation = useNavigation();

  const clearStorage = async () => {
    saveToken('');
    await AsyncStorage.clear();
  };

  const logout = () => {
    clearStorage()
      .then(() => {
        setUser(null);
        setToken('');

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Signin' }],
          })
        );

        rnRestart.Restart();
      })
      .catch((err) => console.log('Clear storage error', err));
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => logout()}>
        <Image style={styles.icon} source={require('assets/logout-icon.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 21,
    height: 22,
    tintColor: '#bdbdbd',
  },
});
