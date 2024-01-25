/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { ImageBackground, View } from 'react-native';

interface Props {
  src: string;
}

export const HeadImage = ({ src }: Props) => {
  return (
    <View
      style={{
        width: '100%',
        height: 280,
        position: 'absolute',
        backgroundColor: '#fff',
      }}
    >
      <ImageBackground
        source={(src && { uri: src }) || require('assets/back-image.png')}
        resizeMode="cover"
        style={{ flex: 1, alignSelf: 'stretch' }}
      />
    </View>
  );
};
