import React from 'react';
import { View, ScrollView } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { fetchNews } from 'core/features/news/news.api';
import { NewsCard } from './components/news-card.component';
import { NewsInfo } from 'core/features/news/news.types';
import { useLanguage } from 'core/providers/language.provider';

export const NewsScreen = () => {
  const { lang } = useLanguage();
  const [news, setNews] = useState<NewsInfo[]>();

  const getNews = async () => {
    try {
      const response: any = await fetchNews(lang);

      if (response && response.data) {
        setNews(response.data)
      } else {
        setNews([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getNews()
  }, [lang]);

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
  }, [news])

  return (
    <ScrollView>
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        {createCard()}
      </View>
    </ScrollView>
  );
};

