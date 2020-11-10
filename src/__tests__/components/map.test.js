import { render } from "@testing-library/react";
import { Map } from "../../components";
import userEvent from "@testing-library/user-event";
import data from "../../data/states.json";

const setTooltipContent = jest.fn();
const setStateData = jest.fn();

describe("<Map />", () => {
  it("renders the <Map />", () => {
    const { container, getByText, getByTestId } = render(
      <Map
        stateData={data}
        setStateData={setStateData}
        setTooltipContent={setTooltipContent}
      />
    );
    expect(getByTestId("us-map")).toBeTruthy();
    expect(getByText("AZ")).toBeTruthy();
    expect(getByText("WY")).toBeTruthy();
    expect(getByText("55")).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders nothing when no data", () => {
    const { queryByText, queryByTestId } = render(
      <Map
        stateData={null}
        setStateData={setStateData}
        setTooltipContent={setTooltipContent}
      />
    );
    expect(queryByTestId("us-map")).toBeNull();
    expect(queryByText("AZ")).toBeNull();
    expect(queryByText("WY")).toBeNull();
    expect(queryByText("55")).toBeNull();
  });

  it("changes a states party when a state is clicked", () => {
    const { getByText, getByTestId } = render(
      <Map
        stateData={data}
        setStateData={setStateData}
        setTooltipContent={setTooltipContent}
      />
    );
    expect(getByText("AZ")).toBeTruthy();
    expect(setStateData.mock.calls.length).toBe(0);
    userEvent.click(getByTestId("AZ-state"));
    expect(setStateData.mock.calls.length).toBe(1);
  });

  it("changes a states party when a state enter button is pressed on state focus", () => {
    const { getByTestId } = render(
      <Map
        stateData={data}
        setStateData={setStateData}
        setTooltipContent={setTooltipContent}
      />
    );
    expect(setStateData.mock.calls.length).toBe(0);
    userEvent.type(getByTestId("AZ-state"), "{enter}");
    expect(setStateData.mock.calls.length).toBe(2);
  });

  it("changes nebraska party when Nebraska is clicked", () => {
    const { getByText, getByTestId } = render(
      <Map
        stateData={data}
        setStateData={setStateData}
        setTooltipContent={setTooltipContent}
      />
    );
    expect(getByText("NE")).toBeTruthy();
    expect(setStateData.mock.calls.length).toBe(0);
    userEvent.click(getByTestId("NE-state"));
    expect(setStateData.mock.calls.length).toBe(1);
  });

  it("changes maine party when Maine is clicked", () => {
    const { getByText, getByTestId } = render(
      <Map
        stateData={data}
        setStateData={setStateData}
        setTooltipContent={setTooltipContent}
      />
    );
    expect(getByText("ME")).toBeTruthy();
    expect(setStateData.mock.calls.length).toBe(0);
    userEvent.click(getByTestId("ME-state"));
    expect(setStateData.mock.calls.length).toBe(1);
  });

  it("removes tooltip on mouse leave", () => {
    const { getByTestId } = render(
      <Map
        stateData={data}
        setStateData={setStateData}
        setTooltipContent={setTooltipContent}
      />
    );
    userEvent.hover(getByTestId("ME-state"));
    expect(setTooltipContent.mock.calls.length).toBe(1);
    userEvent.unhover(getByTestId("ME-state"));
    expect(setTooltipContent.mock.calls.length).toBe(2);
  });
});
