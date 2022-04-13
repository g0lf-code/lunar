import axios from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from './Products';

export default function ProductsList() {
  const [products, setProducts] = useState();

  async function getdata() {
    const data = await axios({
      method: 'get',
      url: 'http://localhost:4000/product/all_products',
      withCredentials: true,
    });
    if (data) {
      console.log(data);
      setProducts(data?.data?.payload);
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
        // justifyContent: 'space-between',
      }}
    >
      {products?.map((prod) => {
        return <ProductCard prod={prod} />;
      })}
    </div>
  );
}
