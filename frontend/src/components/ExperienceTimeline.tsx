import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

interface ExperienceTimelineProps {
  experiences: Experience[];
}

const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent -translate-x-1/2 animate-pulse" />

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`relative flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow z-10 animate-pulse hover:scale-125 transition-transform">
              <Briefcase size={16} className="text-primary-foreground" />
            </div>

            {/* Content */}
            <div className={`pl-16 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"} md:w-1/2`}>
              <Card className="hover:shadow-glow hover-lift transition-all duration-300 group">
                <CardHeader>
                  <div className="flex flex-col gap-2">
                    <Badge className="w-fit bg-gradient-accent animate-glow" variant="secondary">
                      {exp.period}
                    </Badge>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{exp.title}</CardTitle>
                    <CardDescription className="font-semibold text-primary">
                      {exp.company}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs hover:scale-110 hover:shadow-glow transition-all duration-200">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
