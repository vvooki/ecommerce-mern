import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { clearCart } from '../redux/cartRedux';
import { addOrderRequest, sendFilesMail } from '../requestMethods';
const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    let orderStatus = 'delivered';
    if (orderStatus !== 'delivered' || orderStatus !== '') {
      cart.products.map((product) => {
        if (product.category === 'Print') {
          orderStatus = 'in preparation';
          return;
        }
      });
    }
    if (data.status !== 'succeeded') {
      orderStatus = 'pending';
    }
    const order = {
      userId: currentUser && currentUser._id,
      products: cart.products.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      amount: cart.total,
      address: data.billing_details.address,
      clientName: data.billing_details.name,
      paymentStatus: data.status,
      status: orderStatus,
      email: 'test@mail.com', //data.billing_details.email - z jakiegos powodu nie czyta maila
    };
    console.log(order);

    data && addOrderRequest(order);
    const links = cart.products.map((p) => {
      return p.model;
    });
    data.status === 'succeeded' && sendFilesMail(links);
    dispatch(clearCart());
  }, [cart, data, currentUser, dispatch]);

  return (
    <section>
      <div className="success-container max-width">
        <h2>Payment success!</h2>
        <p className="success-paragraph">
          You will soon receive an email confirmation with your purchased
          models. If you have an account in our system, models can also be found
          in your account tab. If you have ordered a physical product, we will
          keep you updated on the status of your order.
        </p>
        <h1>Thank you for your time!</h1>
        <button>
          <Link to="/"> Go back to the shopping </Link>
        </button>
      </div>
    </section>
  );
};

export default Success;
