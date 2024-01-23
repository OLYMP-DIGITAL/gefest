/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { NativeStyles, useStyles } from 'core/hooks/use-styles.hook';
import { shadows } from 'core/ui/styles/shadows.styles';
import React from 'react';
import { View } from 'react-native';

/**
 * <Card>
 *     <CardTitle title={t('lifePay.totalAmount')} />
 *     <CardContent text={`${value / 100}$`} />
 * </Card>
 */

interface Props {
  children: React.ReactNode;
  style?: NativeStyles;
}

export const Card = (props: Props) => {
  const styles = useStyles((theme) => ({
    wrapper: {
      borderRadius: 4,
      backgroundColor: '#fff',
    },
  }));

  return (
    <View style={[shadows[0], styles.wrapper, props.style]}>
      {props.children}
    </View>
  );
};
