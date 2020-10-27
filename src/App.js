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

export default function App() {
  const [stateData, setStateData] = useState(states);

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

  return (
    <main>
      <Header />
      <VotesBar stateData={stateData} />
      <div className="container">
        <Map stateData={stateData} setStateData={setStateData} />
        <SmallStates
          stateData={stateData}
          handleSmallStateClick={handleSmallStateClick}
        />
        <Districts
          stateData={stateData}
          handleSmallStateClick={handleSmallStateClick}
        />
      </div>
      <ShareLink stateData={stateData} />
    </main>
  );
}
