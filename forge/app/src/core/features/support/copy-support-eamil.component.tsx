/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */

import { useCopyToClipboard } from 'usehooks-ts';
import { useSupportEmail } from './use-support-email.hook';
import { Text, View } from 'react-native';
import { useStyles } from 'core/hooks/use-styles.hook';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { useCallback } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { useTranslation } from 'react-i18next';

export const CopySupportEmail = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const email = useSupportEmail();
  const styles = useComponentStyles();
  const [, setCopiedValue] = useCopyToClipboard();

  const click = useCallback(() => {
    setCopiedValue(`${email}`);
    toast.show(t('emailCoped'));
  }, [email]);

  return (
    <View style={styles.userReferal}>
      <TouchableOpacity style={styles.userReferalButton} onPress={click}>
        <Entypo name="copy" size={18} color="gray" />
        <Text style={styles.userNameLabel}>{email}</Text>
      </TouchableOpacity>
    </View>
  );
};

const useComponentStyles = () => {
  return useStyles((theme) => ({
    userReferalButton: {
      display: 'flex',
      flexDirection: 'row',
    },
    userNameLabel: {
      paddingHorizontal: 5,
      color: '#bdbdbd',
      fontSize: 14,
      fontWeight: '400',
    },
    userReferal: {
      color: 'white',
      alignItems: 'center',
      marginRight: 25,
    },
  }));
};
