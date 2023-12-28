import {
  LifePayInvoiceStatus,
  getUserTransactions,
} from 'core/features/life-pay/life-pay.api';
import { useTheme } from 'core/providers/theme.provider';
import { TFunction } from 'i18next';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, StyleSheet, View } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';

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
          action.date,
          action.count,
          getTransactionStatus(action.status as LifePayInvoiceStatus, t),
        ]),
      ],
    };
  }, [userTransactions]);

  useEffect(() => {
    getUserTransactions().then((transactions) => {
      setUserTransactions(
        transactions.map((transaction) => ({
          value: transaction.amount / 100,
          count: transaction.shareCount,
          date: transaction.createdAt,
          status: transaction.status,
        }))
      );
    });
  }, []);

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
      <Table>
        <Row
          data={table.tableHead}
          style={styles.head}
          textStyle={styles.text}
        />
        <Rows data={table.tableData} textStyle={styles.text} />
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
          flex: 1,
          width: '100%',
          border: `1px solid #ccc`,
          marginVertical: 30,
          // paddingTop: 30,
          backgroundColor: '#fff',
          borderRadius: 2,
        },
        head: { height: 40, backgroundColor: '#f1f8ff' },
        text: { margin: 6 },
      }),
    [theme]
  );

  return styles;
};
