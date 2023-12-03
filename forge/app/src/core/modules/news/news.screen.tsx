import RoundedButton from 'core/components/rounded-button';
import { StackNavigation } from 'core/types/navigation';
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState, useCallback } from 'react';
import { fetchNews } from 'core/features/news/news.api';
import { NewsCard } from './components/news-card.component';
import { NewsInfo } from 'core/features/news/news.types';

export const NewsScreen = () => {
  const navigation = useNavigation<StackNavigation>();

  const [news, setNews] = useState<NewsInfo[]>();

  const getNews = async () => {
    try {
      const response: any = await fetchNews();

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
  }, []);

  const createCard = useCallback(() => {
    let cards: JSX.Element[] = [];

    news && news.map((data, index) => {
      let value = data.attributes;

      cards.push(<NewsCard key={`news-${index}`}
        data={{
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

