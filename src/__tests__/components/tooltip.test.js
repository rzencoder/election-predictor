import { render } from "@testing-library/react";
import { Tooltip } from "../../components";

const matchingState = {
  id: "AL",
  val: "01",
  votes: 9,
  party: 2,
  name: "Alabama",
  history: [
    { year: 2020, party: 2, votes: 9 },
    { year: 2016, party: 2, votes: 9 },
    { year: 2012, party: 2, votes: 9 },
    { year: 2008, party: 2, votes: 9 },
    { year: 2004, party: 2, votes: 9 },
    { year: 2000, party: 2, votes: 9 },
  ],
};

const demState = {
  id: "DE",
  val: "10",
  votes: 3,
  party: 1,
  name: "Delaware",
  history: [
    { year: 2020, party: 1, votes: 3 },
    { year: 2016, party: 1, votes: 3 },
    { year: 2012, party: 1, votes: 3 },
    { year: 2008, party: 1, votes: 3 },
    { year: 2004, party: 1, votes: 3 },
    { year: 2000, party: 1, votes: 3 },
  ],
};

describe("<Tooltip />", () => {
  it("renders the <Tooltip />", () => {
    const { container, getByText } = render(
      <Tooltip matchingState={matchingState} />
    );
    expect(getByText("Alabama")).toBeTruthy();
    expect(getByText("9 electoral votes")).toBeTruthy();
    expect(getByText("2000 Bush")).toBeTruthy();
    expect(getByText("History")).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
  it("renders nothing if no data", () => {
    const { queryByText } = render(<Tooltip matchingState={null} />);
    expect(queryByText("History")).toBeNull();
  });
  it("renders different color with different party", () => {
    const { container, getByText } = render(
      <Tooltip matchingState={demState} />
    );
    expect(getByText("Delaware")).toBeTruthy();
    expect(getByText("3 electoral votes")).toBeTruthy();
    expect(getByText("2000 Gore")).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });
});
