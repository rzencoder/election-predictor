import { render } from "@testing-library/react";
import { YearSelect } from "../../components";
import userEvent from "@testing-library/user-event";

const setYear = jest.fn();

const yearData = {
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

describe("<YearSelect />", () => {
  it("renders the <YearSelect />", () => {
    const { container, getByText } = render(
      <YearSelect year={2020} yearData={yearData} setYear={setYear} />
    );
    expect(getByText("2020 Result")).toBeTruthy();
    expect(getByText("2016 Result")).toBeTruthy();
    expect(getByText("Predictor")).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("selects the chosen year when selected", () => {
    const { getByText, getByTestId } = render(
      <YearSelect year={2020} yearData={yearData} setYear={setYear} />
    );
    expect(setYear.mock.calls.length).toBe(0);
    expect(getByText("2020 Result").selected).toBe(true);
    expect(getByText("2016 Result").selected).toBe(false);
    userEvent.selectOptions(getByTestId("year-select"), ["2016"]);
    expect(setYear.mock.calls.length).toBe(1);
  });
});
