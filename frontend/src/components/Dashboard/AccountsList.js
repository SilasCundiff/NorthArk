export const AccountsList = ({ accounts = [], setSelectedAccount }) => {
  const handleClick = (accountId) => {
    setSelectedAccount(accountId);
  };
  return (
    <>
      {accounts.map((account) => {
        return (
          <div key={account.account_id} className='accountItem' onClick={() => handleClick(account)}>
            <h3>{account.name}</h3>
            <div>
              <span>{account.balances.available && `available: $ ${account.balances.available}`}</span>{' '}
              <span>current: ${account.balances.current}</span>
            </div>
          </div>
        );
      })}
    </>
  );
};
