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
import {
  DimensionValue,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

interface Props extends ViewProps {
  children: React.ReactNode;

  small?: DimensionValue;
  large?: DimensionValue;
  medium?: DimensionValue;

  smallStyle?: StyleProp<ViewStyle>;
  mediumStyle?: StyleProp<ViewStyle>;
}

export const Row = ({
  children,
  large,
  medium,
  small,
  smallStyle,
  mediumStyle,
  ...rest
}: Props) => {
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

        rest.style,

        // Применение стилей для маленьких экранов
        sizeType === ScreenSize.small && smallStyle !== undefined
          ? smallStyle
          : {},

        sizeType === ScreenSize.medium && mediumStyle !== undefined
          ? mediumStyle
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
