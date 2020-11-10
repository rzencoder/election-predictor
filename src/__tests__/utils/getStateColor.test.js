import { getStateColor } from "../../utils";

test("getStateColor with data", () => {
  const result = getStateColor(1);
  expect(result).toBe("dem-state");
});

test("getStateColor with wrong data", () => {
  const result = getStateColor(4);
  expect(result).toBe("");
});

test("getStateColor with no data", () => {
  const result = getStateColor(undefined);
  expect(result).toBe("");
});
