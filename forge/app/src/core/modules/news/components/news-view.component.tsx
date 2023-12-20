import { useCallback } from 'react';
import { ScrollView, View } from "react-native";
import { NewsCard } from './news-card.component';
import { NewsInfo } from 'core/features/news/news.types';
import { useLanguage } from 'core/providers/language.provider';

interface NewsProps {
    news: NewsInfo[];
};

const NewsView = ({ news }: NewsProps) => {
    const { lang } = useLanguage();

    const createCard = useCallback(() => {
        let cards: JSX.Element[] = [];

        news && news.map((data, index) => {
            let value = data.attributes;

            cards.push(
                <NewsCard key={`news-${index}`}
                    data={{
                        lang: lang,
                        title: value.title,
                        description: value.description || undefined,
                        text: value.text,
                        date: value.date,
                        imageUrl: value?.image?.data
                            ? value.image.data.attributes.url
                            : undefined,
                    }}
                />)
        })

        return cards
    }, [news]);

    return (
        <ScrollView>
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                {createCard()}
            </View>
        </ScrollView>
    )
}

export default NewsView