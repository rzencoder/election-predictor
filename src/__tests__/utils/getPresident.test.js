import { getPresident } from "../../utils";

test("getPresident with data", () => {
  const result = getPresident(2020, 1);
  expect(result).toBe("Biden");
});

test("getPresident with no party returns empty string", () => {
  const result = getPresident(2020, null);
  expect(result).toBe("");
});

test("getPresident with no year returns dem/rep", () => {
  const result = getPresident(undefined, 2);
  expect(result).toBe("Republicans");
});
