import { Folder, FormatString, generateDomainMockPath } from "@/utils";

export async function generateMockFacade({
  scope,
}: DomainMockFacade.Params): DomainMockFacade.Result {
  const SOURCE_DOMAIN_MAIN_PATH = generateDomainMockPath("source");
  const TEST_DOMAIN_MAIN_PATH = generateDomainMockPath("test");
  const FORMATTED_SCOPE = FormatString.convertToKebabCase(scope);

  const sourceFiles = await Folder.readFolder({
    folder: `${SOURCE_DOMAIN_MAIN_PATH}/${FORMATTED_SCOPE}`,
  });

  const mockFiles = await Folder.readFolder({
    folder: `${TEST_DOMAIN_MAIN_PATH}/${FORMATTED_SCOPE}`,
  });

  return { type: "success", message: "domain mock generated" };
}

namespace DomainMockFacade {
  export type Params = {
    scope: string;
  };
  export type Result = Promise<{
    type: "info" | "error" | "success";
    message: string;
  }>;
}
