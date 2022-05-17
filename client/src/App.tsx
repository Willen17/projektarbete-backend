import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./components/Admin/AdminPage";
import CheckoutPage from "./components/cart-checkout/CheckoutPage";
import DetailPage from "./components/DetailPage";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import OrderConfirmation from "./components/cart-checkout/OrderConfirmation";
import ProductPage from "./components/ProductPage";
import EmptyPage from "./components/shared/EmptyPage";
import StartPage from "./components/StartPage";
import ProductProvider from "./context/AdminPageContext";
import CartProvider from "./context/CartContextProvider";
import OrderProvider from "./context/OrderContextProvider";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<StartPage />} />
                <Route path="/furniture" element={<ProductPage />} />
                <Route
                  path="/textiles"
                  element={<EmptyPage page="Textiles" />}
                />
                <Route
                  path="/lighting"
                  element={<EmptyPage page="Lighting" />}
                />
                <Route
                  path="/decoration"
                  element={<EmptyPage page="Decoration" />}
                />
                <Route
                  path="/inspiration"
                  element={<EmptyPage page="Inspiration" />}
                />
                <Route path="/detail/:id" element={<DetailPage />} />
                <Route path="/confirmation" element={<OrderConfirmation />} />
                {/* added a quick fix in AdminPage component for now */}
                <Route path="/admin" element={<AdminPage />} />
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
