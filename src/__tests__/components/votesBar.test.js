import { render } from "@testing-library/react";
import { VotesBar } from "../../components";

const data = [
  {
    id: "FL",
    val: "12",
    votes: 2,
    party: 0,
    name: "Florida",
    history: [
      { year: 2020, party: 2, votes: 29 },
      { year: 2016, party: 2, votes: 29 },
      { year: 2012, party: 1, votes: 29 },
      { year: 2008, party: 1, votes: 27 },
      { year: 2004, party: 2, votes: 27 },
      { year: 2000, party: 2, votes: 25 },
    ],
  },
  {
    id: "GA",
    val: "13",
    votes: 270,
    party: 2,
    name: "Georgia",
    history: [
      { year: 2020, party: 1, votes: 16 },
      { year: 2016, party: 2, votes: 16 },
      { year: 2012, party: 2, votes: 16 },
      { year: 2008, party: 2, votes: 15 },
      { year: 2004, party: 2, votes: 15 },
      { year: 2000, party: 2, votes: 13 },
    ],
  },
  {
    id: "HI",
    val: "15",
    votes: 3,
    party: 1,
    name: "Hawaii",
    history: [
      { year: 2020, party: 1, votes: 4 },
      { year: 2016, party: 1, votes: 4 },
      { year: 2012, party: 1, votes: 4 },
      { year: 2008, party: 1, votes: 4 },
      { year: 2004, party: 1, votes: 4 },
      { year: 2000, party: 1, votes: 4 },
    ],
  },
  {
    id: "ME",
    val: "23",
    votes: 4,
    party: 1,
    name: "Maine",
    history: [
      { year: 2020, party: 1, votes: 4 },
      { year: 2016, party: 1, votes: 4 },
      { year: 2012, party: 1, votes: 4 },
      { year: 2008, party: 1, votes: 4 },
      { year: 2004, party: 1, votes: 4 },
      { year: 2000, party: 1, votes: 4 },
    ],
  },
  {
    id: "NE",
    val: "31",
    votes: 5,
    party: 2,
    name: "Nebraska",
    history: [
      { year: 2020, party: 2, votes: 5 },
      { year: 2016, party: 2, votes: 5 },
      { year: 2012, party: 2, votes: 5 },
      { year: 2008, party: 2, votes: 5 },
      { year: 2004, party: 2, votes: 5 },
      { year: 2000, party: 2, votes: 5 },
    ],
  },
];

const demData = [
  {
    id: "FL",
    val: "12",
    votes: 2,
    party: 0,
    name: "Florida",
    history: [
      { year: 2020, party: 2, votes: 29 },
      { year: 2016, party: 2, votes: 29 },
      { year: 2012, party: 1, votes: 29 },
      { year: 2008, party: 1, votes: 27 },
      { year: 2004, party: 2, votes: 27 },
      { year: 2000, party: 2, votes: 25 },
    ],
  },
  {
    id: "GA",
    val: "13",
    votes: 270,
    party: 1,
    name: "Georgia",
    history: [
      { year: 2020, party: 1, votes: 16 },
      { year: 2016, party: 2, votes: 16 },
      { year: 2012, party: 2, votes: 16 },
      { year: 2008, party: 2, votes: 15 },
      { year: 2004, party: 2, votes: 15 },
      { year: 2000, party: 2, votes: 13 },
    ],
  },
];

describe("<VotesBar />", () => {
  it("renders the <VotesBar />", () => {
    const { container, getByText, queryByText, getByTestId } = render(
      <VotesBar year={"Predictor"} animations={false} stateData={data} />
    );
    expect(getByTestId("votes-bar")).toBeTruthy();
    expect(getByText("Republicans Win")).toBeTruthy();
    expect(getByText("Democrats")).toBeTruthy();
    expect(queryByText("Trump")).toBeNull();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("displays democrats as winners with enough votes", () => {
    const { getByText, queryByText } = render(
      <VotesBar year={"Predictor"} animations={false} stateData={demData} />
    );
    expect(queryByText("Republicans Win")).toBeFalsy();
    expect(getByText("Republicans")).toBeTruthy();
    expect(getByText("Democrats Win")).toBeTruthy();
    expect(queryByText("Trump")).toBeNull();
  });

  it("renders nothing with no data", () => {
    const { queryByTestId } = render(
      <VotesBar year={null} animations={false} stateData={null} />
    );
    expect(queryByTestId("votes-bar")).toBeNull();
  });

  it("renders different presidents with different year", () => {
    const { getByText, queryByText } = render(
      <VotesBar year={2016} animations={false} stateData={data} />
    );
    expect(getByText("Trump Wins")).toBeTruthy();
    expect(getByText("Clinton")).toBeTruthy();
    expect(queryByText("Biden")).toBeNull();
    expect(queryByText("Republicans")).toBeNull();
    expect(queryByText("Democrats")).toBeNull();
  });

  // it("renders confetti with winner and animations on", () => {
  //   const { getByText, queryByText } = render(
  //     <VotesBar
  //       year={"Predictor"}
  //       animations={true}
  //       stateData={data}
  //     />
  //   );
  //   expect(getByText("Republicans Win")).toBeTruthy();
  // });
});
