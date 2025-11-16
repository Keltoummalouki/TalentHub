import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import { useQuery } from "@apollo/client";
import { GET_PORTFOLIO } from "@/graphql/queries";

interface Projet {
  titre: string;
  description: string;
  images?: string[];
  technologies: string[];
  lienDemo?: string;
  lienGithub?: string;
}

const Projects = () => {
  const { data, loading, error } = useQuery(GET_PORTFOLIO);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Erreur: {error.message}</div>;

  const projects = data?.getPortfolio?.projets?.map((projet: Projet) => ({
    title: projet.titre,
    description: projet.description,
    image: projet.images?.[0] || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
    technologies: projet.technologies,
    liveUrl: projet.lienDemo || '#',
    githubUrl: projet.lienGithub || '#'
  })) || [];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Mes
              <span className="text-primary"> Projets</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez une sélection de mes réalisations récentes, 
              allant d'applications web complexes à des solutions innovantes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
