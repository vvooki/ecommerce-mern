import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { publicRequest } from '../requestMethods';
const NewDrop = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get('/products/new');
        setProduct(res.data);
        setIsLoading(false);
      } catch {}
    };
    getProduct();
  }, []);

  if (isLoading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="new-drop">
        <Link to={`/product/${product._id}`}>
          <div className="title">
            <p>NEW DROP</p>
            <p style={{ textTransform: 'uppercase' }}>
              {product.category.includes('Model') ? '3D Model' : '3D Print'}
            </p>
          </div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-react.appspot.com/o/figurine%20(2).png?alt=media&token=5fe0ca2c-5e34-4bd6-8ee9-97c8798c9da4"
            alt=""
          />
          <div className="drop-info">
            <h3>{product.title}</h3>
            <p>{product.price}$</p>
          </div>
        </Link>
      </div>
    );
  }
};

export default NewDrop;
