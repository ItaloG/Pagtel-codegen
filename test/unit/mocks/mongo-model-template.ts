export const mongoModelTemplateMock = `
import mongoose from 'mongoose';

export interface CreateExampleModel extends mongoose.Document {
  created_at: Date;
}

const schema = new mongoose.Schema(
  {
    __v: { select: false },
    created_at: { type: Date, default: () => new Date() },
  },
  { strict: false }
);

export const CreateExampleModel = mongoose.model<CreateExampleModel>(
  'CreateExample',
  schema,
  'create_example'
);`;
