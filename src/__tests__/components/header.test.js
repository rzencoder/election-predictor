import { render } from "@testing-library/react";
import { Header } from "../../components";

describe("<Header />", () => {
  it("renders the <Header />", () => {
    const { container, getByText } = render(<Header />);

    expect(getByText("US")).toBeTruthy();
    expect(getByText("Election")).toBeTruthy();
    expect(getByText("Predictor")).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
