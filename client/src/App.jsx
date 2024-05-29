import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Catalogue from "./pages/Catalogue";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="catalogue" element={<Catalogue />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
