import { getPresident } from "../../utils";

describe("getPresident", () => {
  test("return president name with data", () => {
    const result = getPresident(2020, 1);
    expect(result).toBe("Biden");
  });

  test("return empty string with no party", () => {
    const result = getPresident(2020, null);
    expect(result).toBe("");
  });

  test("return democrats/republicans with no year", () => {
    const result = getPresident(undefined, 2);
    expect(result).toBe("Republicans");
  });
});
