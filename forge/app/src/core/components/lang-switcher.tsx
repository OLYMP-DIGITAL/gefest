import { LangsEnum } from "core/features/language/language.types";
import { useLanguage } from "core/providers/language.provider";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native"

export const LangSwitcher = () => {
    const { localize, setLang } = useLanguage();

    return (
        <View style={styles.wrapper}>
            <Text style={styles.langLabel}
                onPress={() => setLang(localize)}>
                {localize}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    langLabel: {
        paddingHorizontal: 5,
        color: '#bdbdbd',
        fontSize: 18,
        fontWeight: '400',
    }
})