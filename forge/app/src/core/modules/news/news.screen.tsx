import RoundedButton from 'core/components/rounded-button';
import { StackNavigation } from 'core/types/navigation';
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { News, fetchNews } from 'core/features/news/news.api';
import { NewsCard } from './components/news-card.component';

export const NewsScreen = () => {
  const navigation = useNavigation<StackNavigation>();

  const [news, setNews] = useState<News[]>();

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

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        {news && news.map((data, index) =>
          <NewsCard key={`news-${index}`}
            data={{
              title: data.title,
              description: data.description || undefined,
              text: data.text,
              date: data.date,
              imageUrl: data.attributes?.image?.data
                ? data.attributes.image.data.attributes.url
                : undefined,
            }}
          />
        )}
      </View>
    </ScrollView>
  );
};

