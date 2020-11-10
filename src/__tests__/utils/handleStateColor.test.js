import { handleStateColor } from "../../utils";
import data from "../../data/states.json";

describe("handleStateColor", () => {
  test("return class name with data", () => {
    const result = handleStateColor({ id: "10" }, data);
    expect(result).toBe("dem-state");
  });

  test("return empty string with no data", () => {
    const result = handleStateColor(undefined, undefined);
    expect(result).toBe("");
  });

  test("return empty string with wrong data", () => {
    const result = handleStateColor(1000, data);
    expect(result).toBe("");
  });

  test("return nebraska-state with nebraska", () => {
    const result = handleStateColor({ id: "31" }, data);
    expect(result).toBe("nebraska-state");
  });

  test("return maine-state with maine", () => {
    const result = handleStateColor({ id: "23" }, data);
    expect(result).toBe("maine-state");
  });
});
