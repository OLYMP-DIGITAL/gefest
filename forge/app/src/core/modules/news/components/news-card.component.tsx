import { ScreenSize, useTheme, useWindowSize } from "core/providers/theme.provider";
import env, { envKyes } from "core/services/env";
import { useMemo } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { NewsData } from "../news.types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSetRecoilState } from "recoil";
import { articleAtom } from "core/features/news/news.atoms";
import { H4Text } from "core/components/text/h4.text";
import { convertDateToString } from "core/helpers/date-string-converter";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "core/types/navigation";

interface Props {
    data: NewsData,
    details?: boolean
}

export const NewsCard = ({ data, details }: Props) => {
    const navigation = useNavigation<StackNavigation>();

    const { theme } = useTheme();
    const { sizeType } = useWindowSize();
    const { t } = useTranslation();

    const setArticle = useSetRecoilState(articleAtom);

    const style = useMemo(() => StyleSheet.create({
        wrapper: {
            display: 'flex',
            margin: 20,
            backgroundColor: '#F6FAFD',
            shadowColor: '#04060F',
            shadowOpacity: 0.1,
            shadowRadius: 20,

            ...(sizeType !== ScreenSize.small ? {
                width: '90%',
                maxWidth: '90%',
            } : {
                width: '90%',
                maxWidth: 300
            })
        },
        cardWrapper: {
            display: 'flex',
            width: '100%',

            ...(sizeType !== ScreenSize.small ? {
                flexDirection: 'row',
            } : {
                flexDirection: 'column',
            })
        },
        infoWrapper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 20,
            width: '100%',

            ...((sizeType === ScreenSize.small || !data.imageUrl) ? {
                height: 'auto'
            } : {
                height: '100%',
                paddingRight: 320,
            })
        },
        imageWrapper: {
            ...(sizeType !== ScreenSize.small ? {
                width: 300,
                height: '100%',
            } : {
                width: '100%',
                height: 200,
            })
        },
        textWrapper: {
            width: '100%',

            ...((sizeType === ScreenSize.small || !data.imageUrl) && {
                marginRight: 20,
            })
        },
        title: {
            flexWrap: 'wrap',
        },
        description: {
            marginVertical: 10,
            fontSize: 16,
            fontWeight: '400',
            lineHeight: 22,
            letterSpacing: 0.2,
        },
        normalText: {
            marginLeft: 5,
            fontSize: 14,
            fontWeight: '400',
            lineHeight: 19.6,
            letterSpacing: 0.2,
        },
        dateWrapper: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        bottomWrapper: {
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
        },
        detailsRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: 10,
        },
        detailsWrapper: {
            paddingHorizontal: 30,
            paddingVertical: 20,
            textAlign: 'left',
        }
    }), [theme, sizeType]);

    return (
        <View style={style.wrapper}>
            <View style={style.cardWrapper}>
                {data.imageUrl &&
                    <View style={style.imageWrapper}>
                        <Image style={{ width: '100%', height: '100%' }}
                            resizeMode='cover'
                            source={{ uri: `${env[envKyes.apiHost]}${data.imageUrl}` }} />
                    </View>}
                <View style={style.infoWrapper}>
                    <View style={style.textWrapper}>
                        <H4Text text={data.title.toUpperCase()} />
                        <Text style={style.description}>{data.description}</Text>
                    </View>
                    <View style={style.bottomWrapper}>
                        <View style={style.dateWrapper}>
                            <Image style={{ width: 15, height: 15 }}
                                source={require('assets/calendar-icon.png')} />
                            <Text style={style.normalText}>{convertDateToString(data.date)}</Text>
                        </View>
                        {!details &&
                            <TouchableOpacity onPress={() => { setArticle(data); navigation.navigate('Article') }}>
                                <View style={style.detailsRow}>
                                    <Text style={{ ...style.normalText, color: '#6842FF', marginRight: 5 }}>
                                        {t('info.details')}
                                    </Text>
                                    <Image style={{ width: 15, height: 15, tintColor: '#6842FF', paddingLeft: 10 }}
                                        source={require('assets/arrow-right.png')} />
                                </View>
                            </TouchableOpacity>}
                    </View>
                </View>
            </View>
            {details &&
                <View style={style.detailsWrapper}>
                    <Text style={style.normalText}>{data.text}</Text>
                </View>
            }
        </View>
    )
}