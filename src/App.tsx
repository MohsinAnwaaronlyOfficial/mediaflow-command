import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useRoleStore } from "@/stores/roleStore";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CommandCenter from "@/pages/CommandCenter";
import ChannelManagement from "@/pages/ChannelManagement";
import VideoQueue from "@/pages/VideoQueue";
import Analytics from "@/pages/Analytics";
import SystemControl from "@/pages/SystemControl";
import Finance from "@/pages/Finance";
import AlertsCenter from "@/pages/AlertsCenter";
import TeamManagement from "@/pages/TeamManagement";
import ViewerPage from "@/pages/ViewerPage";
import ReceptionPage from "@/pages/ReceptionPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { role } = useRoleStore();

  if (role === 'viewer') return <ViewerPage />;
  if (role === 'reception') return <ReceptionPage />;

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<CommandCenter />} />
        <Route path="/channels" element={role === 'finance' ? <Navigate to="/finance" /> : <ChannelManagement />} />
        <Route path="/queue" element={role === 'finance' ? <Navigate to="/finance" /> : <VideoQueue />} />
        <Route path="/analytics" element={role === 'finance' ? <Navigate to="/finance" /> : <Analytics />} />
        <Route path="/system" element={role !== 'owner' ? <Navigate to="/" /> : <SystemControl />} />
        <Route path="/finance" element={!['owner', 'finance'].includes(role) ? <Navigate to="/" /> : <Finance />} />
        <Route path="/alerts" element={<AlertsCenter />} />
        <Route path="/team" element={role !== 'owner' ? <Navigate to="/" /> : <TeamManagement />} />
        <Route path="/viewer" element={<ViewerPage />} />
        <Route path="/reception" element={<ReceptionPage />} />
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
          <Route path="/viewer" element={<ViewerPage />} />
          <Route path="/reception" element={<ReceptionPage />} />
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
