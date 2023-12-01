import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Accordion from 'react-native-collapsible/Accordion';
import { faqs } from './faq.types';
import { BodyXlRegular } from 'core/components/text/body-xl-regular.text';
import { useRecoilState } from 'recoil';
import { faqAtom } from './faq.atoms';
import { fetchFaqs } from './faq.api';
import { H4Text } from 'core/components/text/h4.text';

export const FaqScreen = () => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [faqs, setFaqs] = useRecoilState(faqAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchFaqList = async () => {
    try {
      const response = await fetchFaqs();

      if (response) {
        setFaqs(response);
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
  }, []);

  const sections: faqs = [
    {
      title: 'Что такое доля?'.toUpperCase(),
      description:
        "React Native lets you create truly native apps and doesn't compromise your users' experiences. It provides a core set of platform agnostic native components",
    },
    {
      title: 'Когда происходит выкуп доли?'.toUpperCase(),
      description:
        "React Native lets you create truly native apps and doesn't compromise your users' experiences. It provides a core set of platform agnostic native components",
    },
    {
      title: 'Как отслеживать цены?'.toUpperCase(),
      description:
        "React Native lets you create truly native apps and doesn't compromise your users' experiences. It provides a core set of platform agnostic native components",
    },
    {
      title: 'Как заработать?'.toUpperCase(),
      description:
        "React Native lets you create truly native apps and doesn't compromise your users' experiences. It provides a core set of platform agnostic native components",
    },
    {
      title: 'Как купить акции?'.toUpperCase(),
      description:
        "React Native lets you create truly native apps and doesn't compromise your users' experiences. It provides a core set of platform agnostic native components",
    },
  ];

  function renderHeader(section: any, _: any, isActive: any) {
    return (
      <View style={styles.accordHeader}>
        <H4Text text={section.title} />
        <Icon
          name={isActive ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#bbb"
        />
      </View>
    );
  }

  function renderContent(section: any, _: any, isActive: any) {
    return (
      <View style={styles.accordBody}>
        <BodyXlRegular text={section.description} />
      </View>
    );
  }
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
    >
      <Accordion
        align="bottom"
        sections={sections}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={(sections) => setActiveSections(sections)}
        sectionContainerStyle={styles.accordContainer}
        expandMultiple
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  accordContainer: {
    paddingBottom: 4,
  },
  accordHeader: {
    padding: 12,
    backgroundColor: '#fff',
    color: '#eee',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accordTitle: {
    fontFamily: 'Urbanist-Regular, Arial, sans-serif',
    fontSize: 20,
  },
  accordBody: {
    fontFamily: 'Montserrat-Bold',
    padding: 12,
  },
  textSmall: {
    fontSize: 16,
  },
  seperator: {
    height: 12,
  },
});

export default FaqScreen;
