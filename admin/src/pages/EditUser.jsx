import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { publicRequest, updateUserRequest } from '../requestMethods';
import './css/editProduct.css';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../firebase';

const EditUser = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.currentUser.accessToken);

  const [files, setFiles] = useState([]);
  const [triggerRender, setTriggerRender] = useState(0);
  const [filesArray, setFilesArray] = useState([]);
  const defaultFormData = {};

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios
          .create({
            headers: {
              token: `Bearer ${token}`,
            },
          })
          .get('http://localhost:5000/api/users/find/' + id);
        setUser(res.data);
        setFormData(res.data);
        setIsLoading(false);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading('Updating product information');
    updateUserRequest(formData, token, id);
    await timeout(1000);
    window.location.replace('/users/' + id);
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  console.log('newData:', formData);
  return isLoading ? (
    <h2>loading...</h2>
  ) : (
    <section className="edit-product-section">
      <Toaster />
      <button className="go-back-btn">
        <Link to="/users">
          <ArrowBackIcon />
        </Link>
      </button>
      <h3 className="title">Edit Product</h3>
      <div className="edit-product-container">
        <div className="current-data">
          <h3>Current data</h3>

          <div>
            <h4>id</h4>
            <span>{user._id}</span>
          </div>
          <div>
            <h4>Login</h4>
            <span>{user.username}</span>
          </div>
          <div>
            <h4>Email</h4>
            <span>{user.email}</span>
          </div>
        </div>
        <div className="new-data">
          <h3>New data</h3>
          <form>
            <label htmlFor="username">Login:</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              value={formData.username}
              placeholder="Login"
            />

            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Email"
            />

            <label htmlFor="isAdmin">Admin privalages:</label>
            <select
              name="isAdmin"
              id="isAdmin"
              onChange={handleChange}
              value={formData.isAdmin}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>

            <button type="submit" onClick={handleSubmit}>
              Update user
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditUser;
