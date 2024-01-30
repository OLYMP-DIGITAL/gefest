/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import React from 'react';
import { View, Text, Image } from 'react-native';

const FaqScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Text>{t('welcome')}</Text> */}
      <Image
        style={{ width: '70%', height: '100%' }}
        source={{ uri: require('assets/faq.png') }}
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

export default FaqScreen;
