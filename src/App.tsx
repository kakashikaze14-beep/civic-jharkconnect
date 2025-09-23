import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CitizenLogin from "./pages/citizen/CitizenLogin";
import AdminLogin from "./pages/admin/AdminLogin";
import MunicipalityLogin from "./pages/municipality/MunicipalityLogin";
import IssueCategories from "./pages/citizen/IssueCategories";
import IssuesList from "./pages/citizen/IssuesList";
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
            <Route path="/" element={<Index />} />
            <Route path="/login/citizen" element={<CitizenLogin />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/login/municipality" element={<MunicipalityLogin />} />
            <Route path="/issues" element={<IssueCategories />} />
            <Route path="/issues/list" element={<IssuesList />} />
            <Route path="/issues/report" element={<ReportIssue />} />
            <Route path="/issues/:id" element={<IssueDetail />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/municipality/dashboard" element={<MunicipalityDashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;