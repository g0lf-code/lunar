import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from '../product/Products';

export default function UsersList() {
  const [users, setUsers] = useState();

  async function getdata() {
    const data = await axios({
      method: 'get',
      url: 'http://localhost:4000/user/all_users',
    });
    if (data) {
      console.log(data);
      setUsers(data?.data?.payload);
    }
  }

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div
      style={{
        margin: 20,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {users?.map((user, i) => {
        return <ProductCard id={user._id} user={user} />;
      })}
    </div>
  );
}
