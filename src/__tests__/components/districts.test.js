import { render } from "@testing-library/react";
import { Districts } from "../../components";
import userEvent from "@testing-library/user-event";
import data from "../../data/states.json";

const setStateData = jest.fn();

describe("<Districts />", () => {
  it("renders the <Districts />", () => {
    const { container, getByText } = render(
      <Districts stateData={data} setStateData={setStateData} />
    );
    expect(getByText("ME")).toBeTruthy();
    expect(getByText("NE")).toBeTruthy();
    expect(getByText("3")).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders the nothing when no data", () => {
    const { queryByText } = render(
      <Districts stateData={null} setStateData={setStateData} />
    );
    expect(queryByText("ME")).toBeNull();
    expect(queryByText("States")).toBeNull();
  });

  it("changes the party when district clicked", () => {
    const { getAllByRole } = render(
      <Districts stateData={data} setStateData={setStateData} />
    );

    expect(setStateData.mock.calls.length).toBe(0);
    userEvent.click(getAllByRole("button")[0]);
    expect(setStateData.mock.calls.length).toBe(1);
  });
});
