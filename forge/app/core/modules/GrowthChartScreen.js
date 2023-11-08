import React from 'react';
import { View, Text, Image } from 'react-native';

const GrowthChartScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>{t('welcome')}</Text> */}
      <Image
        style={{ width: '70%', height: '100%' }}
        source={{ uri: require('@assets/graph.png') }}
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

export default GrowthChartScreen;
