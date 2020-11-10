import { getStateColor } from "../../utils";

describe("getStateColor", () => {
  test("return class name with data", () => {
    const result = getStateColor(1);
    expect(result).toBe("dem-state");
  });

  test("return empty string with wrong data", () => {
    const result = getStateColor(4);
    expect(result).toBe("");
  });

  test("return empty string with no data", () => {
    const result = getStateColor(undefined);
    expect(result).toBe("");
  });
});
