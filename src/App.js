import { useState, useEffect } from "react";
import {
  Districts,
  Header,
  Map,
  SmallStates,
  VotesBar,
  ShareLink,
} from "./components";
import states from "./data/states.json";
import { parseURLMapData } from "./utils";
import ReactTooltip from "react-tooltip";
import { demColor, repColor } from "./constants/styles";
import { getPresident } from "./utils";

export default function App() {
  const [stateData, setStateData] = useState(states);
  const [content, setContent] = useState(null);
  const [year, setYear] = useState("Predictor");

  function renderTooltip() {
    if (!content) return null;
    const matchingState = stateData.find((s) => s.val === content);
    return (
      <div>
        <div className="tooltip-state">{matchingState.name}</div>
        <div className="tooltip-year">
          {matchingState.votes} electoral votes
        </div>
        <div className="tooltip-history">
          <div>History</div>
          <ul>
            {matchingState.history.map((el) => {
              const color = el.party === 1 ? demColor : repColor;
              return (
                <li
                  key={`${matchingState.name}-${el.year}-history`}
                  style={{ color: color }}
                >
                  {el.year} {getPresident(el.year, el.party)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  // Check if map url parameter and parse it into data to display in the map
  useEffect(() => {
    const queryString = window.location.search;
    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      const mapParameter = urlParams.get("map");
      // Checking if 19 as data stored in base 3. 50 states + 6 districts + blank
      if (mapParameter.length === 19) {
        const mapString = parseURLMapData(mapParameter);
        const mapData = stateData.map((el, index) => {
          return { ...el, party: parseInt(mapString[index]) };
        });
        setStateData(mapData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (year === "Predictor") return setStateData(states);
    const data = stateData.map((el) => {
      const index = el.history.findIndex((el) => el.year === parseInt(year));
      const party = el.history[index].party;
      const votes = el.history[index].votes;
      return { ...el, party, votes };
    });
    setStateData(data);
  }, [year]);

  // Handle clicking on states too small to click directly on the map
  const handleSmallStateClick = (id) => {
    const newStateData = stateData.map((el) => {
      // Change party when state selected and roll back to a blank if neither rep or dem.
      const partyValue = el.party === 2 ? 0 : el.party + 1;
      return el.id === id ? { ...el, party: partyValue } : el;
    });
    setStateData(newStateData);
  };

  return (
    <main>
      <Header />
      <VotesBar stateData={stateData} year={year} setYear={setYear} />
      {year !== "Predictor" && (
        <div className="title-historical-result">{`${year} ${getPresident(
          parseInt(year),
          1
        )} vs ${getPresident(parseInt(year), 2)}`}</div>
      )}
      <section className="container">
        <Map
          stateData={stateData}
          setStateData={setStateData}
          setTooltipContent={setContent}
        />
        <ReactTooltip className="tooltip-container">
          {renderTooltip()}
        </ReactTooltip>
        <aside className="states-panel">
          <SmallStates
            stateData={stateData}
            handleSmallStateClick={handleSmallStateClick}
          />
          <Districts
            stateData={stateData}
            handleSmallStateClick={handleSmallStateClick}
          />
        </aside>
      </section>
      <ShareLink stateData={stateData} />
    </main>
  );
}
