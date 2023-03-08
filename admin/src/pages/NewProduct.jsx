import { useState, useEffect } from 'react';
import './css/newProduct.css';
import Alert from '../components/Alert';
import { CSSTransitionGroup } from 'react-transition-group';
import toast, { Toaster } from 'react-hot-toast';
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
    title: 'Product ' + new Date().valueOf(),
    category: 'Model',
    size: 'small',
    color: 'black',
    price: 20,
    topic: '',
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
    toast.loading('Uploading images...', { duration: 1500 });
    let topics = formData.topic.split(',');

    let images = [];
    for (let i = 0; i < files.length; i++) {
      images.push(files[i]);
    }

    let urls = [];
    images.map(async (file, index) => {
      const fileName = new Date().getTime() + file.name;
      let obj = false;
      if (fileName.includes('.obj')) {
        obj = true;
      }
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
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
            if (obj) {
              urls.push('3dFiles/' + downloadURL);
            } else urls.push(downloadURL);
            if (index === files.length - 1) {
              // makeRequest(urls, topics, formData, token);
              setImgs(urls);
              setTopic(topics);
              setNext(true);
            }
          });
        }
      );
    });

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
    toast.success('product has been succesfully added to your shop', {
      duration: 2000,
    });
  };

  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, msg, type });
  };

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

  return (
    <section className="new-product-section">
      <Toaster />
      <h3>Add new product</h3>
      {alert.show && <Alert {...alert} showAlert={showAlert} />}
      {!next ? (
        <form onSubmit={handleAddProduct}>
          <label htmlFor="title">Name</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            placeholder="Product name"
          />

          <label htmlFor="category">Category</label>
          <select name="category" id="category" onChange={handleChange}>
            <option value="Print">Print</option>
            <option value="Model">Model</option>
          </select>

          <label htmlFor="size">Size</label>
          <select name="size" id="size" onChange={handleChange}>
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
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            onChange={handleChange}
            placeholder="$20"
          />
          <label htmlFor="topic">Topics</label>
          <input
            type="text"
            name="topic"
            id="topic"
            onChange={handleChange}
            placeholder="Figurine,DD"
            onKeyDown={keyDown}
          />
          <label htmlFor="image">Images</label>
          <input
            type="file"
            name="image"
            id="image"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
          <label htmlFor="3dfiles">3D FILES</label>
          <input
            type="file"
            name="3dfiles"
            id="3dfiles"
            multiple
            onChange={(e) => setFile2(e.target.files[0])}
          />
          <button type="submit">Add product</button>
        </form>
      ) : (
        <form onSubmit={handleAddDesc}>
          <h4>Add description to the {formData.title}</h4>
          <label htmlFor="descSize">Number of description paragraphs</label>
          <select
            name="descSize"
            id="descSize"
            onChange={(e) => setDescSize(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          {[...Array(Number(descSize))].map((x, i) => {
            return (
              <div className="desc" key={i}>
                <input
                  type="text"
                  name={'header' + i}
                  onChange={handleChange2}
                  placeholder="header"
                />
                <textarea
                  name={'paragraph' + i}
                  onChange={handleChange2}
                  cols="30"
                  rows="10"
                  placeholder="paragraph description"
                />
                <label htmlFor="desc-imgs">Pick image (if needed):</label>
                <div className="desc-imgs" id="desc-imgs">
                  {imgs.map((url, index) => {
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name={'descImg' + i}
                          value={url}
                          onChange={handleChange2}
                        />
                        <img
                          src={
                            url.includes('.obj')
                              ? 'https://firebasestorage.googleapis.com/v0/b/e-commerce-v1-e7fbc.appspot.com/o/3d-view.png?alt=media&token=688d0e16-c2f8-49cd-bb4f-f8b1abba77a0'
                              : url
                          }
                          alt={'descImg' + i}
                        />
                      </label>
                    );
                  })}
                  <label>
                    <input
                      type="radio"
                      name={'descImg' + i}
                      value={'no'}
                      onChange={handleChange2}
                    />
                    <img
                      src={
                        'https://rawcdn.githack.com/hanbitgaramsource/assets/68dca49ca4b4fbf14b55dd43ead968b055d5c08e/no-image.jpg'
                      }
                      alt={'descImg' + i}
                    />
                  </label>
                </div>
              </div>
            );
          })}
          <button type="submit">Add new product</button>
        </form>
      )}
    </section>
  );
};

export default NewProduct;
