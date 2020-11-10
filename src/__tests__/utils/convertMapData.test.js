import { convertMapData } from "../../utils";

const data = [
  { party: 0 },
  { party: 1 },
  { party: 2 },
  { party: 0 },
  { party: 1 },
  { party: 2 },
  { party: 0 },
  { party: 1 },
  { party: 2 },
];

describe("convertMapData", () => {
  test("return string of characters with data", () => {
    const result = convertMapData(data);
    expect(result).toBe("eee");
  });

  test("return empty string with no data", () => {
    const result = convertMapData(undefined);
    expect(result).toBe("");
  });
});
