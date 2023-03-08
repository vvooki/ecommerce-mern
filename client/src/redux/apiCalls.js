import { publicRequest, userRequest } from '../requestMethods';
// import { initialState } from './cartRedux';
import { loginFailure, loginStart, loginSuccess } from './userRedux';
import axios from 'axios';
import { getTOKEN, BASE_URL } from '../redux/fetchToken';
import { fetchUserCart } from './cartRedux';
import { toast } from 'react-hot-toast';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    dispatch(loginSuccess(res.data));
    const id = res.data._id;
    const token = res.data.accessToken;
    fetchCart(dispatch, id, token);
    toast.success('Signed in');
  } catch (error) {
    console.log('error');
    dispatch(loginFailure());
  }
};

export const register = async (user) => {};

export const fetchCart = async (dispatch, id, token) => {
  try {
    const res2 = await axios
      .create({
        baseURL: BASE_URL,
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .get(`/carts/find/${id}`);
    // console.log(res2.data);
    updateCart(dispatch, res2.data);
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = async (dispatch, cart) => {
  // console.log(cart);

  const products = await Promise.all(
    cart.products.map(async (item) => {
      try {
        console.log('item: ', item);
        console.log('item productId: ', item.productId);
        const res = await publicRequest.get(`/products/find/${item.productId}`);
        //console.log(res.data);
        const product = res.data;
        console.log('product:', { ...product });
        const quantity = item.quantity;
        console.log({ ...product, quantity: quantity });
        return { ...product, quantity: quantity };
      } catch (error) {
        console.log(error);
      }
    })
  );

  console.log('NEW PRODUCTS: ', products);

  if (products !== undefined && products !== null) {
    const cart2 = {
      products: products,
      quantity: cart.quantity,
      total: cart.total,
    };
    dispatch(fetchUserCart(cart2));
  }
};

export const addToUserCart = async (user, product, quantity) => {
  try {
    const res = await axios
      .create({
        baseURL: BASE_URL,
        headers: {
          token: `Bearer ${user.accessToken}`,
        },
      })
      .get(`/carts/find/${user._id}`);

    const userCart = res.data;
    // console.log('USERCART PRODUCTS: ', userCart.products);

    const isProductPressent = userCart.products.find(
      (item) => item.productId === product._id
    );
    if (isProductPressent) {
      console.log('product pressent');
      userCart.total += quantity * product.price;
      userCart.products.map((item) => {
        if (item.productId === product._id) {
          item.quantity += quantity;
        }
        return item;
      });
    } else {
      userCart.products.push({ productId: product._id, quantity });
      userCart.quantity += 1;
      userCart.total += quantity * product.price;
    }

    // console.log('USER CART NEW: ', userCart);

    await axios
      .create({
        baseURL: BASE_URL,
        headers: {
          token: `Bearer ${user.accessToken}`,
        },
      })
      .put(`/carts/${user._id}`, userCart);
  } catch (error) {
    console.log(error);
  }
};

export const decreaseUserCartProductAmount = async (
  product_id,
  price,
  user
) => {
  try {
    const res = await axios
      .create({
        baseURL: BASE_URL,
        headers: {
          token: `Bearer ${user.accessToken}`,
        },
      })
      .get(`/carts/find/${user._id}`);

    const userCart = res.data;

    userCart.total -= price;
    userCart.products.map((item) => {
      if (item.productId === product_id) {
        item.quantity -= 1;
      }
      return item;
    });

    try {
      await axios
        .create({
          baseURL: BASE_URL,
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        })
        .put(`/carts/${user._id}`, userCart);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const increaseUserCartProductAmount = async (
  product_id,
  price,
  user
) => {
  try {
    const res = await axios
      .create({
        baseURL: BASE_URL,
        headers: {
          token: `Bearer ${user.accessToken}`,
        },
      })
      .get(`/carts/find/${user._id}`);

    const userCart = res.data;
    userCart.total += price;
    userCart.products.map((item) => {
      if (item.productId === product_id) {
        item.quantity += 1;
      }
      return item;
    });
    try {
      await axios
        .create({
          baseURL: BASE_URL,
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        })
        .put(`/carts/${user._id}`, userCart);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeProductFromUserCart = async (product_id, price, user) => {
  try {
    const res = await axios
      .create({
        baseURL: BASE_URL,
        headers: {
          token: `Bearer ${user.accessToken}`,
        },
      })
      .get(`/carts/find/${user._id}`);

    const userCart = res.data;

    const newUserCart = userCart.products.filter(
      (item) => item.productId !== product_id
    );
    const total = userCart.total - price;
    const quantity = userCart.quantity - 1;

    console.log('after remove: ', newUserCart);
    try {
      await axios
        .create({
          baseURL: BASE_URL,
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        })
        .put(`/carts/${user._id}`, { products: newUserCart, total, quantity });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const clearUserCart = async (user) => {
  try {
    const userCart = {
      products: [],
      quantity: 0,
      total: 0,
    };

    await axios
      .create({
        baseURL: BASE_URL,
        headers: {
          token: `Bearer ${user.accessToken}`,
        },
      })
      .put(`/carts/${user._id}`, userCart);
  } catch (error) {
    console.log(error);
  }
};
