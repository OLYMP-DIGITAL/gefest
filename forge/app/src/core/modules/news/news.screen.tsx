import React from 'react';
import { useEffect, useState } from 'react';
import { fetchNews } from 'core/features/news/news.api';
import { NewsInfo } from 'core/features/news/news.types';
import { useLanguage } from 'core/providers/language.provider';
import { useRecoilState } from 'recoil';
import { articleAtom } from 'core/features/news/news.atoms';
import ArticleView from './components/article-view.component';
import NewsView from './components/news-view.component';

export const NewsScreen = () => {
  const { lang } = useLanguage();
  const [news, setNews] = useState<NewsInfo[]>();
  const [article, setArticle] = useRecoilState(articleAtom);

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
    getNews();
    setArticle(null);
  }, [lang]);


  return (
    <>
      {!article
        ? <NewsView news={news || []} />
        : <ArticleView />
      }
    </>
  );
};

