import { useTheme } from "core/providers/theme.provider";
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
    const setArticle = useSetRecoilState(articleAtom)

    const style = useMemo(() => StyleSheet.create({
        wrapper: {
            display: 'flex',
        }
    }), [theme]);


    return (
        <View style={style.wrapper}>
            {data.imageUrl &&
                <Image style={{ width: 300, height: 150 }}
                    source={{ uri: `${env[envKyes.apiHost]}${data.imageUrl}` }}></Image>}
            <TouchableOpacity onPress={() => setArticle(data)}>
                <View>{data.title}</View>
            </TouchableOpacity>
            <View>{data.description}</View>
            <View>{data.date}</View>
        </View>
    )
}