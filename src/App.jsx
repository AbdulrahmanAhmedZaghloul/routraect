import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Erorr from "./components/Erorr/Erorr";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartContextProvder from "./Context/CartContext";
import  { Toaster } from 'react-hot-toast';
import CategorieDetails from "./components/CategorieDetails/CategorieDetails";
import OrderUsers from "./components/OrderUsers/OrderUsers";
import CreditCard from "./components/CreditCard/CreditCard";

let newQuery = new QueryClient()

// Error
let routering = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute> <Home /></ProtectedRoute> },
      { path: "home", element: <ProtectedRoute> <Home /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute> <Cart /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute> <Products /> </ProtectedRoute> },
      { path: "productdetails/:id/:category", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
      { path: "CategorieDetails/:id/:category", element: <ProtectedRoute> <CategorieDetails /> </ProtectedRoute> },
      { path: "orderUsers", element: <ProtectedRoute> <OrderUsers/> </ProtectedRoute> },
      { path: "creditCard", element: <ProtectedRoute> <CreditCard/> </ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <Erorr/> },
    ],
  },
]);

function App() {
  return (
    <CartContextProvder>
      <QueryClientProvider client={newQuery}>
        <HelmetProvider>
          <UserContextProvider>
            <ReactQueryDevtools />
            <RouterProvider router={routering}></RouterProvider>
            <Toaster />
          </UserContextProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </CartContextProvder>
  );
}

export default App;
