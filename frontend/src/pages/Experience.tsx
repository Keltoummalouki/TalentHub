import Navigation from "@/components/Navigation";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { useQuery } from "@apollo/client";
import { GET_PORTFOLIO } from "@/graphql/queries";

interface Experience {
  poste: string;
  entreprise: string;
  dateDebut: string;
  dateFin?: string;
  enCours: boolean;
  description: string;
  competences: string[];
}

const Experience = () => {
  const { data, loading, error } = useQuery(GET_PORTFOLIO);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Erreur: {error.message}</div>;

  const experiences = data?.getPortfolio?.experiences?.map((exp: Experience) => ({
    title: exp.poste,
    company: exp.entreprise,
    period: `${new Date(exp.dateDebut).getFullYear()} - ${exp.enCours ? 'Présent' : exp.dateFin ? new Date(exp.dateFin).getFullYear() : ''}`,
    description: exp.description,
    technologies: exp.competences
  })) || [];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-20 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Mon
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Parcours</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Plus de 5 années d'expérience dans le développement web, 
              de junior à lead developer.
            </p>
          </div>

          <ExperienceTimeline experiences={experiences} />
        </div>
      </div>
    </div>
  );
};

export default Experience;
