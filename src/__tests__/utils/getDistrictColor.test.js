import { getDistrictColor } from "../../utils";

describe("getDistrictColor", () => {
  test("return hex string with data", () => {
    const result = getDistrictColor(1);
    expect(result).toBe("#1375b6");
  });

  test("return hex color black with wrong data", () => {
    const result = getDistrictColor(4);
    expect(result).toBe("#000");
  });

  test("return hex color black with no data", () => {
    const result = getDistrictColor(undefined);
    expect(result).toBe("#000");
  });
});
