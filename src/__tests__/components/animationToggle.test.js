import { render } from "@testing-library/react";
import { AnimationToggle } from "../../components";
import userEvent from "@testing-library/user-event";

const setAnimations = jest.fn();

describe("<AnimationToggle />", () => {
  it("renders the <AnimationToggle />", () => {
    const { container, getByTestId } = render(
      <AnimationToggle animations={true} setAnimations={setAnimations} />
    );
    expect(getByTestId("animations-toggle")).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("toggles animation when switched", () => {
    const { getByTestId } = render(
      <AnimationToggle animations={true} setAnimations={setAnimations} />
    );
    expect(setAnimations.mock.calls.length).toBe(0);
    userEvent.click(getByTestId("animations-toggle"));
    expect(setAnimations.mock.calls.length).toBe(1);
  });
});
