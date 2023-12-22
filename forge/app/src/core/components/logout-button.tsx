import { userAtom } from "core/features/users/users.atoms";
import { saveToken } from "core/services/token";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSetRecoilState } from "recoil";

export const LogoutButton = () => {
    const setUser = useSetRecoilState(userAtom);

    const clearStorage = async () => {
        saveToken('');
    };

    const logout = () => {
        clearStorage().then(() => {
            setUser(null)
        }).catch((err) =>
            console.log('Clear storage error', err)
        );
    };

    return (
        <View style={styles.wrapper}>
            <TouchableOpacity onPress={() => logout()}>
                <Image
                    style={styles.icon}
                    source={require('assets/logout-icon.png')} />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 21,
        height: 22,
        tintColor: '#bdbdbd'
    },
});