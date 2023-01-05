import { validateFields } from "@/validations";

describe("#Validations", () => {
  const FIELDS_TO_VALIDATE = ["name", "scope"];

  test("#validateFields should not throw if all fields is valid", () => {
    const data = { name: "Hello", scope: "World" };

    expect(() => validateFields(FIELDS_TO_VALIDATE, data)).not.toThrow();
  });

  test("#validateFields should throw if an field is not valid", () => {
    const data = { name: "Hello", scope: "World564" };

    expect(() => validateFields(FIELDS_TO_VALIDATE, data)).toThrow();
  });
});
