import { useEffect, useMemo } from 'react';
import { articleAtom } from "core/features/news/news.atoms";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { NewsCard } from './news/components/news-card.component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { NavigatorScreensEnum, StackNavigation } from 'core/types/navigation';
import { useTranslation } from 'react-i18next';
import { useLanguage } from 'core/providers/language.provider';

const ArticleScreen = () => {
    const navigation = useNavigation<StackNavigation>();
    const { t } = useTranslation();
    const { lang } = useLanguage();

    const [article, setArticle] = useRecoilState(articleAtom);

    useEffect(() => {
        return () => setArticle(null)
    }, [lang]);

    useEffect(() => {
        if (article && article.lang !== lang) {
            setArticle(null);
            navigation.navigate(NavigatorScreensEnum.news as any)
        }
    }, [lang, article]);

    const style = useMemo(() => StyleSheet.create({
        wrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
        },
        rowWrapper: {
            display: 'flex',
            flexDirection: 'row',
            width: '90%',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        normalText: {
            marginLeft: 5,
            fontSize: 14,
            fontWeight: '400',
            lineHeight: 19.6,
            letterSpacing: 0.2,
        },
    }), [])

    return (
        <ScrollView>
            <View style={style.wrapper}>
                <View style={style.rowWrapper}>
                    <TouchableOpacity onPress={() => navigation.navigate(NavigatorScreensEnum.news as any)}>
                        <View style={style.rowWrapper}>
                            <Image style={{ width: 15, height: 15, tintColor: '#6842FF', paddingRight: 10 }}
                                source={require('assets/arrow-left.png')} />
                            <Text style={{ ...style.normalText, color: '#6842FF', marginLeft: 5 }}>
                                {t('info.back')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {article &&
                    <NewsCard data={article} details />}
            </View>
        </ScrollView>
    )
}

export default ArticleScreen