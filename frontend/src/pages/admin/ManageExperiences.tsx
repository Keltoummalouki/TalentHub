import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EXPERIENCES } from "@/graphql/queries";
import { CREATE_EXPERIENCE, UPDATE_EXPERIENCE, DELETE_EXPERIENCE } from "@/graphql/mutations";

const experienceSchema = z.object({
  poste: z.string().min(1, "Le poste est requis"),
  entreprise: z.string().min(1, "L'entreprise est requise"),
  dateDebut: z.string().min(1, "La date de début est requise"),
  dateFin: z.string().optional(),
  enCours: z.boolean().default(false),
  description: z.string().min(1, "La description est requise"),
  competences: z.string().min(1, "Les compétences sont requises"),
  lieu: z.string().optional(),
});

type ExperienceFormData = z.infer<typeof experienceSchema>;

interface Experience {
  id: string;
  poste: string;
  entreprise: string;
  dateDebut: string;
  dateFin?: string;
  enCours: boolean;
  description: string;
  competences: string[];
  lieu?: string;
}

const ManageExperiences = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

  const { data, loading, refetch } = useQuery(GET_EXPERIENCES);
  const [createExperience] = useMutation(CREATE_EXPERIENCE);
  const [updateExperience] = useMutation(UPDATE_EXPERIENCE);
  const [deleteExperience] = useMutation(DELETE_EXPERIENCE);

  const experiences = data?.getExperiences || [];

  const form = useForm<ExperienceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      poste: "",
      entreprise: "",
      dateDebut: "",
      dateFin: "",
      enCours: false,
      description: "",
      competences: "",
      lieu: "",
    },
  });

  const onSubmit = async (formData: ExperienceFormData) => {
    try {
      const input = {
        poste: formData.poste,
        entreprise: formData.entreprise,
        dateDebut: formData.dateDebut,
        dateFin: formData.dateFin || null,
        enCours: formData.enCours,
        description: formData.description,
        competences: formData.competences.split(',').map(c => c.trim()),
        lieu: formData.lieu || null,
      };

      if (editingExperience) {
        await updateExperience({ variables: { id: editingExperience.id, input } });
        toast({ title: "Expérience mise à jour avec succès" });
      } else {
        await createExperience({ variables: { input } });
        toast({ title: "Expérience ajoutée avec succès" });
      }
      refetch();
      setOpen(false);
      setEditingExperience(null);
      form.reset();
    } catch (error) {
      toast({ title: "Erreur lors de l'opération", variant: "destructive" });
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    form.reset({
      poste: experience.poste,
      entreprise: experience.entreprise,
      dateDebut: experience.dateDebut,
      dateFin: experience.dateFin || "",
      enCours: experience.enCours,
      description: experience.description,
      competences: experience.competences.join(', '),
      lieu: experience.lieu || "",
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExperience({ variables: { id } });
      toast({ title: "Expérience supprimée avec succès" });
      refetch();
    } catch (error) {
      toast({ title: "Erreur lors de la suppression", variant: "destructive" });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingExperience(null);
    form.reset();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <nav className="border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/admin/dashboard")} size="sm">
            <ArrowLeft size={16} className="mr-2" />
            Retour au Dashboard
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gestion des Expériences</h1>
            <p className="text-muted-foreground">Ajoutez, modifiez ou supprimez vos expériences</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus size={16} className="mr-2" />
                Nouvelle Expérience
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingExperience ? "Modifier l'expérience" : "Nouvelle expérience"}</DialogTitle>
                <DialogDescription>
                  Remplissez les informations de l'expérience
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="poste"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titre du poste</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Développeur Full Stack" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="entreprise"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entreprise</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Tech Corp" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dateDebut"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date de début</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dateFin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date de fin</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" disabled={form.watch('enCours')} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="enCours"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <input 
                            type="checkbox" 
                            checked={field.value} 
                            onChange={field.onChange} 
                            className="h-4 w-4"
                            aria-label="Poste actuel"
                          />
                        </FormControl>
                        <FormLabel className="!mt-0">Poste actuel</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lieu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lieu</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Paris, France" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Description de vos responsabilités" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="competences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Compétences (séparées par des virgules)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="React, Node.js, MongoDB" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={handleClose}>
                      Annuler
                    </Button>
                    <Button type="submit" className="bg-gradient-primary">
                      {editingExperience ? "Modifier" : "Ajouter"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des expériences</CardTitle>
            <CardDescription>Gérez vos expériences depuis cette interface</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Poste</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {experiences.map((experience: Experience) => (
                  <TableRow key={experience.id}>
                    <TableCell className="font-medium">{experience.poste}</TableCell>
                    <TableCell>{experience.entreprise}</TableCell>
                    <TableCell>
                      {new Date(experience.dateDebut).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                      {' - '}
                      {experience.enCours ? 'Présent' : experience.dateFin ? new Date(experience.dateFin).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }) : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(experience)}
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(experience.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageExperiences;
