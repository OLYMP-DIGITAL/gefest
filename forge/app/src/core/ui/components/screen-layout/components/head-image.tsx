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
  height?: number;
}

export const HeadImage = ({ src, height = 200 }: Props) => {
  return (
    <View
      style={{
        width: '100%',
        height: height,
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
