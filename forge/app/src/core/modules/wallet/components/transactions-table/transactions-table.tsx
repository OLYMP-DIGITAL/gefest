/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { H3Text } from 'core/components/text/h3.text';
import { Transaction } from 'core/finance/transaction/transaction.types';
import { useStyles } from 'core/hooks/use-styles.hook';
import { useMemo } from 'react';
import { View } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';

interface Props {
  transactions: Transaction[];
}

export const TransactionsTable = ({ transactions }: Props) => {
  const styles = tableStyles();

  const table = useMemo(() => {
    return {
      tableHead: ['value', 'currency', 'status'],
      tableData: [
        ...transactions.map((transaction) => [
          transaction.amount,
          transaction.currency,
          transaction.status,
        ]),
      ],
    };
  }, [transactions]);

  return (
    <View style={styles.container}>
      <H3Text text="Transaction history"></H3Text>

      <Table borderStyle={{ borderWidth: 10, borderColor: '#c8e1ff' }}>
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

const tableStyles = () => {
  return useStyles((theme) => ({
    container: {
      flex: 1,
      padding: 16,
      marginVertical: 30,
      // paddingTop: 30,
      backgroundColor: '#fff',
      width: '100%',
      border: `2px solid #ccc`,
      borderRadius: 32,
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
  }));
};
