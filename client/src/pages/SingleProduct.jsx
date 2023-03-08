import React, { useState, useEffect } from 'react';
import Gallery from '../components/Gallery';
import { AiOutlineStar } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../requestMethods';
import { addProduct } from '../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import { addToUserCart } from '../redux/apiCalls';
import toast, { Toaster } from 'react-hot-toast';

const SingleProduct = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get('/products/find/' + id);
        setProduct(res.data);
        setIsLoading(false);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === 'dec' && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === 'inc') {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCartClick = () => {
    dispatch(addProduct({ ...product, quantity }));
    if (user) {
      addToUserCart(user, product, quantity);
    }
    toast.success(`${product.title} added to the cart`);
  };

  if (isLoading) {
    return <div>loading</div>;
  } else {
    return (
      <section className="product-card-section">
        <Toaster />
        <div className="product-link-categories">
          <p>
            {' '}
            {product.category.includes('Model') ? '3D Model' : '3D Print'}{' '}
            {'=>'} {product.topic.join(' / ')}
          </p>
        </div>
        <div className="product-card-container">
          <Gallery {...product} />
          <div className="product-information">
            <h3>{product.title}</h3>
            <p className="category-name-product">
              {product.category.includes('Model') ? '3D Model' : '3D Print'}
            </p>
            <div className="info">
              <p>Sold: {product.sold ? product.sold : '0'}</p>
              <p>
                4.5 <AiOutlineStar />
              </p>
            </div>
            <div className="priceAndAmount">
              <p className="price">{product.price}$</p>
              <div className="quantity">
                <button onClick={() => handleQuantity('dec')}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantity('inc')}>+</button>
              </div>
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCartClick}>
              add to cart
            </button>
          </div>
        </div>
        <section className="description-title-separator">
          <div className="description-title">
            <h3>Description</h3>
          </div>
        </section>
        <div className="product-description">
          {product.desc.map((paragraph) => {
            return (
              <div className="paragraph" key={paragraph._id}>
                <h3>{paragraph.header}</h3>
                <p>{paragraph.detail}</p>
                {paragraph.img && (
                  <img src={paragraph.img} alt={paragraph.header} />
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  }
};

export default SingleProduct;
