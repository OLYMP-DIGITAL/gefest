import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Accordion from 'react-native-collapsible/Accordion';
import { faq } from './faq.types';
import { useRecoilState } from 'recoil';
import { faqAtom } from './faq.atoms';
import { fetchFaqs } from './faq.api';
import { sectionsMock } from './faq.mock';
import { useLanguage } from 'core/providers/language.provider';

export const FaqScreen = () => {
  const { lang } = useLanguage();

  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [faqs, setFaqs] = useRecoilState(faqAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchFaqList = async () => {
    try {
      const response = await fetchFaqs(lang);

      if (response && response.data && response.data.length !== 0) {
        let cleanedData: faq[] = response.data.map((value) => ({
          id: value.id,
          title: value.attributes.title,
          description: value.attributes.description,
        }));
        setFaqs(cleanedData);
      } else {
        console.error('No FAQ data', response);
      }
    } catch (e) {
      console.error('Error fetching FAQs', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqList();
  }, [lang]);

  function renderHeader(section: faq, id: number, isActive: boolean) {
    return (
      <View style={styles.accordHeader}>
        <Text style={styles.accordTitle}>{section.title.toUpperCase()}</Text>
        <Icon
          name={isActive ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#bbb"
        />
      </View>
    );
  }

  function renderContent(section: faq, id: number, isActive: boolean) {
    return (
      <View style={styles.accordBody}>
        <Text style={styles.accordContent}>{section.description}</Text>
      </View>
    );
  }
  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color="#fc440f" style={styles.loader} />
      ) : (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.container}
        >
          <Accordion
            align="bottom"
            sections={faqs || sectionsMock}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={(sections) => setActiveSections(sections)}
            sectionContainerStyle={styles.accordContainer}
            expandMultiple
          />
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '100%',
    display: 'flex',
    alignSelf: 'center',
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        width: '100%',
      },
      android: {
        width: '100%',
      },
    }),
  },
  accordContainer: {
    paddingBottom: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2.22,

    elevation: 3,
  },
  accordHeader: {
    marginTop: 10,
    marginHorizontal: 5,
    padding: 12,
    backgroundColor: '#fff',
    color: '#eee',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accordTitle: {
    fontSize: 24,
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: `'Montserrat-Regular', sans-serif`,
    color: '#403f3f',
  },
  accordContent: {
    fontSize: 20,
    fontWeight: '200',
    fontFamily: `'Montserrat-Regular', sans-serif`,
  },
  accordBody: {
    padding: 12,
  },
  seperator: {
    height: 12,
  },
  loader: {
    padding: 15,
  },
});

export default FaqScreen;
