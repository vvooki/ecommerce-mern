import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { publicRequest, updateProductRequest } from '../requestMethods';
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

const EditProduct = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.currentUser.accessToken);

  const [files, setFiles] = useState([]);
  const [triggerRender, setTriggerRender] = useState(0);
  const [filesArray, setFilesArray] = useState([]);
  const defaultFormData = {
    title: '',
    category: '',
    size: '',
    color: '',
    price: 0,
    topic: '',
    gallery: [],
    desc: [],
  };

  const [formData, setFormData] = useState(defaultFormData);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get('/products/find/' + id);
        setProduct(res.data);

        setFormData({ ...res.data, topic: res.data.topic.join(',') });
        setIsLoading(false);
      } catch {}
    };
    getProduct();
    console.log('reload');
  }, [triggerRender, id]);

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
    let topics = formData.topic.split(',');
    let images = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        images.push(files[i]);
      }
    }

    if (images.length > 0) {
      images.map(async (file, index) => {
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Listen for state changes, errors, and completion of the upload.
        toast.loading('Updating product information');
        await uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;
              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
              default:
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              formData.gallery.push(downloadURL);
              if (index === files.length - 1) {
                updateProductRequest(formData, topics, token, id);
                window.location.replace('/products/' + id);
              }
            });
          }
        );
      });
    } else {
      toast.loading('Updating product information');
      updateProductRequest(formData, topics, token, id);
      await timeout(1000);
      window.location.replace('/products/' + id);
    }
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  //block space bar on topic input
  function keyDown(e) {
    var e = window.event || e;
    var key = e.keyCode;
    //space pressed
    if (key == 32) {
      //space
      e.preventDefault();
    }
  }

  const deleteImg = (photo) => {
    const newData = formData.gallery.filter((img) => img !== photo);
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        gallery: newData,
      };
    });
  };

  console.log('newData:', formData);
  return isLoading ? (
    <h2>loading...</h2>
  ) : (
    <section className="edit-product-section">
      <Toaster />
      <button className="go-back-btn">
        <Link to="/products">
          <ArrowBackIcon />
        </Link>
      </button>
      <h3 className="title">Edit Product</h3>
      <div className="edit-product-container">
        <div className="current-data">
          <h3>Current data</h3>

          <div>
            <h4>id</h4>
            <span>{product._id}</span>
          </div>
          <div>
            <h4>Name</h4>
            <span>{product.title}</span>
          </div>
          <div>
            <h4>Size</h4>
            <span>{product.size}</span>
          </div>
          <div>
            <h4>Color</h4>
            <span>{product.color}</span>
          </div>
          <div>
            <h4>Category</h4>
            <span>{product.category}</span>
          </div>
          <div>
            <h4>img</h4>
            <img src={product.img} alt="" />
          </div>
        </div>
        <div className="new-data">
          <h3>New data</h3>
          <form>
            <label htmlFor="title">Name</label>
            <input
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
              value={formData.title}
              placeholder="Product name"
            />

            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              onChange={handleChange}
              value={formData.category}
            >
              <option value="Print">Print</option>
              <option value="Model">Model</option>
            </select>

            <label htmlFor="size">Size</label>
            <select
              name="size"
              id="size"
              onChange={handleChange}
              value={formData.size}
            >
              <option value="small">small</option>
              <option value="medium">medium</option>
              <option value="large">large</option>
            </select>
            <label htmlFor="color">Color</label>
            <input
              type="text"
              name="color"
              id="color"
              onChange={handleChange}
              placeholder="black"
              value={formData.color}
            />
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              onChange={handleChange}
              placeholder="$20"
              value={formData.price}
            />
            <label htmlFor="topic">Topics</label>
            <input
              type="text"
              name="topic"
              id="topic"
              onChange={handleChange}
              placeholder="Figurine,Star_Wars"
              value={formData.topic.toString()}
              onKeyDown={keyDown}
            />
            <label htmlFor="image">Images (click to remove)</label>
            {formData.gallery.map((photo, index) => {
              return (
                <div key={index}>
                  <img
                    onClick={() => deleteImg(photo)}
                    src={photo}
                    alt=""
                    className="deleteImg"
                  />
                  {/* <button onClick={() => deleteImg(photo)}>delete</button> */}
                </div>
              );
            })}
            <label>New uploaded images:</label>

            <input
              type="file"
              name="image"
              id="image"
              multiple
              onChange={(e) => {
                setFiles(e.target.files);
                setFilesArray(Object.entries(files));
              }}
            />

            {/* {formData.desc.map((object, i) => {
              return (
                <div className="desc" key={i}>
                  <input
                    type="text"
                    name={formData.desc[i].header}
                    onChange={()=> setFormData({...formData, })}
                    placeholder="header"
                  />
                  <textarea
                    name={formData.desc[i].detail}
                    onChange={handleChange}
                    cols="30"
                    rows="10"
                    placeholder="paragraph description"
                  />
                  <label htmlFor="desc-imgs">Pick image (if needed):</label>
                  <div className="desc-imgs" id="desc-imgs">
                    {formData.gallery.map((url, index) => {
                      return (
                        <label key={index}>
                          <input
                            type="radio"
                            name={formData.desc[i].img}
                            value={url}
                            onChange={handleChange}
                          />
                          <img src={url} alt={'descImg' + i} />
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })} */}

            <button type="submit" onClick={handleSubmit}>
              Change product
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
