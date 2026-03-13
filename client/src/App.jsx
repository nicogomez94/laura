import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavBar, { HeroNavBar } from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import BranchesPage from "./pages/BranchesPage";
import AppraisalsPage from "./pages/AppraisalsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Home uses HeroNavBar so the hero image wraps nav + content */}
      <Route element={<HeroNavBar />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      {/* All other routes use the plain NavBar */}
      <Route element={<NavBar />}>
      <Route path="/propiedades/ficha/:slug" element={<PropertyDetailPage />} />
      <Route path="/:section/:status" element={<ListingsPage />} />
      <Route path="/sucursales" element={<BranchesPage />} />
      <Route path="/tasaciones" element={<AppraisalsPage />} />
      <Route path="/nosotros" element={<AboutPage />} />
      <Route path="/contacto" element={<ContactPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/properties" element={<AdminDashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
