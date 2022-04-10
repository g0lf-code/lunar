import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './Component/SignUp/SignUpPage';
import SignIn from './Component/SignIn/SignIn';
import NavBar from './Component/NavBar';
import ProductsList from './Component/product/ProductsList';
import UsersList from './Component/User/UsersList';
import User from './Component/User/User';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
