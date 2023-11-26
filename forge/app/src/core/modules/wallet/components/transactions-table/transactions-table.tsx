import { H1Text } from 'core/components/text/h1.text';
import { H3Text } from 'core/components/text/h3.text';
import { Transaction } from 'core/features/transactions/transactions.types';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';

interface Props {
  transactions: Transaction[];
}

export const TransactionsTable = ({ transactions }: Props) => {
  const table = useMemo(() => {
    return {
      tableHead: ['value', 'currency', 'status'],
      tableData: [
        ...transactions.map((transaction) => [
          transaction.value,
          transaction.currency,
          transaction.status,
        ]),
      ],
    };
  }, [transactions]);

  return (
    <View style={styles.container}>
      <H3Text text="Transaction history"></H3Text>

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
});
