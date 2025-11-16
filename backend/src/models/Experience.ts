import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
  poste: string;
  entreprise: string;
  description: string;
  dateDebut: Date;
  dateFin?: Date;
  enCours: boolean;
  competences: string[];
  lieu?: string;
}

const experienceSchema = new Schema<IExperience>({
  poste: { type: String, required: true },
  entreprise: { type: String, required: true },
  description: { type: String, required: true },
  dateDebut: { type: Date, required: true },
  dateFin: Date,
  enCours: { type: Boolean, default: false },
  competences: [String],
  lieu: String
}, { timestamps: true });

experienceSchema.index({ dateDebut: -1 });

export default mongoose.model<IExperience>('Experience', experienceSchema);
