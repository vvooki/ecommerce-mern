import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser
//     .accessToken || '';

const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const testRequest = (tok) =>
  axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${tok}` },
  });

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

export const addProductRequest = async (
  urls,
  modelFile,
  topics,
  formData,
  descData,
  token
) => {
  const product = {
    ...formData,
    img: urls[0],
    gallery: urls,
    topic: topics,
    desc: descData,
    model: modelFile,
  };
  console.log('PRODUCT DESC ', product);
  try {
    const res = await axios
      .create({
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .post(`http://localhost:5000/api/products`, product);
  } catch (error) {
    console.log(error);
  }
};

export const updateProductRequest = async (data, topics, token, id) => {
  const product = {
    ...data,
    topic: topics,
  };
  try {
    const res = await axios
      .create({
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .put(`http://localhost:5000/api/products/${id}`, product);
  } catch (error) {
    console.log(error);
  }
};

export const updateUserRequest = async (data, token, id) => {
  const user = {
    ...data,
  };
  try {
    const res = await axios
      .create({
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .put(`http://localhost:5000/api/users/${id}`, user);
  } catch (error) {
    console.log(error);
  }
};

export const updateOrderRequest = async (data, id, token) => {
  const order = {
    status: data,
  };
  try {
    const res = await axios
      .create({
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .put(`http://localhost:5000/api/orders/${id}`, order);
  } catch (error) {
    console.log(error);
  }
};

export const updateProductsSoldRequest = async (sold1, id, token) => {
  console.log('id', id);
  const product = {
    sold: sold1,
  };
  console.log('to wysylam', product);
  try {
    const res = await axios
      .create({
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .put(`http://localhost:5000/api/products/${id}`, product);
  } catch (error) {
    console.log(error);
  }
};

export const sendStatusMail = async (status, subject, id, token) => {
  const data = {
    status,
    subject,
    id,
  };
  try {
    const res = await axios
      .create({
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .post(`http://localhost:5000/api/email/send`, data);
  } catch (error) {
    console.log(error);
  }
};
