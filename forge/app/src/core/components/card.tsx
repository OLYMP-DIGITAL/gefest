import { StyleSheet, Text, View } from 'react-native';

export const Card = () => {
  return (
    <View style={styles.wrapper}>
      <Text>Text</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
});
