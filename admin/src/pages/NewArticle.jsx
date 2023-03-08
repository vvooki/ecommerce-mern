import { useState, useEffect } from 'react';
import './css/newProduct.css';
import Alert from '../components/Alert';
import { CSSTransitionGroup } from 'react-transition-group';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../firebase';
import { useSelector } from 'react-redux';
import { addProductRequest } from '../requestMethods';
const NewProduct = () => {
  const token = useSelector((state) => state.user.currentUser.accessToken);
  const defaultFormData = {
    title: 'Article ' + new Date().valueOf(),
    header: 'Header 1',
    desc: 'description of Article',
  };
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const [formData, setFormData] = useState(defaultFormData);
  const [files, setFiles] = useState([]);
  const [file2, setFile2] = useState(null);
  const [topic, setTopic] = useState([]);
  const [modelFile, setModelFile] = useState('');
  const [imgs, setImgs] = useState([]);
  const [descSize, setDescSize] = useState(1);
  const [descFormData, setDescFormData] = useState({});
  const [descData, setDescData] = useState([]);
  const [next, setNext] = useState(false);

  const setDefaultValues = () => {
    setFormData(defaultFormData);
    setFiles([]);
    setFile2(null);
    setTopic([]);
    setImgs([]);
    setDescSize(1);
    setDescFormData({});
    setDescData([]);
    setNext(false);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };
  console.log(formData, files, file2);
  console.log(descSize, descFormData);
  console.log('descData: ', descData);
  console.log('imgs: ', imgs);

  const handleAddProduct = (e) => {
    e.preventDefault();

    const modelFileName = new Date().getTime() + file2.name;

    const storage = getStorage(app);
    const storageRef = ref(storage, modelFileName);
    const uploadTask = uploadBytesResumable(storageRef, file2);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
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
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setModelFile(downloadURL);
        });
      }
    );
  };

  const handleChange2 = (event) => {
    const { name, value, type, checked } = event.target;
    setDescFormData((prevDescData) => {
      return {
        ...prevDescData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
    console.log(descFormData);
  };

  const handleAddDesc = (e) => {
    e.preventDefault();
    for (let i = 1; i < Object.entries(descFormData).length + 1; i++) {
      // console.log('Object keys: ', i, Object.values(descFormData)[i]);
      if (i % 3 === 0) {
        if (Object.values(descFormData)[i - 1] === 'no')
          descData.push({
            header: Object.values(descFormData)[i - 3],
            detail: Object.values(descFormData)[i - 2],
          });
        else
          descData.push({
            header: Object.values(descFormData)[i - 3],
            detail: Object.values(descFormData)[i - 2],
            img: Object.values(descFormData)[i - 1],
          });
      }
    }
    addProductRequest(imgs, modelFile, topic, formData, descData, token);
    setDefaultValues();
    showAlert(
      true,
      'product has been succesfully added to your shop',
      'success'
    );
  };

  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type });
  };

  return (
    <section className="new-product-section">
      <h3>Add new Article</h3>
      {alert.show && <Alert {...alert} showAlert={showAlert} />}

      <form onSubmit={handleAddDesc}>
        <div className="desc">
          <input
            type="text"
            name={'header'}
            onChange={handleChange2}
            placeholder="header"
          />

          <textarea
            name={'paragraph'}
            onChange={handleChange2}
            cols="30"
            rows="10"
            placeholder="paragraph description"
          />
        </div>
        <button type="submit">Add new article</button>
      </form>
    </section>
  );
};

export default NewProduct;
