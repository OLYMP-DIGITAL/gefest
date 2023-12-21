import { Link } from 'core/components/link';
import RoundedButton from 'core/components/rounded-button';
import { AuthScreensEnum, NavigationStack } from 'core/types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

function WelcomeScreen({
  navigation,
}: {
  navigation: StackNavigationProp<NavigationStack>;
}) {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        style={{
          width: width * 0.8, // 50% от ширины экрана
          height: height * 0.3, // 30% от высоты экрана
        }}
        resizeMode="contain"
        source={require('assets/welcome.png')}
      />

      <View style={styles.welcomeWrapper}>
        <Text style={styles.title}>{t('welcome.title')}</Text>
      </View>

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
          <RoundedButton
            title={t('welcome.signIn')}
            onPress={() => navigation.navigate(AuthScreensEnum.signIn as any)}
          />
          <View style={styles.signUpWrapper}>
            <Link
              title={t('welcome.signUp')}
              onPress={() => navigation.navigate(AuthScreensEnum.signUp as any)}
            />
          </View>
        </View>
      </View>
    </View>
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
    marginVertical: 15,
  },

  welcomeWrapper: {
    marginVertical: 15,
  },

  sides: {
    display: 'flex',
  },

  signUpWrapper: {
    marginTop: 15,
  },
});

export default WelcomeScreen;
