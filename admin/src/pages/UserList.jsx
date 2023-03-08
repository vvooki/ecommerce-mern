import './css/userList.css';
import { useState, useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { usersData } from '../data';
import { userRequest } from '../requestMethods';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// const url = 'localhost:5000/api/users';

const UserList = () => {
  const token = useSelector((state) => state.user.currentUser.accessToken);
  const [users, setUsers] = useState([]);
  console.log(`Bearer ${token}`);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios
        .create({
          headers: {
            token: `Bearer ${token}`,
          },
        })
        .get('http://localhost:5000/api/users');
      // const res = await userRequest.get('/users');
      setUsers(res.data);
    };
    getUsers();
    console.log(users);
  }, []);

  const handleDelete = async (id) => {
    setUsers(users.filter((item) => item._id !== id));
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'username', headerName: 'username', width: 100 },
    { field: 'email', headerName: 'email address', width: 150 },
    { field: 'createdAt', headerName: 'joined at', width: 200 },

    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/users/' + params.row._id}>
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
    <section className="user-list-section">
      <h3 className="title">All users</h3>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          disableSelectionOnClick
          pageSize={5}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </section>
  );
};

export default UserList;
