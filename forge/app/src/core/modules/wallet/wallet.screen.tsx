/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useBrand } from 'core/features/brand/use-brand';
import { useLifePayTransactions } from 'core/features/life-pay/use-life-pay-transactions.hook';
import { ReferralEarningsTable } from 'core/features/referral-earning/referral-earnings.table';
import { useReferralEarnings } from 'core/features/referral-earning/use-referral-earnings.hook';
import { useUser } from 'core/features/users/use-user';
import { useCurrentStage } from 'core/finance/investment-stage/use-current-stage';
import { useStyles } from 'core/hooks/use-styles.hook';
import { Col } from 'core/ui/components/screen-layout/col';
import { Row } from 'core/ui/components/screen-layout/row';
import { ScreenLayout } from 'core/ui/components/screen-layout/screen-layout';
import { TextBody } from 'core/ui/components/typography/text-body';
import { TextHeadline } from 'core/ui/components/typography/text-headline';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Linking, Text, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useRecoilState } from 'recoil';
import { LifePayCard } from './components/lfe-pay-card/life-pay-card.component';
import { PointsCount } from './components/points-count';
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
import { useSupportEmail } from 'core/features/support/use-support-email.hook';

const WalletScreen = () => {
  useReferralEarnings();
  const email = useSupportEmail();
  const stage = useCurrentStage();
  const styles = useScreenStyles();
  const { t } = useTranslation();
  const { fetchTransactions } = useLifePayTransactions();
  const { fetchUser } = useUser();

  const [alertMessage] = useRecoilState(walletMessageAtom);
  const [showAlert, setShowAlert] = useRecoilState(walletShowMessageAtom);
  const [messageLink, setMessageLink] = useRecoilState(walletMessageLinkAtom);

  return (
    <>
      <ScreenLayout title={t('wallet.title')} redBookmark={<StepText />}>
        <View style={styles.title}>
          <TextHeadline>{t('wallet.takeShares')}</TextHeadline>
        </View>

        <Col between>
          <Row large={'45%'} small={'100%'} medium={'100%'}>
            <TextBody style={{ fontWeight: '600' }}>
              {t('wallet.description1')}
              <Text style={styles.email}>{email}</Text>
              {t('wallet.description2')}
            </TextBody>

            <TextBody style={styles.limit}>
              {t('wallet.stagesLimit')} {stage && Math.floor(stage?.max / 100)}$
            </TextBody>
          </Row>

          <Row large={'45%'} small={'100%'} medium={'100%'}>
            <LifePayCard
              fetchTransactions={fetchTransactions}
              fetchUser={fetchUser}
            />
          </Row>
        </Col>

        <View style={styles.title}>
          <TextHeadline>{t('wallet.portfolio')}</TextHeadline>
        </View>

        <Col between>
          <Row large={'55%'} small={'100%'}>
            <Col between>
              <Row large={'45%'} small={'100%'} style={{ marginTop: 20 }}>
                <ShareCount />
              </Row>

              <Row large={'45%'} small={'100%'} style={{ marginTop: 20 }}>
                <TotalAmount />
              </Row>
            </Col>

            <Col between>
              <Row large={'45%'} small={'100%'} style={{ marginTop: 20 }}>
                <PointsCount />
              </Row>
            </Col>
          </Row>

          <Row large={'40%'} small={'100%'} style={{ marginTop: 20 }}>
            <PortfolioValue />
          </Row>
        </Col>

        <Image
          // style={{ width: '100%', height: '257' }}
          style={{ height: 257, width: '100%' }}
          source={{ uri: require('assets/chart.png') }}
        />

        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <View style={styles.title}>
            <TextHeadline>{t('lifePay.table.title')}</TextHeadline>
          </View>

          <UserActionsTable />

          <View style={styles.title}>
            <TextHeadline>{t('finance.referralEarnings.title')}</TextHeadline>
          </View>

          <ReferralEarningsTable />
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

const useScreenStyles = () => {
  const brand = useBrand();

  return useStyles((theme) => ({
    email: {
      color: brand.primaryColor,
    },
    limit: {
      color: brand.primaryColor,
      marginTop: 50,
      fontWeight: '600',
    },

    title: {
      marginTop: 40,
      marginBottom: 30,
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
  }));
};

export default WalletScreen;
