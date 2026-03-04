import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRoleStore } from "@/stores/roleStore";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Overview from "@/pages/Overview";
import Channels from "@/pages/Channels";
import Pipeline from "@/pages/Pipeline";
import Analytics from "@/pages/Analytics";
import Finance from "@/pages/Finance";
import Health from "@/pages/Health";
import Team from "@/pages/Team";
import Alerts from "@/pages/Alerts";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { role } = useRoleStore();

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/channels" element={role === 'finance' ? <Navigate to="/finance" /> : <Channels />} />
        <Route path="/pipeline" element={role === 'finance' ? <Navigate to="/finance" /> : <Pipeline />} />
        <Route path="/analytics" element={role === 'finance' ? <Navigate to="/finance" /> : <Analytics />} />
        <Route path="/finance" element={!['owner', 'finance'].includes(role) ? <Navigate to="/" /> : <Finance />} />
        <Route path="/health" element={role !== 'owner' ? <Navigate to="/" /> : <Health />} />
        <Route path="/team" element={role !== 'owner' ? <Navigate to="/" /> : <Team />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/settings" element={role !== 'owner' ? <Navigate to="/" /> : <Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DashboardLayout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
