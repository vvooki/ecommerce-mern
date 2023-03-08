import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineStar } from 'react-icons/ai';
const ProductBox = ({ _id, img, title, price, category, topic }) => {
  return (
    <div className="product">
      <Link draggable="false" to={`/product/${_id}`}>
        <p className="category-name">
          <span>{category.includes('Model') ? '3D Model' : '3D Print'}</span>
        </p>
        <img draggable="false" src={img} alt={title} />
        <h4>{title}</h4>
        <div className="info">
          <p>{price}$</p>
          <p>
            4.5 <AiOutlineStar />
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductBox;
