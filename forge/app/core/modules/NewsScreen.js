import React from 'react';
import { View, Text, Image } from 'react-native';

const NewsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      }}
    >
      {/* <Text>{t('welcome')}</Text> */}
      <Image
        style={{ width: '70%', height: '100%' }}
        source={{ uri: require('@assets/news.png') }}
      />

      {/* <View style={styles.line}>
        <Button
          title="Go to parters"
          onPress={() => navigation.navigate('Partners')}
        />
      </View>

      <Button title="Open drawer" onPress={() => navigation.openDrawer()} /> */}
    </View>
  );
};

export default NewsScreen;
