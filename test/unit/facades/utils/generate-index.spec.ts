import { File } from "@/utils";
import { generateIndex } from "@/facades/utils";

describe("#Generate index", () => {
  it("should generate a index file", async () => {
    const createSpy = jest
      .spyOn(File, "create")
      .mockReturnValueOnce(Promise.resolve());

    const expected = {
      filePath: "any_path",
      fileContent: `export * from './any_name';\n`,
    };
    await generateIndex("any_path", "any_name");
    expect(createSpy).toHaveBeenCalled();
    expect(createSpy).toHaveBeenCalledWith(expected);
  });
});
