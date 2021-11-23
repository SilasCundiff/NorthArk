export const AccountsList = ({ accounts = [] }) => {
  return (
    <>
      {accounts.map((account) => {
        return (
          <div key={account.account_id}>
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
