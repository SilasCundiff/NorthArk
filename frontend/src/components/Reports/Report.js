import { useAccountsContext } from '../../context/AccountsContext';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const Report = () => {
  const { transactions } = useAccountsContext();

  return <div>{transactions && <PdfDoc transactions={transactions} />}</div>;
};

const styles = StyleSheet.create({
  page: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    minWidth: '100%',
    padding: '2rem',
  },
  header: {
    minWidth: '100%',
    gridColumnStart: 1,
    gridColumnEnd: 6,
    marginBottom: '1rem',
    fontSize: '1.75rem',
  },
  dateHeader: { gridColumnStart: 0, gridColumnEnd: 2, fontSize: '1.5rem' },
  descriptionHeader: { gridColumnStart: 2, gridColumnEnd: 5, fontSize: '1.5rem' },
  amountHeader: { gridColumnStart: 5, gridColumnEnd: 6, fontSize: '1.5rem' },
  date: { gridColumnStart: 0, gridColumnEnd: 2, fontSize: '1.1rem' },
  description: { gridColumnStart: 2, gridColumnEnd: 5, fontSize: '1.1rem' },
  amount: { gridColumnStart: 5, gridColumnEnd: 6, fontSize: '1.1rem' },
});
const PdfDoc = () => {
  const { transactions } = useAccountsContext();
  const transactionsData = transactions.transactions.filter(
    (transaction) => transaction.account_id === transactions.accounts[0].account_id
  );
  const date = new Date().toISOString().split('T')[0];
  return (
    <Document title='transactions report'>
      <Page size='A4' style={styles.page}>
        <View style={styles.header}>
          <Text>
            Expense Report for {transactions.accounts[0].name} as of: {date}
          </Text>
        </View>
        <View style={styles.dateHeader}>
          <Text>Date</Text>
        </View>
        <View style={styles.descriptionHeader}>
          <Text>Description</Text>
        </View>
        <View style={styles.amountHeader}>
          <Text>Amount</Text>
        </View>
        {transactionsData.map((data) => (
          <>
            <View style={styles.date}>
              <Text>{data.date}</Text>
            </View>
            <View style={styles.description}>
              <Text>{data.name}</Text>
            </View>
            <View style={styles.amount}>
              <Text>{data.amount}</Text>
            </View>
          </>
        ))}
      </Page>
    </Document>
  );
};

export default Report;
