import { render } from "@testing-library/react";
import { SVGDefs } from "../../components";
import data from "../../data/states.json";

describe("<SVGDefs />", () => {
  it("renders the <SVGDefs />", () => {
    const { container, getByTestId } = render(
      <svg>
        <SVGDefs stateData={data} />
      </svg>
    );
    expect(getByTestId("nebraska-gradient")).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
