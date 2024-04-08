/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useStyles } from 'core/hooks/use-styles.hook';
import { ScrollView, View } from 'react-native';
import { useBrand } from 'core/features/brand/use-brand';
import { ScreenSize, useWindowSize } from 'core/providers/theme.provider';
import { TextDisplay } from '../typography/text-display';
import { RedBookmark } from './components/red-bookmark';
import { HeadImage } from './components/head-image';

const HEAD_HEIGHT = 200;

interface Props {
  children: React.ReactNode;

  title?: string;
  redBookmark?: React.ReactNode;
}

export const ScreenLayout = ({ children, redBookmark, title = '' }: Props) => {
  const brand = useBrand();
  const styles = useScreenLayoutStyles();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeadImage src={brand.headImage} height={HEAD_HEIGHT} />

      <View style={[styles.headContent]}>
        {title && (
          <View style={styles.title}>
            <TextDisplay style={styles.titleText}>{title}</TextDisplay>
          </View>
        )}

        {redBookmark && <RedBookmark>{redBookmark}</RedBookmark>}
      </View>

      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
};

const useScreenLayoutStyles = () => {
  const { sizeType } = useWindowSize();

  return useStyles(
    (theme) => ({
      title: {
        flex: 1,
        height: HEAD_HEIGHT,
        justifyContent: sizeType === ScreenSize.small ? 'flex-end' : 'center',
      },

      titleText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: -100,
        fontWeight: 600,
        textTransform: 'uppercase',
      },

      container: {
        flexGrow: 1,
        backgroundColor: '#F1F2F6',
        alignItems: 'center',
      },

      headContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: (sizeType === ScreenSize.large && 1000) || '100%',
      },

      content: {
        width: (sizeType === ScreenSize.large && 1000) || '100%',
        paddingBottom: 30,
        paddingHorizontal: sizeType === ScreenSize.large ? 0 : 30,
      },
    }),
    [sizeType]
  );
};
