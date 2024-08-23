// import Login from "./Login";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import { ToastContainer } from "react-toastify";
import Products from "./components/Products/Products";
import { useSelector } from "react-redux";
import Error404 from "./components/Error404/Error404";
import Contact from "./components/Contact/Contact";
import Cart from "./components/Cart/Cart";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Register from "./components/Register/Register";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct";
import DeleteProduct from "./components/DeleteProduct/DeleteProduct";
import AddProduct from "./components/AddProduct/AddProduct";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ResetPasswordConfirm from "./components/ResetPasswordConfirm/ResetPasswordConfirm";


function App() {

  const isLogged = useSelector((state) => state.auth.isLogged);
  const type = useSelector((state) => state.auth.type);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={
          <>
            <Header />
            <Home />
            <Footer />
          </>
        } />

        <Route path="/about" element={
          <>
            <Header />
            <About />
            <Footer />
          </>
        } />

        <Route path="/login" element={
          !isLogged ?
            <>
              <Login />
            </>
            :
            <Error404 />
        } />

        <Route path="/products" element={
          isLogged ?
            <>
              <Header />
              <Products />
              <Footer />
            </>
            :
            <Error404 />
        } />

        <Route path="/contact" element={
          isLogged && type === "client" ?
            <>
              <Header />
              <Contact />
              <Footer />
            </>
            :
            <Error404 />
        } />

        <Route path="/cart" element={
          isLogged && type === "client" ?
            <>
              <Header />
              <Cart />
              <Footer />
            </>
            :
            <Error404 />
        } />

        <Route path="/products/:pro_id" element={
          isLogged && type === "client" ?
            <>
              <Header />
              <SingleProduct />
              <Footer />
            </>
            :
            <Error404 />
        } />

        <Route path="/register" element={
          !isLogged ?
            <>
              <Register />
            </>
            :
            <Error404 />
        } />

        <Route path="/update_product/:product_id" element={
          (isLogged && type === "farmer") || (isLogged && type === "admin") ?
            <>
              <Header />
              <UpdateProduct />
              <Footer />
            </>
            :
            <Error404 />
        } />

        <Route path="/delete_product/:product_id" element={
          (isLogged && type === "farmer") || (isLogged && type === "admin") ?
            <DeleteProduct />
            :
            <Error404 />
        } />

        <Route path="/add_product" element={
          (isLogged && type === "farmer") || (isLogged && type === "admin") ?
          <>
            <Header />
            <AddProduct />
            <Footer />
          </>
          :
          <Error404 />
        } />

        <Route path="/reset_password" element={
          <ResetPassword />
        } />

        <Route path="/reset_password/confirm/:uidb64/:token" element={
          <ResetPasswordConfirm />
        } />

        <Route path="*" element={
          <Error404 />
        } />

      </Routes>
      <ToastContainer position='top-center' />
    </div>
  );
}

export default App;
