import mongoose, { Document, Schema } from 'mongoose';

export interface IProfil extends Document {
  nom: string;
  prenom: string;
  titre: string;
  biographie: string;
  email: string;
  telephone?: string;
  adresse?: string;
  reseauxSociaux: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  photo?: string;
}

const profilSchema = new Schema<IProfil>({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  titre: { type: String, required: true },
  biographie: { type: String, required: true },
  email: { type: String, required: true },
  telephone: String,
  adresse: String,
  reseauxSociaux: {
    linkedin: String,
    github: String,
    twitter: String,
    website: String
  },
  photo: String
}, { timestamps: true });

export default mongoose.model<IProfil>('Profil', profilSchema);