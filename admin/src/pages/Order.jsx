import React from 'react';
import { useState, useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import './css/order.css';
import { productsData } from '../data';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  sendStatusMail,
  updateOrderRequest,
  updateProductsSoldRequest,
} from '../requestMethods';
import axios from 'axios';
import jsPDF from 'jspdf';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [index, setIndex] = useState(0);
  const token = useSelector((state) => state.user.currentUser.accessToken);

  const updateStatus = async (data, id, productsRow) => {
    await updateOrderRequest(data, id, token);
    await sendStatusMail(data, 'Your order has changed its status', id, token);
    if (data === 'finished') {
      productsRow.map(async (product) => {
        const p = products.find((pr) => (pr._id = product.productId));
        const sold = p.sold ? p.sold + product.quantity : product.quantity;
        console.log('zmienna: ', sold);
        await updateProductsSoldRequest(sold, p._id, token);
      });
    }
    getOrders();
  };

  const getOrders = async () => {
    const res = await axios
      .create({
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .get('http://localhost:5000/api/orders');
    setOrders(res.data);
    setLoading(false);
  };
  const getProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  useEffect(() => {
    getOrders();
    getProducts();
  }, []);

  const fetchProduct = (id) => {
    return products.find((item) => item._id === id);
  };

  const replacePolishSigns = (item) => {
    return item
      .replace(/ą/g, 'a')
      .replace(/Ą/g, 'A')
      .replace(/ć/g, 'c')
      .replace(/Ć/g, 'C')
      .replace(/ę/g, 'e')
      .replace(/Ę/g, 'E')
      .replace(/ł/g, 'l')
      .replace(/Ł/g, 'L')
      .replace(/ń/g, 'n')
      .replace(/Ń/g, 'N')
      .replace(/ó/g, 'o')
      .replace(/Ó/g, 'O')
      .replace(/ś/g, 's')
      .replace(/Ś/g, 'S')
      .replace(/ż/g, 'z')
      .replace(/Ż/g, 'Z')
      .replace(/ź/g, 'z')
      .replace(/Ź/g, 'Z');
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 150 },
    { field: 'createdAt', headerName: 'date', width: 150 },
    {
      field: 'paymentStatus',
      headerName: 'Payment Status',
      width: 120,
      renderCell: (params) => {
        if (params.row.paymentStatus === 'succeeded') {
          return <p className="status green">{params.row.paymentStatus}</p>;
        } else if (params.row.paymentStatus === 'pending') {
          return <p className="status yellow">{params.row.paymentStatus}</p>;
        } else {
          return <p className="status red">{params.row.paymentStatus}</p>;
        }
      },
    },
    {
      field: 'products',
      headerName: 'products',
      width: 250,
      renderCell: (params) => {
        return (
          <section className="order-product-section">
            {
              params.row.products.map((prod) => {
                const p = fetchProduct(prod.productId);
                try {
                  return (
                    <div className="order-product" key={prod.productId}>
                      <p>
                        <b>{p.title} </b>({p.category})
                      </p>
                      <p>x{prod.quantity}</p>
                    </div>
                  );
                } catch (error) {}
              })

              //   )
            }
          </section>
        );
      },
    },
    { field: 'amount', headerName: 'price', width: 80 },
    {
      field: 'address',
      headerName: 'address',
      width: 300,
      renderCell: (params) => {
        return (
          <div className="order-address">
            <p> {params.row.address.city}</p>
            <p> {params.row.address.country}</p>
            <p> {params.row.address.line1}</p>
            <p> {params.row.address.postal_code}</p>
          </div>
        );
      },
    },
    {
      field: 'clientName',
      headerName: 'Client',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'email',
      width: 150,
    },
    {
      field: 'status',
      headerName: 'status',
      width: 120,
      renderCell: (params) => {
        let status = params.row.status ? params.row.status : 'in preparation';
        if (status === 'in preparation') {
          return <p className="status gray">{status}</p>;
        } else if (status === 'shipped') {
          return <p className="status yellow">{status}</p>;
        } else if (status === 'pending') {
          return <p className="status red">{status}</p>;
        } else {
          return <p className="status green">{status}</p>;
        }
      },
    },
    {
      field: 'action',
      headerName: 'Action - update status',
      width: 250,
      renderCell: (params) => {
        let status = params.row.status ? params.row.status : 'in preparation';
        if (status === 'pending') {
          status = 'in preparation';
        } else if (status === 'in preparation') {
          status = 'packing';
        } else if (status === 'packing') {
          status = 'shipped';
        } else if (status === 'shipped') {
          status = 'delivered';
        } else if (status === 'delivered') {
          status = 'finished';
        }
        // if (params.row.status === 'delivered') {
        //   params.row.products.map(async (product) => {
        //     const p = products.find((pr) => (pr._id = product.productId));
        //     const sold = p.sold ? p.sold + product.quantity : product.quantity;
        //     updateProductsSoldRequest(sold, product._id, token);
        //   });
        // }
        return (
          <>
            {params.row.status === 'finished' ? (
              <p className="order-completed">order completed ✔️</p>
            ) : (
              <button
                className="status-btn"
                onClick={() =>
                  updateStatus(status, params.row._id, params.row.products)
                }
              >
                Update status to ➜ <b className="status-bold"> {status}</b>
              </button>
            )}
          </>
        );
      },
    },
    {
      field: 'pdf',
      headerName: 'generate pdf',
      width: 120,
      renderCell: (params) => {
        const address = replacePolishSigns(
          params.row.address.city +
            ' ' +
            params.row.address.country +
            ' ' +
            params.row.address.line1 +
            ' ' +
            params.row.address.postal_code
        );

        let orderedProducts = '';

        const generatePDF = () => {
          params.row.products.map((prod) => {
            const p = fetchProduct(prod.productId);
            orderedProducts +=
              p.title + ' (' + p.category + ') ' + 'x' + prod.quantity + ' | ';
          });
          console.log(params.row.status);
          if (
            params.row.status !== 'in preparation' &&
            params.row.status !== undefined
          ) {
            var doc = new jsPDF('landscape', 'px', 'a4', 'fase');
            doc.setFont('Helvetica', 'bold');

            doc.text(20, 20, 'Id: ');
            doc.text(20, 40, 'Client: ');
            doc.text(20, 60, 'Address: ');
            doc.text(20, 80, 'Products: ');
            doc.setFont('Helvetica', 'Normal');
            doc.text(80, 20, params.row._id);
            doc.text(80, 40, replacePolishSigns(params.row.clientName));
            doc.text(80, 60, address);
            doc.text(80, 80, orderedProducts);
            doc.save(params.row._id);
          }
        };
        return (
          <button
            className={`${
              params.row.status === 'packing' ? 'pdf-btn-on' : 'pdf-btn-off'
            }`}
            onClick={() => generatePDF()}
          >
            Download PDF
          </button>
        );
      },
    },
  ];

  return (
    <section className="user-list-section">
      <h3 className="title">Orders</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div
          /*style={{ height: '600px', width: '100%' }}*/ className="data-grid"
        >
          <DataGrid
            rows={orders}
            columns={columns}
            disableSelectionOnClick
            pageSize={12}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[5]}
            getRowHeight={() => 'auto'}
            checkboxSelection
          />
        </div>
      )}
    </section>
  );
};

export default Order;
