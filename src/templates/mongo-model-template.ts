import { FormatString } from "@/utils";

const componentNameAnchor = "$$componentName";
const snakeCaseComponentNameAnchor = "$$snakeCaseComponentName";

const template = `
import mongoose from 'mongoose';

export interface $$componentNameModel extends mongoose.Document {
  created_at: Date;
}

const schema = new mongoose.Schema(
  {
    __v: { select: false },
    created_at: { type: Date, default: () => new Date() },
  },
  { strict: false }
);

export const $$componentNameModel = mongoose.model<$$componentNameModel>(
  '$$componentName',
  schema,
  '$$snakeCaseComponentName'
);`;

export function generateMongoModelTemplate({
  componentName,
}: MongoModelTemplate.Params): MongoModelTemplate.Result {
  const templateFill = template
    .replaceAll(
      componentNameAnchor,
      FormatString.upperCaseFirstLetter(componentName)
    )
    .replaceAll(
      snakeCaseComponentNameAnchor,
      FormatString.convertToSnakeCase(componentName)
    );

  return {
    template: templateFill,
  };
}

namespace MongoModelTemplate {
  export type Params = {
    componentName: string;
  };
  export type Result = {
    template: string;
  };
}
