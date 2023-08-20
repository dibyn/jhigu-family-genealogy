import {
  ModelOptions,
  Severity,
  getModelForClass,
  index,
  post,
  prop,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';

@post<PersonClass>('save', function (doc) {
  if (doc) {
    doc.id = doc._id.toString();
    doc._id = doc.id;
  }
})
@post<PersonClass[]>(/^find/, function (docs) {
  // @ts-ignore
  if (this.op === 'find') {
    docs.forEach((doc) => {
      doc.id = doc._id.toString();
      doc._id = doc.id;
    });
  }
})
@ModelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'Person',
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
// @index({ title: 1 })
class PersonClass {
  @prop({ required: true, unique: true })
  id: string | number;
  @prop({ required: true })
  gender: 'male' | 'female';
  @prop({ required: true })
  name: string;
  pids: (number | string)[];
  mid: string | number;
  fid: string | number;
  photo: string;
  // birthDate: Date;
  // @prop({ default: false })
  // completed: boolean;
  _id: mongoose.Types.ObjectId | string;

}
const PersonClassType = typeof PersonClass
const Person =  getModelForClass(PersonClass)
const r = Person instanceof PersonClass
export { Person, PersonClass };
