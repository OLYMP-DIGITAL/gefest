/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { NativeStyles, useStyles } from 'core/hooks/use-styles.hook';
import { TextTitle } from 'core/ui/components/typography/text-title';
import { View } from 'react-native';

interface Props {
  title?: string;
}

export const CardTitle = ({ title }: Props) => {
  const styles = useStyles((theme) => ({
    wrapper: {
      padding: 16,
    } as NativeStyles,
  }));

  return (
    <View style={styles.wrapper}>
      <TextTitle>{title}</TextTitle>
    </View>
  );
};
