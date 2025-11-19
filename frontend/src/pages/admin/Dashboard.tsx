import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BarChart3, FileText, Briefcase, Code2, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@apollo/client";
import { GET_PORTFOLIO } from "@/graphql/queries";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data, loading } = useQuery(GET_PORTFOLIO);

  const stats = [
    { label: "Projets", value: loading ? "..." : (data?.getPortfolio?.projets?.length || 0).toString(), icon: <FileText size={24} />, color: "text-primary" },
    { label: "Compétences", value: loading ? "..." : (data?.getPortfolio?.competences?.length || 0).toString(), icon: <Code2 size={24} />, color: "text-accent" },
    { label: "Expériences", value: loading ? "..." : (data?.getPortfolio?.experiences?.length || 0).toString(), icon: <Briefcase size={24} />, color: "text-primary" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <nav className="border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-primary bg-clip-text text-primary">
            Dashboard Admin
          </h1>
          <Button variant="outline" onClick={handleLogout} size="sm">
            <LogOut size={16} className="mr-2 text-primary" />
            Déconnexion
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Bienvenue</h2>
          <p className="text-muted-foreground">
            Gérez votre portfolio depuis cette interface
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="hover:shadow-glow transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`${stat.color}`}>{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-glow transition-shadow">
            <CardHeader>
              <CardTitle>Gestion des Projets</CardTitle>
              <CardDescription>
                Ajoutez, modifiez ou supprimez vos projets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-primary"
                onClick={() => navigate("/admin/projects")}
              >
                Gérer les projets
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-glow transition-shadow">
            <CardHeader>
              <CardTitle>Gestion des Compétences</CardTitle>
              <CardDescription>
                Mettez à jour vos compétences techniques
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-primary"
                onClick={() => navigate("/admin/skills")}
              >
                Gérer les compétences
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-glow transition-shadow">
            <CardHeader>
              <CardTitle>Gestion des Expériences</CardTitle>
              <CardDescription>
                Modifiez votre parcours professionnel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-primary"
                onClick={() => navigate("/admin/experiences")}
              >
                Gérer les expériences
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-glow transition-shadow">
            <CardHeader>
              <CardTitle>Profil & Informations</CardTitle>
              <CardDescription>
                Mettez à jour vos informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-primary"
                onClick={() => navigate("/admin/profile")}
              >
                Modifier le profil
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
