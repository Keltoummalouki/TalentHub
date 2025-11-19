import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // lternative moderne aux toasts (aliasé pour éviter conflit)
import { TooltipProvider } from "@/components/ui/tooltip"; // Context pour les tooltips shadcn/ui
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ache et synchronisation des données (utilisé avec Apollo)
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Navigation côté client (SPA routing)
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apollo-client";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ManageProjects from "./pages/admin/ManageProjects";
import ManageSkills from "./pages/admin/ManageSkills";
import ManageExperiences from "./pages/admin/ManageExperiences";
import ManageProfile from "./pages/admin/ManageProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ApolloProvider client={client}>  {/* Configuration du cache par défaut */}
    <QueryClientProvider client={queryClient}> 
      <AuthProvider>
        <TooltipProvider> {/** UI context pour composants */}
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}> {/* Gestion des routes */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/projects" element={<ManageProjects />} />
          <Route path="/admin/skills" element={<ManageSkills />} />
          <Route path="/admin/experiences" element={<ManageExperiences />} />
          <Route path="/admin/profile" element={<ManageProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ApolloProvider>
);

export default App;
