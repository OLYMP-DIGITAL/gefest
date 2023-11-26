import { useMemo } from 'react';
import { Transaction } from 'core/features/transactions/transactions.types';
import { StyleSheet, View } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';

interface Props {
  transaction: Transaction;
}

export const TransactionTable = ({ transaction }: Props) => {
  const table = useMemo(() => {
    return {
      tableHead: ['id', 'value', 'currency', 'status'],
      tableData: [
        [
          transaction.payment,
          transaction.value,
          transaction.currency,
          transaction.status,
        ],
      ],
    };
  }, [transaction]);

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
});
