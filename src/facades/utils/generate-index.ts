import { File } from "@/file";

export const generateIndex = async (
  path: string,
  name: string
): Promise<void> => {
  await File.create({
    filePath: path,
    fileContent: `export * from './${name}'`,
  });
};
