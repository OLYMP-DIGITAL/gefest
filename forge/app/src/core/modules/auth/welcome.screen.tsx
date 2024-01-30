/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { Link } from 'core/components/link';
import RoundedButton from 'core/components/rounded-button';
import { AuthScreensEnum, NavigationStack } from 'core/types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { ScreenLayout } from 'core/ui/components/screen-layout/screen-layout';
import { ButtonContained } from 'core/ui/components/button/button-contained';

const { width, height } = Dimensions.get('window');

function WelcomeScreen({
  navigation,
}: {
  navigation: StackNavigationProp<NavigationStack>;
}) {
  const { t } = useTranslation();

  return (
    <ScreenLayout title={t('welcome.title')}>
      <View
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '15%',
        }}
      >
        <Image
          style={{
            // width: width * 0.8, // 50% от ширины экрана
            // height: height * 0.3, // 30% от высоты экрана
            width: 175,
            height: 235,
            marginBottom: 40,
          }}
          resizeMode="contain"
          source={require('assets/welcome.png')}
        />

        {/* <View style={styles.buttonsWrapper}>
        <Button title={t('welcome.emailContinue')} />
      </View>

      <View style={styles.orWrapper}>
        <Text>------------- or -------------</Text>
      </View> */}

        <View style={styles.sides}>
          {/* <View>
          <BodySmallMediumText text={t('welcome.registered')} />
        </View> */}
          <View>
            <ButtonContained
              onPress={() => navigation.navigate(AuthScreensEnum.signIn as any)}
            >
              {t('welcome.signIn')}
            </ButtonContained>
            <View style={styles.signUpWrapper}>
              <Link
                title={t('welcome.signUp')}
                onPress={() =>
                  navigation.navigate(AuthScreensEnum.signUp as any)
                }
              />
            </View>
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    textAlign: 'center',
  },

  buttonsWrapper: {
    // marginTop: 55,
  },

  orWrapper: {
    // marginVertical: 15,
  },

  welcomeWrapper: {
    // marginVertical: 15,
  },

  sides: {
    display: 'flex',
  },

  signUpWrapper: {
    marginTop: 15,
  },
});

export default WelcomeScreen;
