import { handleStateColor } from "../../utils";
import data from "../../data/states.json";

test("handleStateColor with data", () => {
  const result = handleStateColor({ id: "10" }, data);
  expect(result).toBe("dem-state");
});

test("handleStateColor with no data", () => {
  const result = handleStateColor(undefined, undefined);
  expect(result).toBe("");
});

test("handleStateColor with wrong data", () => {
  const result = handleStateColor(1000, data);
  expect(result).toBe("");
});

test("handleStateColor with no data", () => {
  const result = handleStateColor(undefined, undefined);
  expect(result).toBe("");
});

test("handleStateColor with nebraska returns nebraska-state", () => {
  const result = handleStateColor({ id: "31" }, data);
  expect(result).toBe("nebraska-state");
});

test("handleStateColor with maine returns maine-state", () => {
  const result = handleStateColor({ id: "23" }, data);
  expect(result).toBe("maine-state");
});
