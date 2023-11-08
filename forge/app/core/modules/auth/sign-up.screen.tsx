import { Text, View } from 'react-native';

export function SignUpScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Sign up screen</Text>
    </View>
  );
}

SignUpScreen.route = 'SignUp';

export default SignUpScreen;
