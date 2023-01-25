import { logger } from "@/utils";

describe("#Logger", () => {
  it("should log a info log", () => {
    const logSpy = jest.spyOn(console, "log");

    logger({ type: "info", message: "any_message" });

    expect(logSpy).toHaveBeenCalledWith(undefined, "any_message");
  });
});
