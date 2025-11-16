import mongoose, { Document, Schema } from 'mongoose';

export interface ICompetence extends Document {
  nom: string;
  niveau: 'debutant' | 'intermediaire' | 'avance' | 'expert';
  categorie: 'frontend' | 'backend' | 'database' | 'devops' | 'design' | 'autre';
  icone?: string;
}

const competenceSchema = new Schema<ICompetence>({
  nom: { type: String, required: true },
  niveau: { type: String, enum: ['debutant', 'intermediaire', 'avance', 'expert'], required: true },
  categorie: { type: String, enum: ['frontend', 'backend', 'database', 'devops', 'design', 'autre'], required: true },
  icone: String
}, { timestamps: true });

export default mongoose.model<ICompetence>('Competence', competenceSchema);