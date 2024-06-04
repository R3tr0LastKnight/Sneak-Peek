import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy } from "react";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Catalogue from "./pages/Catalogue";
import Kart from "./pages/Kart";
import Wishlist from "./pages/Wishlist";

// const Layout = lazy(() => import("./Layout"));
// const IndexPage = lazy(() => import("./pages/IndexPage"));
// const LoginPage = lazy(() => import("./pages/LoginPage"));
// const Catalogue = lazy(() => import("./pages/Catalogue"));

function App() {
  return (
    <div className=" overflow-hidden">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="catalogue" element={<Catalogue />} />
          <Route path="kart" element={<Kart />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
