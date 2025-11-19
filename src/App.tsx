import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/auth/AuthContext";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import FormulationsList from "./pages/formulations/FormulationsList";
import FormulationDetail from "./pages/formulations/FormulationDetail";
import BlendsList from "./pages/blends/BlendsList";
import DefaultSettingsList from "./pages/defaultSettings/DefaultSettingsList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/formulations"
              element={
                <ProtectedRoute feature="formulas.view">
                  <FormulationsList />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/formulations/:id"
              element={
                <ProtectedRoute feature="formulas.view">
                  <FormulationDetail />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/blends"
              element={
                <ProtectedRoute feature="blend-tickets.view-own">
                  <BlendsList />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/default-settings"
              element={
                <ProtectedRoute feature="default-settings.view">
                  <DefaultSettingsList />
                </ProtectedRoute>
              }
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
