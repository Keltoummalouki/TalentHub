import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PORTFOLIO } from "@/graphql/queries";
import { CREATE_PROJET, UPDATE_PROJET, DELETE_PROJET } from "@/graphql/mutations";

const projectSchema = z.object({
  titre: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  technologies: z.string().min(1, "Les technologies sont requises"),
  lienDemo: z.string().url("URL invalide").optional().or(z.literal("")),
  lienGithub: z.string().url("URL invalide").optional().or(z.literal("")),
  images: z.string().optional(),
  dateDebut: z.string().min(1, "La date de début est requise"),
  dateFin: z.string().optional(),
  statut: z.enum(["en_cours", "termine", "pause"]),
  tags: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const ManageProjects = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  const { data, loading, refetch } = useQuery(GET_PORTFOLIO);
  const [createProjet] = useMutation(CREATE_PROJET);
  const [updateProjet] = useMutation(UPDATE_PROJET);
  const [deleteProjet] = useMutation(DELETE_PROJET);

  const projects = data?.getPortfolio?.projets || [];

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      titre: "",
      description: "",
      technologies: "",
      lienDemo: "",
      lienGithub: "",
      images: "",
      dateDebut: "",
      dateFin: "",
      statut: "en_cours",
      tags: "",
    },
  });

  const onSubmit = async (formData: ProjectFormData) => {
    try {
      const input = {
        titre: formData.titre,
        description: formData.description,
        technologies: formData.technologies.split(',').map(t => t.trim()),
        lienDemo: formData.lienDemo || null,
        lienGithub: formData.lienGithub || null,
        images: formData.images ? formData.images.split(',').map(i => i.trim()) : [],
        dateDebut: formData.dateDebut,
        dateFin: formData.dateFin || null,
        statut: formData.statut,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
      };

      if (editingProject) {
        await updateProjet({ variables: { id: editingProject.id, input } });
        toast({ title: "Projet mis à jour avec succès" });
      } else {
        await createProjet({ variables: { input } });
        toast({ title: "Projet ajouté avec succès" });
      }
      refetch();
      setOpen(false);
      setEditingProject(null);
      form.reset();
    } catch (error) {
      toast({ title: "Erreur lors de l'opération", variant: "destructive" });
    }
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    form.reset({
      titre: project.titre,
      description: project.description,
      technologies: project.technologies.join(', '),
      lienDemo: project.lienDemo || "",
      lienGithub: project.lienGithub || "",
      images: project.images?.join(', ') || "",
      dateDebut: project.dateDebut,
      dateFin: project.dateFin || "",
      statut: project.statut,
      tags: project.tags?.join(', ') || "",
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProjet({ variables: { id } });
      toast({ title: "Projet supprimé avec succès" });
      refetch();
    } catch (error) {
      toast({ title: "Erreur lors de la suppression", variant: "destructive" });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProject(null);
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
            <h1 className="text-3xl font-bold mb-2">Gestion des Projets</h1>
            <p className="text-muted-foreground">Ajoutez, modifiez ou supprimez vos projets</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus size={16} className="mr-2" />
                Nouveau Projet
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProject ? "Modifier le projet" : "Nouveau projet"}</DialogTitle>
                <DialogDescription>
                  Remplissez les informations du projet
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="titre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titre</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nom du projet" />
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
                          <Textarea {...field} placeholder="Description du projet" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="technologies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technologies (séparées par des virgules)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="React, Node.js, MongoDB" />
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
                          <FormLabel>Date de fin (optionnel)</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="statut"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Statut</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un statut" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="en_cours">En cours</SelectItem>
                            <SelectItem value="termine">Terminé</SelectItem>
                            <SelectItem value="pause">En pause</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lienDemo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lien démo (optionnel)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://example.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lienGithub"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lien GitHub (optionnel)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://github.com/user/repo" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URLs des images (séparées par des virgules)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (séparés par des virgules)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="web, fullstack, react" />
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
                      {editingProject ? "Modifier" : "Ajouter"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des projets</CardTitle>
            <CardDescription>Gérez vos projets depuis cette interface</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Technologies</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project: any) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.titre}</TableCell>
                    <TableCell className="max-w-xs truncate">{project.description}</TableCell>
                    <TableCell>{project.technologies.slice(0, 2).join(', ')}</TableCell>
                    <TableCell className="capitalize">{project.statut.replace('_', ' ')}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(project)}
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(project.id)}
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

export default ManageProjects;
