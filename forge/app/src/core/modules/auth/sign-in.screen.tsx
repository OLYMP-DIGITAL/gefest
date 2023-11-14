import { Text, View } from 'react-native';

function SignInScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign in screen</Text>
    </View>
  );
}

SignInScreen.route = 'SignIn';

export default SignInScreen;
