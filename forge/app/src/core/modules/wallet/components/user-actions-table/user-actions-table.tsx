/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { LifePayInvoiceStatus } from 'core/features/life-pay/life-pay.api';
import { lifePayTransactionsAtom } from 'core/features/life-pay/life-pay.atom';
import { useLanguage } from 'core/hooks/use-language';
import { useTheme } from 'core/providers/theme.provider';
import { TextHeadline } from 'core/ui/components/typography/text-headline';
import { TextTitle } from 'core/ui/components/typography/text-title';
import { TFunction } from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, View } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';
import { useRecoilValue } from 'recoil';

const getTransactionStatus = (
  status: LifePayInvoiceStatus,
  t: TFunction
): string => {
  if (status === LifePayInvoiceStatus.success) {
    return t('lifePay.transactionStatus.success');
  } else {
    return t('lifePay.transactionStatus.pending');
  }
};

interface TableData {
  value: number;
  date: string;
  count: number;
  status: string;
}

export const UserActionsTable = () => {
  const { language } = useLanguage();
  const transactions = useRecoilValue(lifePayTransactionsAtom);
  const [userTransactions, setUserTransactions] = useState<TableData[]>([]);
  const { t } = useTranslation();
  const styles = useUserActionsTableStyels();
  const table = useMemo(() => {
    return {
      tableHead: [
        `${t('lifePay.table.value')} ($)`,
        t('lifePay.table.date'),
        t('lifePay.table.count'),
        t('lifePay.table.status'),
      ],
      tableData: [
        ...userTransactions.map((action) => [
          action.value,
          (() => {
            const inputDate = action.date;

            return new Date(inputDate).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            });
          })(),
          action.count,
          getTransactionStatus(action.status as LifePayInvoiceStatus, t),
        ]),
      ],
    };
  }, [userTransactions, language]);

  useEffect(() => {
    setUserTransactions(
      transactions.map((transaction) => ({
        value: transaction.amount / 100,
        count: transaction.shareCount,
        date: transaction.createdAt,
        status: transaction.status,
      }))
    );
  }, [transactions]);

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
      <TextTitle>{t('lifePay.table.title')}</TextTitle>
      <Table style={{ zIndex: 1 }}>
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

const useUserActionsTableStyels = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
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
      }),
    [theme]
  );

  return styles;
};
