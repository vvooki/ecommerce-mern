import React from 'react';
import { useState, useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import './css/productList.css';
import { productsData } from '../data';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const token = useSelector((state) => state.user.currentUser.accessToken);
  console.log(`Bearer ${token}`);

  const handleDelete = (id) => {
    setProducts(products.filter((item) => item._id !== id));
  };

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios
        .create({
          headers: {
            token: `Bearer ${token}`,
          },
        })
        .get('http://localhost:5000/api/products');
      // const res = await userRequest.get('/users');
      setProducts(res.data);
    };
    getProducts();
    console.log(products);
  }, []);
  // const { categories } = products;

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    {
      field: 'img',
      headerName: 'img',
      width: 70,
      renderCell: (params) => {
        return (
          <>
            <div className="img-table">
              <img src={params.row.img} alt="" />
            </div>
          </>
        );
      },
    },
    { field: 'title', headerName: 'Name', width: 200 },
    {
      field: 'price',
      headerName: 'Price',
      width: 80,
    },
    {
      field: 'size',
      headerName: 'size',
      width: 70,
    },
    {
      field: 'category',
      headerName: 'category',
      width: 90,
    },
    {
      field: 'topic',
      headerName: 'topic',
      width: 150,
    },

    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/products/' + params.row._id}>
              <button className="user-list-edit">Edit</button>
            </Link>
            <button
              className="user-list-delete"
              onClick={() => handleDelete(params.row._id)}
            >
              <DeleteOutlineIcon className="delete-btn" />
            </button>
          </>
        );
      },
    },
  ];

  return (
    <section className="product-list-section">
      <h3 className="title">All products</h3>
      <div /*style={{ height: '600px', width: '100%' }}*/ className="data-grid">
        <DataGrid
          rows={products}
          columns={columns}
          disableSelectionOnClick
          pageSize={10}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </section>
  );
};

export default ProductList;
