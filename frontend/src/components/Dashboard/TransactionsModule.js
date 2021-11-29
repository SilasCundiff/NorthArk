import { useEffect } from 'react';
import { TransactionsTable } from './TransactionsTable';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const TransactionsModule = ({ loadingTransactions, selectedAccount, transactions, getTransactions }) => {
  useEffect(() => {
    if (selectedAccount) {
      getTransactions(selectedAccount.account_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAccount]);

  return (
    <div>
      <h2 sx={{ fontSize: '5px' }}>
        Transaction History for {selectedAccount ? selectedAccount.name : 'All accounts'}
      </h2>
      {loadingTransactions === 'initial' && <div>No transactions loaded</div>}
      {loadingTransactions === 'loading' && (
        <Box
          sx={{
            display: 'flex',
            minHeight: '300px',
          }}
        >
          <CircularProgress
            sx={{
              margin: 'auto',
            }}
          />
        </Box>
      )}
      {loadingTransactions === 'done' && transactions.total_transactions > 0 && (
        <TransactionsTable transactions={transactions.transactions} selectedAccount={selectedAccount} />
      )}
      {loadingTransactions === 'done' && transactions.total_transactions === 0 && (
        <div>No transactions found for this account!</div>
      )}
    </div>
  );
};

export default TransactionsModule;
