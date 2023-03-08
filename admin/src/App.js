import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SharedLayout from './pages/SharedLayout';
import Home from './pages/Home';
import UserList from './pages/UserList';
import Login from './pages/Login';
import Order from './pages/Order';
import ProductList from './pages/ProductList';
import EditProduct from './pages/EditProduct';
import NewProduct from './pages/NewProduct';
import NewArticle from './pages/NewArticle';
import { useSelector } from 'react-redux';
import EditUser from './pages/EditUser';
function App() {
  const user = useSelector((state) => state.user);
  let admin = false;
  if (user.currentUser) {
    if (user.currentUser.isAdmin) {
      admin = true;
    }
  }
  console.log(admin);
  return (
    <BrowserRouter>
      <Routes>
        {admin ? (
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path="users" element={<UserList />} />
            <Route path="products" element={<ProductList />} />
            <Route path="orders" element={<Order />} />
            <Route path="products/:productsId" element={<EditProduct />} />
            <Route path="users/:userId" element={<EditUser />} />
            <Route path="products/add" element={<NewProduct />} />
            <Route path="articles/add" element={<NewArticle />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path=":location" element={<Login />} />
            <Route path=":loc/:loc2" element={<Login />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
