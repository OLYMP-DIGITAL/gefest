/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useStyles } from 'core/hooks/use-styles.hook';
import { ScreenSize, useWindowSize } from 'core/providers/theme.provider';
import React, { useEffect, useState } from 'react';
import { DimensionValue, View } from 'react-native';

interface Props {
  children: React.ReactNode;

  small?: DimensionValue;
  large?: DimensionValue;
  medium?: DimensionValue;
}

export const Row = ({ children, large, medium, small }: Props) => {
  const styles = useRowStyles();
  const { sizeType } = useWindowSize();

  return (
    <View
      style={[
        styles.container,
        sizeType === ScreenSize.large && large !== undefined
          ? { width: large }
          : {},

        sizeType === ScreenSize.medium && large !== undefined
          ? { width: medium }
          : {},
        sizeType === ScreenSize.small && large !== undefined
          ? { width: small }
          : {},
      ]}
    >
      {React.Children.map(children, (child) => child)}
    </View>
  );
};

const useRowStyles = () => {
  return useStyles((theme) => ({
    container: {
      width: '100%',
    },
  }));
};
