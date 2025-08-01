import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";
import Layout from "./Layout";
import AdminDashboard from "./components/Admin/AdminDashboard";
import { useAuth } from "./context/AuthContext";
import ProductPage from "./pages/ProductPage";
import BillingPage from "./pages/BillingPage";
import OrderSuccess from "./pages/OrderSuccess";
import load from "./assets/wings.png";

const IndexPage = lazy(() => import("./pages/IndexPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const Catalogue = lazy(() => import("./pages/Catalogue"));
const Kart = lazy(() => import("./pages/Kart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Tnc = lazy(() => import("./pages/Tnc"));
const Tos = lazy(() => import("./pages/Tos"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

function App() {
  const { isAdmin } = useAuth();
  return (
    <div className=" overflow-hidden">
      <Suspense
        fallback={
          <>
            <div className="w-screen flex justify-center items-center h-screen">
              <img src={load} alt="" />
            </div>
          </>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="catalogue" element={<Catalogue />} />
            <Route path="kart" element={<Kart />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route
              path="/admindash"
              element={isAdmin ? <AdminDashboard /> : <IndexPage />}
            />
            <Route path="product" element={<ProductPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-conditions" element={<Tnc />} />
            <Route path="returns-exchange" element={<Tos />} />
            <Route path="billingPage" element={<BillingPage />} />
            <Route path="ordersuccess/:orderId" element={<OrderSuccess />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
