import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderHistory from './pages/OrderHistory';
import OrderDetails from './pages/OrderDetails';
import Navbar from './components/Navbar';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import AdminUserDetails from "./pages/AdminUserDetails";
import './App.css';

function App() {

  useEffect(() => {
      const savedTheme = localStorage.getItem("darkMode");
      const darkMode = savedTheme === "true";

      document.body.classList.toggle("dark-theme", darkMode);
  }, []);

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div className="App">

      {!hideNavbar && <Navbar />}

      <Routes>

        <Route path='/' element={<Products />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
            path="/admin/users/:id"
            element={
                <ProtectedRoute>
                    <AdminUserDetails />
                </ProtectedRoute>
            }
        />

        <Route
          path='/products/add'
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path='/wishlist'
          element={<Wishlist />}
        />

        <Route
          path='/cart'
          element={<Cart />}
        />

        <Route
          path='/checkout'
          element={<Checkout />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/order-confirmation"
          element={<OrderConfirmation />}
        />

        <Route
          path='/order-history'
          element={<OrderHistory />}
        />

        <Route
          path='/products/:id'
          element={<ProductDetails />}
        />

        <Route
          path='/products/:id/edit'
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={<OrderDetails />}
        />

      </Routes>

    </div>
  );
}

export default App;