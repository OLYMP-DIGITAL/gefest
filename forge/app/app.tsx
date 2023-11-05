import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Route, NativeRouter, Link, Routes } from 'react-router-native';

import { Button } from './@odysseus/components/button';

const Home = () => (
  <View style={styles.container}>
    <Text>Open up App.js to start working on your app!!!</Text>
    <Button title="test" />
    <StatusBar style="auto" />
  </View>
);

const About = () => (
  <View style={styles.container}>
    <Text>About page!</Text>
    <StatusBar style="auto" />
  </View>
);

const Topics = () => (
  <View style={styles.container}>
    <Text>Topics page!</Text>
    <StatusBar style="auto" />
  </View>
);

export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <View style={styles.nav}>
          <Link to="/" underlayColor="#f0f4f7" style={styles.navItem}>
            <Text>Home</Text>
          </Link>
          <Link to="/about" underlayColor="#f0f4f7" style={styles.navItem}>
            <Text>About</Text>
          </Link>
          <Link to="/topics" underlayColor="#f0f4f7" style={styles.navItem}>
            <Text>Topics</Text>
          </Link>
        </View>

        <Routes>
          <Route index path="/" Component={Home} />
          <Route path="/about" Component={About} />
          <Route path="/topics" Component={Topics} />
        </Routes>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  header: {
    fontSize: 20,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  subNavItem: {
    padding: 5,
  },
  topic: {
    textAlign: 'center',
    fontSize: 15,
  },
});
