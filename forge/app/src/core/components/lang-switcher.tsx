import { languageAtom } from "core/features/language/language.atoms";
import { LangsEnum } from "core/features/language/language.types";
import { StyleSheet, Text, View } from "react-native"
import { useRecoilState } from "recoil";

export const LangSwitcher = () => {
    const [lang, setLang] = useRecoilState(languageAtom);

    return (
        <View style={styles.wrapper}>
            <Text style={{ ...styles.langLabel, color: lang === LangsEnum.en ? 'green' : 'white' }} onPress={() => setLang(LangsEnum.en)}>en</Text>
            <Text style={{ ...styles.langLabel, color: lang === LangsEnum.ru ? 'green' : 'white' }} onPress={() => setLang(LangsEnum.ru)}>rus</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row'
    },
    langLabel: {
        paddingHorizontal: 5,
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    }
})