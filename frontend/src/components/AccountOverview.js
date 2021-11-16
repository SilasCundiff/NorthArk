import { useEffect, useState } from 'react';
import { useFetchApiData } from '../lib/hooks';

export const AccountOverview = () => {
  const [data, setData] = useState();
  const fetchData = useFetchApiData();

  useEffect(() => {
    fetchData('http://localhost:8080/api/test').then((res) => {
      setData(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Adding fetchData to dep array causes an infinite loop because we are updating data with it's response

  return (
    <div className='overviewDiv'>
      <h2 sx={{ fontSize: '5px' }}>Account Overview</h2>
      <p>
        <span>{data?.first ?? ''} </span>
        <span>{data?.last ?? ''}</span>
      </p>
      <div>{data?.balance ?? ''}</div>
    </div>
  );
};
