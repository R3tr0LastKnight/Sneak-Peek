import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";
import Layout from "./Layout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import { useAuth } from "./context/AuthContext";
import ProductPage from "./pages/ProductPage";

const IndexPage = lazy(() => import("./pages/IndexPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const Catalogue = lazy(() => import("./pages/Catalogue"));
const Kart = lazy(() => import("./pages/Kart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));

// const Layout = lazy(() => import("./Layout"));
// const IndexPage = lazy(() => import("./pages/IndexPage"));
// const LoginPage = lazy(() => import("./pages/LoginPage"));
// const Catalogue = lazy(() => import("./pages/Catalogue"));

function App() {

  const {isAdmin}=useAuth();
  return (
    <div className=" overflow-hidden">
      <Suspense fallback={<>loading</>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="catalogue" element={<Catalogue />} />
            <Route path="kart" element={<Kart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="/admindash"   element={isAdmin ? <AdminDashboard /> : <IndexPage />} />
            <Route path="product" element={<ProductPage />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
