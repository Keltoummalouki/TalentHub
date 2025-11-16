import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import { useQuery } from "@apollo/client";
import { GET_PORTFOLIO } from "@/graphql/queries";
import SkillBadge from "@/components/SkillBadge";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ContactForm from "@/components/ContactForm";
import ParticlesBackground from "@/components/ParticlesBackground";
import TypewriterText from "@/components/TypewriterText";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code2, Sparkles, Database, Layers, Smartphone, Zap, Award } from "lucide-react";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

interface Competence {
  nom: string;
  niveau: string;
  categorie: string;
}

interface Experience {
  poste: string;
  entreprise: string;
  dateDebut: string;
  dateFin?: string;
  enCours: boolean;
  description: string;
  competences: string[];
}

const Index = () => {
  const { data, loading, error } = useQuery(GET_PORTFOLIO);



  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Erreur: {error.message}</div>;
  
  const projects = data?.getPortfolio?.projets?.slice(0, 3).map((projet: { titre: string; description: string; images?: string[]; technologies: string[]; lienDemo?: string; lienGithub?: string }) => ({
    title: projet.titre,
    description: projet.description,
    image: projet.images?.[0] || 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
    technologies: projet.technologies,
    liveUrl: projet.lienDemo || '#',
    githubUrl: projet.lienGithub || '#'
  })) || [];

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
      title: "DevOps & Tools",
      icon: <Layers className="text-primary" size={24} />,
      skills: data.getPortfolio.competences
        .filter((c: Competence) => c.categorie === 'devops')
        .map((c: Competence) => ({ name: c.nom, level: c.niveau }))
    }
  ] : [];

  const experiences = data?.getPortfolio?.experiences?.slice(0, 3).map((exp: Experience) => ({
    title: exp.poste,
    company: exp.entreprise,
    period: `${new Date(exp.dateDebut).getFullYear()} - ${exp.enCours ? 'Présent' : exp.dateFin ? new Date(exp.dateFin).getFullYear() : ''}`,
    description: exp.description,
    technologies: exp.competences
  })) || [];

  const profil = data?.getPortfolio?.profil;
  const titles = profil ? [
    `${profil.prenom} ${profil.nom}`,
    profil.titre,
    "Créative & Passionnée"
  ] : ["Portfolio", "Développeur Full Stack", "Créatif & Passionné"];

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      <ScrollProgress />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <ParticlesBackground />
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center space-y-8 animate-blur-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium animate-bounce-slow">
              <Sparkles size={16} className="animate-pulse" />
              <span>Bienvenue sur mon portfolio</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <TypewriterText texts={titles} className="text-primary" />
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {profil?.biographie || "Passionné par la création d'expériences web intuitives et accessibles."}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild className="bg-primary">
                <Link to="/projects">
                  Voir mes projets
                  <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/experience">
                  Mon parcours
                  <Code2 className="ml-2" size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-background/50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-primary font-semibold">
                <Code2 size={20} />
                <span>À propos</span>
              </div>
              <h2 className="text-4xl font-bold">
                {profil?.titre || "Développeur Full Stack"}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {profil?.biographie || "Développeur passionné par la création d'applications web modernes et performantes."}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-6 rounded-lg bg-card border border-border hover-lift hover-glow group transition-all duration-300">
                  <Zap className="text-primary mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <AnimatedCounter end={data?.getPortfolio?.experiences?.length || 0} suffix="+" className="text-3xl font-bold text-primary mb-1" />
                  <div className="text-sm text-muted-foreground">Expériences</div>
                </div>
                <div className="p-6 rounded-lg bg-card border border-border hover-lift hover-glow group transition-all duration-300">
                  <Award className="text-accent mb-2 group-hover:scale-110 transition-transform" size={24} />
                  <AnimatedCounter end={data?.getPortfolio?.projets?.length || 0} suffix="+" className="text-3xl font-bold text-accent mb-1" />
                  <div className="text-sm text-muted-foreground">Projets réalisés</div>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="aspect-square rounded-2xl bg-gradient-primary opacity-10 blur-3xl absolute inset-0 animate-pulse group-hover:opacity-20 transition-opacity" />
              <div className="relative aspect-square rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-center animate-float overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 animate-gradient" />
                <Code2 size={120} className="text-primary/20 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              Mes <span className="text-primary">Projets</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez une sélection de mes réalisations récentes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="hover-lift animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/projects">
                Voir tous les projets
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-background/50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              Mes <span className="text-primary">Compétences</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technologies et outils que je maîtrise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {skillCategories.map((category, index) => (
              <Card
                key={category.title}
                className="hover-lift hover:shadow-glow transition-all duration-300 border-border/50 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    {category.icon}
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <SkillBadge key={skill.name} {...skill} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/skills">
                Voir toutes les compétences
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">
              Mon <span className="text-primary">Parcours</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {data?.getPortfolio?.experiences?.length || 0} expériences professionnelles
            </p>
          </div>

          <ExperienceTimeline experiences={experiences} />

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/experience">
                Voir mon parcours complet
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-background/50">
        <div className="container mx-auto max-w-7xl">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default Index;
