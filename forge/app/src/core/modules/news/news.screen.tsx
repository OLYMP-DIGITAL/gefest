import RoundedButton from 'core/components/rounded-button';
import { StackNavigation } from 'core/types/navigation';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { News, fetchNews } from 'core/features/news/news.api';

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
    <RoundedButton
      small
      title={'Новость'}
      onPress={() => navigation.navigate('Article')}
    />
  );
};

