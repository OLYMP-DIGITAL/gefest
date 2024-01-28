/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useTheme } from 'core/providers/theme.provider';
import { Theme } from 'core/style/themes';
import { useMemo } from 'react';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

/**
 * Хук создает объект со стилями, в качестве аргументов принимает функцию
 * которая передает объект theme, откуда можно достать цвета темы и расчитывать
 * на то, что при смене темы цвета обновятся
 * ============================ Usage ==========================================
 *
 * const Component = () => {
 *   const styles = useStyles((theme) => ({
 *     wrapper: {
 *       backgroundColor: theme.bgColor,
 *     } as NativeStyles,
 *   }));
 *
 *   return <View style={styles.wrapper}>{props.children}</View>;
 * };
 */

export type NativeStyles = ViewStyle | TextStyle | ImageStyle;

export type StylesPack = {
  [key: string]: ViewStyle | TextStyle | ImageStyle;
};

export type TypedStylesPack<T> = {
  [Property in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export function useStyles<T>(
  makeStyles: (t: Theme) => TypedStylesPack<T>,
  watch: any[] = []
): TypedStylesPack<T> {
  const theme = useTheme();

  const styles: any = useMemo(
    () => StyleSheet.create(makeStyles(theme.theme)),
    [theme, ...watch]
  );

  return styles;
}
