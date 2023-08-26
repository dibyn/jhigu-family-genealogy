import {
  ModelOptions,
  Severity,
  getModelForClass,
  index,
  post,
  prop,
} from '@typegoose/typegoose';
import mongoose from 'mongoose';

@post<PersonClass>('save', function (doc: any) {
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
    timestamps: false,
    collection: 'Person',
    // id: true,
    // validateModifiedOnly: false
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
  @prop({ required: false })
  name: string;
  @prop({ required: false })
  pids: (number | string)[];
  @prop({ required: false })
  mid: string | number;
  @prop({ required: false })
  fid: string | number;
  @prop({ required: false })
  img: string;
  // birthDate: Date;
  _id: mongoose.Types.ObjectId | string;
}
// const PersonClassType = typeof PersonClass
const Person = getModelForClass(PersonClass);
// const r = Person instanceof PersonClass
export { Person, PersonClass };
