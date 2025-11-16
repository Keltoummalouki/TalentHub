import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PORTFOLIO } from "@/graphql/queries";
import { UPDATE_PROFIL } from "@/graphql/mutations";
import { useEffect } from "react";

const profileSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  title: z.string().min(1, "Le titre est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(1, "Le téléphone est requis"),
  location: z.string().min(1, "La localisation est requise"),
  bio: z.string().min(1, "La biographie est requise"),
  github: z.string().url("URL invalide").optional().or(z.literal("")),
  linkedin: z.string().url("URL invalide").optional().or(z.literal("")),
  twitter: z.string().url("URL invalide").optional().or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ManageProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data, loading } = useQuery(GET_PORTFOLIO);
  const [updateProfil] = useMutation(UPDATE_PROFIL);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      bio: "",
      github: "",
      linkedin: "",
      twitter: "",
    },
  });

  useEffect(() => {
    if (data?.getPortfolio?.profil) {
      const profil = data.getPortfolio.profil;
      form.reset({
        name: `${profil.prenom} ${profil.nom}`,
        title: profil.titre || "",
        email: profil.email || "",
        phone: profil.telephone || "",
        location: profil.adresse || "",
        bio: profil.biographie || "",
        github: profil.reseauxSociaux?.github || "",
        linkedin: profil.reseauxSociaux?.linkedin || "",
        twitter: profil.reseauxSociaux?.twitter || "",
      });
    }
  }, [data, form]);

  const onSubmit = async (formData: ProfileFormData) => {
    try {
      const [prenom, ...nomParts] = formData.name.split(' ');
      const nom = nomParts.join(' ');
      
      await updateProfil({
        variables: {
          input: {
            nom,
            prenom,
            titre: formData.title,
            biographie: formData.bio,
            email: formData.email,
            telephone: formData.phone,
            adresse: formData.location,
            reseauxSociaux: {
              github: formData.github,
              linkedin: formData.linkedin,
              twitter: formData.twitter,
            },
          },
        },
      });
      toast({ title: "Profil mis à jour avec succès" });
    } catch (error) {
      toast({ title: "Erreur lors de la mise à jour", variant: "destructive" });
    }
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

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Modifier le Profil</h1>
          <p className="text-muted-foreground">Mettez à jour vos informations personnelles</p>
        </div>

        {!data?.getPortfolio?.profil && (
          <Card className="mb-4 border-yellow-500">
            <CardContent className="pt-6">
              <p className="text-yellow-600">Aucun profil trouvé. Créez-en un nouveau.</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>Gérez vos informations de profil</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="John Doe" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titre professionnel</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Développeur Full Stack" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="john.doe@example.com" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="+33 6 12 34 56 78" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localisation</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Paris, France" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biographie</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Parlez-nous de vous..." rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Réseaux sociaux</h3>
                  <FormField
                    control={form.control}
                    name="github"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://github.com/username" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>LinkedIn</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://linkedin.com/in/username" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter (optionnel)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://twitter.com/username" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => navigate("/admin/dashboard")}>
                    Annuler
                  </Button>
                  <Button type="submit" className="bg-gradient-primary">
                    Enregistrer les modifications
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageProfile;
