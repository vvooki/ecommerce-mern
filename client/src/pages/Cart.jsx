import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../requestMethods';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  increaseUserCartProductAmount,
  decreaseUserCartProductAmount,
  clearUserCart,
  removeProductFromUserCart,
} from '../redux/apiCalls';
import {
  increaseProductAmount,
  decreaseProductAmount,
  getTotals,
  clearCart,
  removeItem,
} from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
const KEY = process.env.REACT_APP_STRIPE;
const Cart = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const [shipping, setShipping] = useState(false);
  const history = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
  };

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);

  const [totalPrice, setTotalPrice] = useState(cart.total);

  useEffect(() => {
    setShipping(false);
    cart.products.map((item) => {
      if (item.category === 'Print') {
        setShipping(true);
      }
    });
    if (shipping) {
      setTotalPrice(cart.total + 10);
    } else setTotalPrice(cart.total);
  }, [shipping, cart.products, cart.total]);

  console.log(cart.products.length);
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post('/checkout/payment', {
          tokenId: stripeToken.id,
          amount: totalPrice * 100,
        });
        console.log(res.data);
        history('/success', {
          state: {
            stripeData: res.data,
            cart: cart,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);

  const handleQuantity = (product, type) => {
    if (type === 'dec' && product.quantity > 1) {
      dispatch(decreaseProductAmount(product._id));
      if (user) decreaseUserCartProductAmount(product._id, product.price, user);
    } else if (type === 'inc') {
      dispatch(increaseProductAmount(product._id));
      if (user) increaseUserCartProductAmount(product._id, product.price, user);
    }
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
    setTotalPrice(0);
    setShipping(false);
    if (user) clearUserCart(user);
  };

  const removeProduct = (product) => {
    dispatch(removeItem(product));
    const price = product.price * product.quantity;
    if (user) removeProductFromUserCart(product._id, price, user);
  };

  return (
    <section className="cart-section">
      <div className="section-title-container max-width separator-padding">
        <div className="section-title">
          <h3>Your Cart ({cart.quantity})</h3>
          <button onClick={() => clearCartHandler()}>
            <FiTrash2 /> clear cart
          </button>
        </div>
      </div>
      <div className="cart-container">
        <div className="cart-items-container">
          {cart.products.map((product, index) => {
            return (
              <article className="cart-item" key={index}>
                <div className="cart-item-img">
                  <img src={product.img} alt={product.title} />
                </div>
                <div className="cart-item-desc">
                  <h3>
                    {product.title} ({product.category})
                  </h3>
                  <div>
                    <div className="counter">
                      <FaPlus
                        onClick={() => handleQuantity(product, 'inc')}
                        className="font-hover-effect"
                      />
                      <p>{product.quantity}</p>
                      <FaMinus
                        onClick={() => handleQuantity(product, 'dec')}
                        className="font-hover-effect"
                      />
                    </div>
                    <div className="price">
                      <FiTrash2
                        onClick={() => removeProduct(product)}
                        className="font-hover-effect"
                      />
                      <p>$ {product.price * product.quantity}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="cart-summary-container">
          <h2>ORDER SUMMARY</h2>
          <h4>Subtotal: ${cart.total}</h4>
          {shipping === true && <h4>Shipping: $10</h4>}
          <h3>Total: ${totalPrice}</h3>
          <StripeCheckout
            name="3D Shop"
            image="https://cdn-icons-png.flaticon.com/512/630/630746.png"
            shippingAddress
            billingAddress
            description={`Your total is $${cart.total} ${
              shipping ? '+$10 shipping' : ''
            }`}
            amount={totalPrice * 100}
            token={onToken}
            stripeKey={KEY}
          >
            <button className="authorize-btn">CHECK OUT</button>
          </StripeCheckout>
        </div>
      </div>
    </section>
  );
};

export default Cart;
