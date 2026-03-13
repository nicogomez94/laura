import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import StaticPage from "./pages/StaticPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:section/:status" element={<ListingsPage />} />
      <Route
        path="/sucursales"
        element={
          <StaticPage
            title="Sucursales"
            text="Sucursal principal: Capital Federal. Atencion personalizada para compra, venta y alquiler."
          />
        }
      />
      <Route
        path="/tasaciones"
        element={
          <StaticPage
            title="Tasaciones"
            text="Solicita una tasacion profesional con analisis comparativo de mercado."
          />
        }
      />
      <Route
        path="/nosotros"
        element={
          <StaticPage
            title="Nosotros"
            text="Equipo especializado en operaciones inmobiliarias con enfoque comercial y legal."
          />
        }
      />
      <Route
        path="/contacto"
        element={
          <StaticPage
            title="Contacto"
            text="Escribinos para coordinar una visita o consulta: +54 11 4582 9912."
          />
        }
      />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/properties" element={<AdminDashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
