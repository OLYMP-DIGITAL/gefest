/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { brandAtom } from 'core/features/brand/brand.atoms';
import { useStyles } from 'core/hooks/use-styles.hook';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

interface Props {
  children: React.ReactNode;
}

export const RedBookmark = ({ children }: Props) => {
  const styles = useComponentStyles();

  return (
    <View style={styles.container}>
      <View style={styles.block}>{children}</View>
    </View>
  );
};

const useComponentStyles = () => {
  const brand = useRecoilValue(brandAtom);

  const styles = useStyles((theme) => ({
    text: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
      paddingVertical: 13,
    },

    container: {
      display: 'flex',
      top: 0,
      right: 0,
      position: 'absolute',
      alignItems: 'flex-end',
    },

    block: {
      minWidth: 300,
      backgroundColor: brand.primaryColor,
    },
  }));

  return styles;
};
