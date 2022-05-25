import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./components/Admin/AdminPage";
import SignUp from "./components/SignUp";
import CheckoutPage from "./components/cart-checkout/CheckoutPage";
import DetailPage from "./components/ProductPage";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import OrderConfirmation from "./components/cart-checkout/OrderConfirmation";
import ProductPage from "./components/ProductPage";
import EmptyPage from "./components/shared/EmptyPage";
import StartPage from "./components/StartPage";
import ProductProvider from "./context/AdminPageContext";
import CartProvider from "./context/CartContextProvider";
import OrderProvider from "./context/OrderContextProvider";
import CategoryPage from "./components/CategoryPage";
import Header from "./components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogIn from "./components/LogIn";
import AdminOrders from "./components/Admin/AdminOrders";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-left" />
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<StartPage />} />

                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/detail/:id" element={<ProductPage />} />
                <Route path="/confirmation" element={<OrderConfirmation />} />
                {/* added a quick fix in AdminPage component for now */}

                <Route path="/admin" element={<AdminPage />} />

                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />

                <Route path="/adminorders" element={<AdminOrders />} />

                <Route path="/checkoutpage" element={<CheckoutPage />} />

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
