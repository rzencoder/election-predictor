import { parseURLMapData } from "../../utils";

describe("parseURLMapData", () => {
  test("returns string array with data", () => {
    const result = parseURLMapData("ab");
    expect(result).toStrictEqual(["0", "0", "1", "0", "0", "2"]);
  });

  test("returns array of '0' with no data", () => {
    const result = parseURLMapData(undefined);
    expect(result).toStrictEqual(Array(57).fill("0"));
  });

  test("returns '0' with non alphabet characters", () => {
    const result = parseURLMapData("&%");
    expect(result).toStrictEqual(Array(6).fill("0"));
  });
});
