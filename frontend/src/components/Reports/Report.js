import { useAccountsContext } from '../../context/AccountsContext';
const Report = () => {
  const { transactions } = useAccountsContext();
  return <div>Example report</div>;
};

export default Report;
