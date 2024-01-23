/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useCallback } from 'react';
import { Alert, Linking } from 'react-native';
import { useSupportEmail } from './use-support-email.hook';
import { Link } from 'core/components/link';
import { useTranslation } from 'react-i18next';

export const SupportEmailLink = () => {
  const { t } = useTranslation();
  const email = useSupportEmail();

  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(`mailto:${email}`);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(`mailto:${email}`);
    } else {
      Alert.alert(`Don't know how to open this URL: ${email}`);
    }
  }, [email]);

  return <Link title={t('welcome.support')} onPress={handlePress} />;
};
