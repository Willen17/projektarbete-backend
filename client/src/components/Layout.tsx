import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import ErrorBoundary from "./shared/ErrorBoundary";
import { makeRequest } from "../Helper";

function Layout() {
  window.scrollTo(0, 0);
  const navigate = useNavigate();

  
  return (
    <div>
      <button onClick={() => console.log(makeRequest('/api/product', "GET"))} >Api</button>
      <Header />
      {/* <ErrorBoundary onGoBack={() => navigate("/")}> */}
        <Outlet />
      {/* </ErrorBoundary> */}
      <Footer />
    </div>
  );
}

export default Layout;
