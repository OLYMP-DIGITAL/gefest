/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import RoundedButton from 'core/components/rounded-button';
import { BodyXlRegular } from 'core/components/text/body-xl-regular.text';
import { H3Text } from 'core/components/text/h3.text';
import { useTheme } from 'core/providers/theme.provider';
import api from 'core/services/api';
import env from 'core/services/env';
import { AuthScreensEnum, NavigationStack } from 'core/types/navigation';
import { NavigationProp } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

interface SocialAttributes {
  link: string;
  label: string;
  logo: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
}

interface Social {
  id: number;
  attributes: SocialAttributes;
}

interface SocialsResponse {
  data: Array<Social>;
}

export const FinishedScreen = ({
  navigation,
}: {
  navigation: NavigationProp<NavigationStack, 'Finished'>;
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [socials, setSocials] = useState<Social[]>([]);

  useEffect(() => {
    try {
      api.get<SocialsResponse>('socials?populate=*').then((response) => {
        setSocials(response.data);
      });
    } catch (e) {
      console.error('Error on fetch socials', e);
    }
  }, []);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },

        toHomeWrapper: {
          marginVertical: 20,
        },

        socialsWrapper: {
          display: 'flex',
          marginVertical: 20,
        },

        socialImage: {
          width: 115,
          height: 115,
        },

        message: {
          width: 300,
          textAlign: 'center',
          marginTop: 20,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.wrapper}>
      <H3Text text={t('finished.title')} />

      <View style={styles.message}>
        <BodyXlRegular
          styles={{ textAlign: 'center' }}
          text={t('finished.continue')}
        />
      </View>

      <View style={styles.toHomeWrapper}>
        <RoundedButton
          title={t('finished.toSignIn')}
          onPress={() => {
            // setUser(route.params?.user || null);
            navigation.navigate(AuthScreensEnum.signIn as any);
          }}
        />
      </View>

      {/* <H4Text text={t('finished.subscribe')} />
      <BodyXlRegular text={t('finished.subscribe')} /> */}

      <View style={styles.socialsWrapper}>
        {Array.isArray(socials) &&
          socials.map((social) => (
            <TouchableOpacity
              key={`social-image-${social.id}`}
              style={styles.socialImage}
              onPress={() => {
                const url = social.attributes.link;
                Linking.openURL(url).catch((err) =>
                  console.error('Ошибка при открытии URL: ', err)
                );
              }}
            >
              <Image
                style={styles.socialImage}
                source={{
                  uri: `${env.API_HOST}${social.attributes.logo.data.attributes.url}`,
                }}
              />
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default FinishedScreen;
