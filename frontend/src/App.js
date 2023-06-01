import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Footer from './components/Footer';
import Signup from './components/Signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <>
    <BrowserRouter>
      < Navbar />
        <div className="container">
          <Routes>

            <Route element={< PrivateComponent />}>
            <Route path="/" element={< ProductList />} />
            <Route path="/about" element={<h1>Add About Component</h1>} />
            <Route path="/products" element={< ProductList />} />
            <Route path="/add" element={< AddProduct />} />
            <Route path="/update/:id" element={< UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
            <Route path="/profile" element={<h1>Profile Component</h1>} />
            </Route>

            <Route path="/login" element={< Login />} />
            <Route path="/signup" element={< Signup />} />
          </Routes>
        </div>
      < Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
