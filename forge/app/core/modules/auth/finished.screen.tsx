import RoundedButton from '@core/components/rounded-button';
import { BodyXlRegular } from '@core/components/text/body-xl-regular.text';
import { H3Text } from '@core/components/text/h3.text';
import { H4Text } from '@core/components/text/h4.text';
import { useTheme } from '@core/providers/theme.provider';
import api from '@core/services/api';
import env from '@core/services/env';
import { getToken } from '@core/services/token';
import { NavigationStack } from '@core/types/navigation';
import { NavigationProp } from '@react-navigation/native';
import { tokenAtom } from '../../../app.atoms';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Linking, StyleSheet, Touchable, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  const [token, setToken] = useAtom(tokenAtom);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [socials, setSocials] = useState<Social[]>([]);

  useEffect(() => {
    try {
      api.get<SocialsResponse>('api/socials?populate=*').then((response) => {
        setSocials(response.data);
      });
    } catch (e) {
      console.log('Error on fetch socials', e);
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
      }),
    [theme]
  );

  return (
    <View style={styles.wrapper}>
      <H3Text text={t('finished.title')} />

      <View style={styles.toHomeWrapper}>
        <RoundedButton
          title={t('finished.toHome')}
          onPress={() => {
            getToken().then((jwtToken) => {
              if (jwtToken) {
                setToken(jwtToken);
              }
            });
          }}
        />
      </View>

      <H4Text text={t('finished.subscribe')} />
      <BodyXlRegular text={t('finished.subscribe')} />

      <View style={styles.socialsWrapper}>
        {socials.map((social) => (
          <TouchableOpacity
            key={`social-image-${social.id}`}
            style={styles.socialImage}
            onPress={() => {
              const url = social.attributes.link;
              Linking.openURL(url)
                .then(() => console.log(`Открыт URL: ${url}`))
                .catch((err) =>
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

FinishedScreen.route = 'Finished';

export default FinishedScreen;
