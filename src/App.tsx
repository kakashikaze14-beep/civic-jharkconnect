import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CitizenLogin from "./pages/citizen/CitizenLogin";
import AdminLogin from "./pages/admin/AdminLogin";
import MunicipalityLogin from "./pages/municipality/MunicipalityLogin";
import IssueCategories from "./pages/citizen/IssueCategories";
import IssueList from "./pages/citizen/IssueList";
import ReportIssue from "./pages/citizen/ReportIssue";
import IssueDetail from "./pages/citizen/IssueDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MunicipalityDashboard from "./pages/municipality/MunicipalityDashboard";
import About from "./pages/About";
import Help from "./pages/Help";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login/citizen" element={<CitizenLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/login/municipality" element={<MunicipalityLogin />} />
            <Route path="/citizen/categories" element={
              <ProtectedRoute redirectTo="/login/citizen">
                <IssueCategories />
              </ProtectedRoute>
            } />
            <Route path="/issues" element={
              <ProtectedRoute redirectTo="/login/citizen">
                <IssueList />
              </ProtectedRoute>
            } />
            <Route path="/issues/report" element={
              <ProtectedRoute redirectTo="/login/citizen">
                <ReportIssue />
              </ProtectedRoute>
            } />
            <Route path="/issues/:id" element={
              <ProtectedRoute redirectTo="/login/citizen">
                <IssueDetail />
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute redirectTo="/login/admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/municipality/dashboard" element={
              <ProtectedRoute redirectTo="/login/municipality">
                <MunicipalityDashboard />
              </ProtectedRoute>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
