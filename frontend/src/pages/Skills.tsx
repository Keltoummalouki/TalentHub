import Navigation from "@/components/Navigation";
import SkillBadge from "@/components/SkillBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Database, Layers, Smartphone } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_PORTFOLIO } from "@/graphql/queries";

interface Competence {
  nom: string;
  niveau: string;
  categorie: string;
}

const Skills = () => {
  const { data, loading, error } = useQuery(GET_PORTFOLIO);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Erreur: {error.message}</div>;

  const skillCategories = data?.getPortfolio?.competences ? [
    {
      title: "Frontend",
      icon: <Smartphone className="text-primary" size={24} />,
      skills: data.getPortfolio.competences
        .filter((c: Competence) => c.categorie === 'frontend')
        .map((c: Competence) => ({ name: c.nom, level: c.niveau }))
    },
    {
      title: "Backend",
      icon: <Database className="text-accent" size={24} />,
      skills: data.getPortfolio.competences
        .filter((c: Competence) => c.categorie === 'backend')
        .map((c: Competence) => ({ name: c.nom, level: c.niveau }))
    },
    {
      title: "Bases de données",
      icon: <Database className="text-primary" size={24} />,
      skills: data.getPortfolio.competences
        .filter((c: Competence) => c.categorie === 'database')
        .map((c: Competence) => ({ name: c.nom, level: c.niveau }))
    },
    {
      title: "DevOps & Outils",
      icon: <Layers className="text-accent" size={24} />,
      skills: data.getPortfolio.competences
        .filter((c: Competence) => c.categorie === 'devops')
        .map((c: Competence) => ({ name: c.nom, level: c.niveau }))
    }
  ] : [];

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      <Navigation />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="pt-32 pb-20 px-4 relative z-10">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 space-y-6 animate-blur-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-bounce-slow">
              <Code2 size={16} className="animate-pulse" />
              <span>Stack Technique</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold">
              Mes
              <span className="text-primary"> Compétences</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Spécialisée dans le MERN Stack et les architectures modernes. Je crée des interfaces intuitives avec un souci du détail et de l'esthétique.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, index) => (
              <Card
                key={category.title}
                className="group relative overflow-hidden hover-lift hover:shadow-glow transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-4 text-2xl group-hover:text-primary transition-colors duration-300">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      {category.icon}
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skill.name}
                        className="animate-in fade-in slide-in-from-bottom-2"
                        style={{ animationDelay: `${index * 150 + skillIndex * 50}ms` }}
                      >
                        <SkillBadge {...skill} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Skills Legend */}
          <div className="mt-20 p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover-lift hover:shadow-glow transition-all duration-300 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '600ms' }}>
            <h3 className="text-xl font-bold mb-6 text-center flex items-center justify-center gap-2">
              <Layers size={24} className="text-primary" />
              Légende des niveaux
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex flex-col items-center gap-2 group">
                <SkillBadge name="Débutant" level="beginner" />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Apprentissage en cours</span>
              </div>
              <div className="flex flex-col items-center gap-2 group">
                <SkillBadge name="Intermédiaire" level="intermediate" />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Usage régulier</span>
              </div>
              <div className="flex flex-col items-center gap-2 group">
                <SkillBadge name="Avancé" level="advanced" />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Maîtrise approfondie</span>
              </div>
              <div className="flex flex-col items-center gap-2 group">
                <SkillBadge name="Expert" level="expert" />
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Expertise complète</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
