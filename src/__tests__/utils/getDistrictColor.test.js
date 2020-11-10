import { getDistrictColor } from "../../utils";

test("getDistrictColor with data", () => {
  const result = getDistrictColor(1);
  expect(result).toBe("#1375b6");
});

test("getDistrictColor with wrong data", () => {
  const result = getDistrictColor(4);
  expect(result).toBe("#000");
});

test("getDistrictColor with no data", () => {
  const result = getDistrictColor(undefined);
  expect(result).toBe("#000");
});
