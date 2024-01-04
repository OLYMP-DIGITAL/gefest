import { useTheme } from 'core/providers/theme.provider';
import { TextDisplay } from 'core/ui/components/typography/text-display';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LifePayCard } from './components/lfe-pay-card/life-pay-card.component';
import { PortfolioValue } from './components/portfolio-value';
import { ShareCount } from './components/share-count';
import { StepText } from './components/step-text';
import { TotalAmount } from './components/total-amount';
import { UserActionsTable } from './components/user-actions-table/user-actions-table';
import { useLifePayTransactions } from 'core/features/life-pay/use-life-pay-transactions.hook';

const WalletScreen = () => {
  useLifePayTransactions();

  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <TextDisplay>{t('wallet.title')}</TextDisplay>

        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <StepText />

          <View style={styles.cards}>
            <LifePayCard />

            <View style={styles.infoCards}>
              <TotalAmount />

              <View style={styles.mt}>
                <ShareCount />
              </View>

              <View style={styles.mt}>
                <PortfolioValue />
              </View>
            </View>
          </View>

          <UserActionsTable />
        </View>
      </View>
    </ScrollView>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 30,
        },

        mt: {
          marginTop: 13,
        },

        cards: {
          display: 'flex',
          marginVertical: 30,
          flexDirection: 'row',
        },

        infoCards: {
          width: 300,
          marginLeft: 45,
        },
      }),
    [theme]
  );

  return styles;
};

export default WalletScreen;
