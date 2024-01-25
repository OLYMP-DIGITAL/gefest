/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useStyles } from 'core/hooks/use-styles.hook';
import { View } from 'react-native';
import { HeadImage } from './head-image';
import { useBrand } from 'core/features/brand/use-brand';
import { ScrollView } from 'react-native-gesture-handler';
import { ScreenSize, useWindowSize } from 'core/providers/theme.provider';

interface Props {
  children: React.ReactNode;
}

export const ScreenLayout = ({ children }: Props) => {
  const brand = useBrand();
  const styles = useScreenLayoutStyles();

  return (
    <ScrollView contentContainerStyle={styles.container} id="screen-layout">
      <HeadImage src={brand.headImage} />

      <View style={styles.content} id="screen-layout-content">
        {children}
      </View>
    </ScrollView>
  );
};

const useScreenLayoutStyles = () => {
  const { sizeType } = useWindowSize();

  return useStyles(
    (theme) => ({
      container: {
        flex: 1,
        alignItems: 'center',
      },
      content: {
        width: (sizeType === ScreenSize.large && 1000) || '100%',
      },
    }),
    [sizeType]
  );
};
