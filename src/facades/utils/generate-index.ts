import { File } from "@/utils";

export const generateIndex = async (
  path: string,
  name: string
): Promise<void> => {
  await File.create({
    filePath: path,
    fileContent: `export * from './${name}'`,
  });
};
