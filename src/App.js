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

export default function App() {
  const [stateData, setStateData] = useState(states);
  const [content, setContent] = useState(null);

  function getPresident(year, party) {
    if (year === 2020) {
      return party === 1 ? "Biden" : "Trump";
    } else if (year === 2016) {
      return party === 1 ? "Clinton" : "Trump";
    } else if (year === 2012) {
      return party === 1 ? "Obama" : "Romney";
    } else if (year === 2008) {
      return party === 1 ? "Obama" : "McCain";
    }
  }

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

  // Handle clicking on states too small to click directly on the map
  const handleSmallStateClick = (id) => {
    const newStateData = stateData.map((el) => {
      // Change party when state selected and roll back to a blank if neither rep or dem.
      const partyValue = el.party === 2 ? 0 : el.party + 1;
      return el.id === id ? { ...el, party: partyValue } : el;
    });
    setStateData(newStateData);
  };

  console.log(content);

  return (
    <main>
      <Header />
      <VotesBar stateData={stateData} />
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
