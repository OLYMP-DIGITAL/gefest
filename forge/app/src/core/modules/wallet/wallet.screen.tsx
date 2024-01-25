/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useLifePayTransactions } from 'core/features/life-pay/use-life-pay-transactions.hook';
import { ReferralEarningsTable } from 'core/features/referral-earning/referral-earnings.table';
import { useReferralEarnings } from 'core/features/referral-earning/use-referral-earnings.hook';
import { useUser } from 'core/features/users/use-user';
import { useTheme } from 'core/providers/theme.provider';
import { ScreenLayout } from 'core/ui/components/screen-layout';
import { TextDisplay } from 'core/ui/components/typography/text-display';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, StyleSheet, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useRecoilState } from 'recoil';
import { HeaderStage } from './components/header-stage';
import { LifePayCard } from './components/lfe-pay-card/life-pay-card.component';
import { PortfolioValue } from './components/portfolio-value';
import { ShareCount } from './components/share-count';
import { StepText } from './components/step-text';
import { TotalAmount } from './components/total-amount';
import { UserActionsTable } from './components/user-actions-table/user-actions-table';
import {
  walletMessageAtom,
  walletMessageLinkAtom,
  walletShowMessageAtom,
} from './wallet.atoms';

const WalletScreen = () => {
  useReferralEarnings();
  const styles = useStyles();
  const { t } = useTranslation();
  const { fetchTransactions } = useLifePayTransactions();
  const { fetchUser } = useUser();

  const [alertMessage] = useRecoilState(walletMessageAtom);
  const [showAlert, setShowAlert] = useRecoilState(walletShowMessageAtom);
  const [messageLink, setMessageLink] = useRecoilState(walletMessageLinkAtom);

  return (
    <>
      <ScreenLayout>
        <HeaderStage />

        <View>
          <TextDisplay>{t('wallet.title')}</TextDisplay>

          <View style={{ display: 'flex', flexDirection: 'column' }}>
            <StepText />

            <View style={styles.cards}>
              <LifePayCard
                fetchTransactions={fetchTransactions}
                fetchUser={fetchUser}
              />

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

            <View style={{ marginTop: 13 }}>
              <ReferralEarningsTable />
            </View>
          </View>
        </View>
      </ScreenLayout>

      <AwesomeAlert
        show={showAlert}
        message={alertMessage}
        overlayStyle={{ overflow: 'hidden' }}
        closeOnTouchOutside={false}
        cancelText="Close"
        confirmText={messageLink ? t('wallet.openLink') : ''}
        onConfirmPressed={() => {
          if (messageLink) {
            Linking.openURL(messageLink);
          }

          setShowAlert(false);
          setMessageLink('');
        }}
        onCancelPressed={() => {
          setShowAlert(false);
          setMessageLink('');
        }}
        showConfirmButton={!!messageLink}
        showCancelButton={true}
      />
    </>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        headerStage: {},

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
          width: 380,
          marginLeft: 45,
        },
      }),
    [theme]
  );

  return styles;
};

export default WalletScreen;
