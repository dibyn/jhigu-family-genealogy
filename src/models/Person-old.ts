import { ObjectId } from 'mongodb';
import mongoose, { Schema, Document } from 'mongoose';

export interface PersonDocument extends Document {
  id: string | number;
  gender: string;
  name?: string;
  pids?: (number | string)[];
  mid?: string | number;
  fid?: string | number;
}

const personSchema: Schema = new Schema<PersonDocument>({
  _id: ObjectId,
  id: { type: Schema.Types.Mixed, required: true },
  gender: { type: String, required: true },
  name: { type: String },
  pids: [{ type: Schema.Types.Mixed }],
  mid: { type: Schema.Types.Mixed },
  fid: { type: Schema.Types.Mixed },
});

const PersonModel = mongoose.models.Person || mongoose.model<PersonDocument>('Person', personSchema);

export default PersonModel;
