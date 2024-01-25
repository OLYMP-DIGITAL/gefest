/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { brandAtom } from 'core/features/brand/brand.atoms';
import { useStyles } from 'core/hooks/use-styles.hook';
import { Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';

export const HeaderStage = () => {
  const styles = useComponentStyles();

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.text}>test</Text>
      </View>
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
      alignItems: 'flex-end',
    },

    block: {
      minWidth: 300,
      backgroundColor: brand.primaryColor,
    },
  }));

  return styles;
};
