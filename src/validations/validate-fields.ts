import { ValidateString } from "@/utils";

export const validateFields = (
  fieldsToValidate: string[],
  fields: any
): void => {
  fieldsToValidate.forEach((field) => {
    if (!ValidateString.validateSpecialCharacter(fields[field]))
      throw new Error(`Campo inválido: ${field}`);
    if (!fields[field]) throw new Error(`Campo inválido: ${field}`);
  });
};
