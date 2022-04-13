import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import SignUp from './Component/SignUp/SignUpPage';
import SignIn from './Component/SignIn/SignIn';
import NavBar from './Component/NavBar';
import ProductsList from './Component/product/ProductsList';
import UsersList from './Component/User/UsersList';
import User from './Component/User/User';
import Home from './Component/Home';

function App(props) {
  const location = useLocation();
  console.log('path is :', location.pathname);
  const isNav = ['/sign-up', '/sign-in'].includes(location.pathname);
  console.log(isNav);
  return (
    <>
      {!isNav && <NavBar />}
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
