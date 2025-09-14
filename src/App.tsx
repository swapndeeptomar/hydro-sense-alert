import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import CitizenSignIn from "./pages/citizen/CitizenSignIn";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import ReportSymptoms from "./pages/citizen/ReportSymptoms";
import TreatmentDoctors from "./pages/citizen/TreatmentDoctors";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminAlerts from "./pages/admin/AdminAlerts";
import AdminVillages from "./pages/admin/AdminVillages";
import AdminReports from "./pages/admin/AdminReports";
import AdminDevices from "./pages/admin/AdminDevices";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Citizen Portal Routes */}
          <Route path="/citizen" element={<CitizenSignIn />} />
          <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
          <Route path="/citizen/report" element={<ReportSymptoms />} />
          <Route path="/citizen/treatment" element={<TreatmentDoctors />} />
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminOverview />} />
            <Route path="alerts" element={<AdminAlerts />} />
            <Route path="villages" element={<AdminVillages />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="devices" element={<AdminDevices />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;