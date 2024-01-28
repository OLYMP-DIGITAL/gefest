/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or\n *   intended publication of such source code. The code contains\n *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useLanguage } from 'core/hooks/use-language';
import { useStyles } from 'core/hooks/use-styles.hook';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, View } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';
import { useRecoilValue } from 'recoil';
import { referralEarningsAtom } from './referral-earning.atoms';

export const ReferralEarningsTable = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const styles = useComponentStyles();
  const earnings = useRecoilValue(referralEarningsAtom);

  const table = useMemo(() => {
    return {
      tableHead: [
        `${t('finance.referralEarnings.value')} ($)`,
        t('finance.referralEarnings.date'),
        t('finance.referralEarnings.user'),
      ],
      tableData: [
        ...earnings.map((earning) => [
          `${Math.floor(earning.value / 100)}`,
          (() => {
            const inputDate = earning.createdAt;

            return new Date(inputDate).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            });
          })(),
          `${earning.user.name} ${earning.user.lastname}`,
        ]),
      ],
    };
  }, [earnings, language]);

  return (
    <View
      style={[
        styles.container,
        Platform.OS === 'android'
          ? { elevation: 5 }
          : {
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 1,
              shadowRadius: 5,
            },
      ]}
    >
      {/* <TextTitle>{t('finance.referralEarnings.title')}</TextTitle> */}

      <Table>
        <Row
          data={table.tableHead}
          style={styles.head}
          textStyle={styles.textContent}
        />
        <Rows
          style={styles.head}
          data={table.tableData}
          textStyle={styles.textContent}
        />
      </Table>
    </View>
  );
};

const useComponentStyles = () => {
  const styles = useStyles((theme) => ({
    container: {
      backgroundColor: '#fff',
      borderWidth: 0,
      borderRadius: 2,
      padding: 16, // Если нужен внутренний отступ
      width: 'auto', // 'auto' по умолчанию в React Native
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.12,
      shadowRadius: 3,
      elevation: 2, // Для имитации box-shadow на Android
      fontFamily: 'Roboto',
      fontSize: 13,
      fontWeight: '400',
    },
    head: {
      height: 40,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },

    textContent: { paddingHorizontal: 56, paddingVertical: 0 },
    textHead: {
      textAlign: 'center',
    },
  }));

  return styles;
};
