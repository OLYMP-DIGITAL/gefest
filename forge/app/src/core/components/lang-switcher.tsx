import { LangsEnum } from "core/features/language/language.types";
import { useLanguage } from "core/providers/language.provider";
import { StyleSheet, Text, View } from "react-native"

export const LangSwitcher = () => {
    const { lang, setLang } = useLanguage();

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