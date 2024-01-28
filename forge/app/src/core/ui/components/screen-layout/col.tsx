/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useStyles } from 'core/hooks/use-styles.hook';
import { View, ViewProps } from 'react-native';

interface StylesProps extends ViewProps {
  between?: boolean;
}

interface Props extends StylesProps {
  children: React.ReactNode;
}

export const Col = ({ children, between, ...rest }: Props) => {
  const styles = useRowStyles({ between });

  return <View style={[styles.container, rest.style]}>{children}</View>;
};

const useRowStyles = ({ between }: StylesProps) => {
  return useStyles((theme) => ({
    container: {
      width: '100%',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: (() => {
        if (between) {
          return 'space-between';
        }
        return 'baseline' as any;
      })(),
    },
  }));
};
