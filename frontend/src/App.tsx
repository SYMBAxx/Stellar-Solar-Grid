import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserDashboard from "./pages/UserDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import PaymentPage from "./pages/PaymentPage";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/provider" element={<ProviderDashboard />} />
        <Route path="/pay" element={<PaymentPage />} />
      </Routes>
    </>
  );
}
