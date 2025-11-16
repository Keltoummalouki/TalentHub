import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@apollo/client";
import { GET_COMPETENCES } from "@/graphql/queries";
import { CREATE_COMPETENCE, UPDATE_COMPETENCE, DELETE_COMPETENCE } from "@/graphql/mutations";

const skillSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  categorie: z.enum(["frontend", "backend", "database", "devops", "design", "autre"]),
  niveau: z.enum(["debutant", "intermediaire", "avance", "expert"]),
  icone: z.string().optional(),
});

type SkillFormData = z.infer<typeof skillSchema>;

const ManageSkills = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);

  const { data, loading, refetch } = useQuery(GET_COMPETENCES);
  const [createCompetence] = useMutation(CREATE_COMPETENCE);
  const [updateCompetence] = useMutation(UPDATE_COMPETENCE);
  const [deleteCompetence] = useMutation(DELETE_COMPETENCE);

  const skills = data?.getCompetences || [];

  const form = useForm<SkillFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      nom: "",
      categorie: "frontend",
      niveau: "intermediaire",
      icone: "",
    },
  });

  const onSubmit = async (formData: SkillFormData) => {
    try {
      const input = {
        nom: formData.nom,
        categorie: formData.categorie,
        niveau: formData.niveau,
        icone: formData.icone || null,
      };

      if (editingSkill) {
        await updateCompetence({ variables: { id: editingSkill.id, input } });
        toast({ title: "Compétence mise à jour avec succès" });
      } else {
        await createCompetence({ variables: { input } });
        toast({ title: "Compétence ajoutée avec succès" });
      }
      refetch();
      setOpen(false);
      setEditingSkill(null);
      form.reset();
    } catch (error) {
      toast({ title: "Erreur lors de l'opération", variant: "destructive" });
    }
  };

  const handleEdit = (skill: any) => {
    setEditingSkill(skill);
    form.reset({
      nom: skill.nom,
      categorie: skill.categorie,
      niveau: skill.niveau,
      icone: skill.icone || "",
    });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCompetence({ variables: { id } });
      toast({ title: "Compétence supprimée avec succès" });
      refetch();
    } catch (error) {
      toast({ title: "Erreur lors de la suppression", variant: "destructive" });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSkill(null);
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
            <h1 className="text-3xl font-bold mb-2">Gestion des Compétences</h1>
            <p className="text-muted-foreground">Ajoutez, modifiez ou supprimez vos compétences</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus size={16} className="mr-2" />
                Nouvelle Compétence
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingSkill ? "Modifier la compétence" : "Nouvelle compétence"}</DialogTitle>
                <DialogDescription>
                  Remplissez les informations de la compétence
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="React" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="categorie"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catégorie</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez une catégorie" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="frontend">Frontend</SelectItem>
                            <SelectItem value="backend">Backend</SelectItem>
                            <SelectItem value="database">Database</SelectItem>
                            <SelectItem value="devops">DevOps</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="niveau"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Niveau</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez un niveau" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="debutant">Débutant</SelectItem>
                            <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                            <SelectItem value="avance">Avancé</SelectItem>
                            <SelectItem value="expert">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="icone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icône (optionnel)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="react-icon" />
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
                      {editingSkill ? "Modifier" : "Ajouter"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des compétences</CardTitle>
            <CardDescription>Gérez vos compétences depuis cette interface</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Niveau</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skills.map((skill: any) => (
                  <TableRow key={skill.id}>
                    <TableCell className="font-medium">{skill.nom}</TableCell>
                    <TableCell className="capitalize">{skill.categorie}</TableCell>
                    <TableCell className="capitalize">{skill.niveau}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(skill)}
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(skill.id)}
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

export default ManageSkills;
