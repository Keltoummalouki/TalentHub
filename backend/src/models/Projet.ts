import mongoose, { Document, Schema } from 'mongoose';

export interface IProjet extends Document {
  titre: string;
  description: string;
  technologies: string[];
  lienDemo?: string;
  lienGithub?: string;
  images: string[];
  dateDebut: Date;
  dateFin?: Date;
  statut: 'en_cours' | 'termine' | 'pause';
  tags: string[];
}

const projetSchema = new Schema<IProjet>({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String, required: true }],
  lienDemo: String,
  lienGithub: String,
  images: [String],
  dateDebut: { type: Date, required: true },
  dateFin: Date,
  statut: { type: String, enum: ['en_cours', 'termine', 'pause'], default: 'en_cours' },
  tags: [String]
}, { timestamps: true });

projetSchema.index({ tags: 1, dateDebut: -1 });

export default mongoose.model<IProjet>('Projet', projetSchema);