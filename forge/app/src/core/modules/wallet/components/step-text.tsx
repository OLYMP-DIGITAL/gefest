/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { TextBody } from 'core/ui/components/typography/text-body';
import { TextTitle } from 'core/ui/components/typography/text-title';
import { useTranslation } from 'react-i18next';
import { useCurrentStage } from 'core/finance/investment-stage/use-current-stage';
import { View } from 'react-native';
import { useStyles } from 'core/hooks/use-styles.hook';

export const StepText = () => {
  const { t } = useTranslation();
  const stage = useCurrentStage();
  const styles = useCurrentStyles();

  return (() => {
    if (!stage) {
      return <TextBody style={styles.title}>Loading...</TextBody>;
    }

    return (
      <View style={styles.wrapper}>
        <TextBody style={styles.title}>{stage.title}</TextBody>
        <TextBody style={styles.description}>{stage.description}</TextBody>
      </View>
    );
  })();
};

const useCurrentStyles = () => {
  return useStyles(() => ({
    wrapper: {
      padding: 15,
    },

    title: {
      color: '#fff',
      fontWeight: '600',
      textAlign: 'center',
    },

    description: {
      color: '#fff',
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 10,
    },
  }));
};
