import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { showOrders, showProducts } from '../requestMethods';
const Orders = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState('');
  const [imgLoad, setImgLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getOrders = async () => {
    try {
      const o = await showOrders(user.accessToken, user._id);
      setOrders(o);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const p = await showProducts();
      setProducts(p);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
    getProducts();
    setIsLoading(false);
  }, []);

  console.log(orders, products, show);

  const handleClick = (id) => {
    console.log('id: ', id);
    // if (show.find((item) => item === id)) {
    //   const newShow = show.filter((item) => item !== id);
    //   setShow(newShow);
    // } else {
    if (show === id) {
      setShow('');
    } else {
      setShow(id);
    }
  };

  return (
    <section className="orders-section">
      <div className="section-title-container max-width separator-padding">
        <div className="section-title">
          <h3>Your orders </h3>
        </div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="orders-container">
          {orders.map((order, index) => {
            return (
              <article className="ordered-product" key={order._id}>
                <div className="main-div">
                  <div className="order-info">
                    <h3>Status: {order.status}</h3>
                    <p>{order.createdAt}</p>
                    <p className="order-id">nr. {order._id}</p>
                    <p>
                      <b>${order.amount}</b>
                    </p>
                  </div>
                  <div className="product-info">
                    <div className="informations">
                      {order.products.slice(0, 3).map((product) => {
                        const s = products.find(
                          (p) => p._id === product.productId
                        );
                        return <img src={s && s.img ? s.img : ''} alt="" />;
                      })}
                      <h3>{order.products.length > 3 && '...'}</h3>
                      <h3>{order.products.length} items</h3>
                    </div>
                    <button onClick={() => handleClick(order._id)}>
                      show files & products
                    </button>
                  </div>
                </div>

                {show.includes(order._id) && (
                  <div className="extra-info">
                    {order.products.map((product) => {
                      const p = products.find(
                        (p) => p._id === product.productId
                      );
                      return (
                        <div key={product._id}>
                          <img src={p.img} onLoad={() => setImgLoad(true)} />

                          <p>
                            {' '}
                            {p.title} (x{product.quantity}) ➜{' '}
                            <b>{p.category}</b>
                          </p>
                          {p.category === 'Model' ? (
                            <button>
                              <a
                                href={
                                  p && p.model
                                    ? p.model
                                    : 'https://firebasestorage.googleapis.com/v0/b/e-commerce-v1-e7fbc.appspot.com/o/Sting-Sword-lowpoly.obj?alt=media&token=7f055fed-0c7d-47c3-b1d4-91c2c7bf3eb6'
                                }
                              >
                                download file
                              </a>
                            </button>
                          ) : (
                            ''
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Orders;
