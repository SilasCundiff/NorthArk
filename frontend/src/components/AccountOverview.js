import { useEffect, useState } from 'react';
import axios from 'axios';

export const AccountOverview = () => {
  const [data, setData] = useState();
  useEffect(() => {
    axios.get('http://localhost:8080/api/test').then((res) => {
      setData(res.data);
    });
  }, []);
  console.log(data);

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
