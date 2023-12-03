import { ScreenSize, useTheme, useWindowSize } from "core/providers/theme.provider";
import env, { envKyes } from "core/services/env";
import { useMemo } from "react"
import { Image, StyleSheet, View } from "react-native"
import { NewsData } from "../news.types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSetRecoilState } from "recoil";
import { articleAtom } from "core/features/news/news.atoms";

interface Props {
    data: NewsData
}

export const NewsCard = ({ data }: Props) => {
    const { theme } = useTheme();
    const { sizeType } = useWindowSize();
    const setArticle = useSetRecoilState(articleAtom);


    const style = useMemo(() => StyleSheet.create({
        wrapper: {
            display: 'flex',
            flexDirection: sizeType !== ScreenSize.small ? 'row' : 'column',
            shadowColor: '#04060F',
            shadowOpacity: 0.1,
            shadowRadius: 20,
            margin: 20,
            backgroundColor: '#F6FAFD',

            width: sizeType !== ScreenSize.small ? '90%' : 300,
            maxWidth: '90%',
        },
        infoWrapper: {
            display: 'flex',
            flexDirection: 'column',
        },
        imageWrapper: {
            width: 300,
            height: 200,
        },
    }), [theme, sizeType]);


    return (
        <View style={style.wrapper}>
            {data.imageUrl &&
                <View style={style.imageWrapper}>
                    <Image style={{ width: '100%', height: '100%' }}
                        resizeMode='cover'
                        source={{ uri: `${env[envKyes.apiHost]}${data.imageUrl}` }} />
                </View>}
            <View style={style.infoWrapper}>
                <TouchableOpacity onPress={() => setArticle(data)}>
                    <View>{data.title}</View>
                </TouchableOpacity>

                <View>{data.description}</View>
                <View>{data.date}</View>
            </View>
        </View>
    )
}