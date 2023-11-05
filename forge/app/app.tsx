import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({ navigation }: HomeProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

function DetailsScreen({ navigation }: DetailsProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen as any} />
        <Stack.Screen name="Details" component={DetailsScreen as any} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
