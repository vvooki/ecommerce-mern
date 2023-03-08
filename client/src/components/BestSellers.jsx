import React, { useEffect, useState } from 'react';
import NewDrop from './NewDrop';
import productsData from '../data/productsData';
import ProductBox from './ProductBox';
import axios from 'axios';
const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const slicedProducts = products.slice(0, 8);
  const getProducts = async (link) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/products/?sort=-sold`
      );
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="special-offer-section">
      <div className="special-offer-container">
        <NewDrop />
        <div className="best-sellers-container">
          <div className="section-title-container">
            <div className="section-title">
              <h3>Best sellers</h3>
            </div>
          </div>
          <div className="best-sellers">
            {slicedProducts.map((product) => {
              return <ProductBox key={product.id} {...product} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
