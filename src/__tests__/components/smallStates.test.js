import { render } from "@testing-library/react";
import { SmallStates } from "../../components";
import userEvent from "@testing-library/user-event";
import data from "../../data/states.json";

const setStateData = jest.fn();

describe("<SmallStates />", () => {
  it("renders the <SmallStates />", () => {
    const { container, getByText } = render(
      <SmallStates stateData={data} setStateData={setStateData} />
    );
    expect(getByText("DC")).toBeTruthy();
    expect(getByText("RI")).toBeTruthy();
    expect(getByText("MA")).toBeTruthy();
    expect(getByText("14")).toBeTruthy();
    expect(getByText("11")).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders the nothing when no data", () => {
    const { queryByText } = render(
      <SmallStates stateData={null} setStateData={setStateData} />
    );
    expect(queryByText("DC")).toBeNull();
    expect(queryByText("RI")).toBeNull();
    expect(queryByText("14")).toBeNull();
  });

  it("changes the party when state clicked", () => {
    const { getByText } = render(
      <SmallStates stateData={data} setStateData={setStateData} />
    );

    expect(setStateData.mock.calls.length).toBe(0);
    userEvent.click(getByText("14"));
    expect(setStateData.mock.calls.length).toBe(1);
  });
});
