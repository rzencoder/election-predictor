import {
  Districts,
  Header,
  Map,
  SmallStates,
  VotesBar,
  ShareLink,
} from "./components";
import { useState, useEffect } from "react";
import states from "./data/states.json";
import { parseURLMapData } from "./utils";

export default function App() {
  const [stateData, setStateData] = useState(states);

  useEffect(() => {
    const queryString = window.location.search;
    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      const map = urlParams.get("map");
      if (map.length === 19) {
        const b = parseURLMapData(map);
        const data = stateData.map((el, index) => {
          return { ...el, party: parseInt(b[index]) };
        });
        setStateData(data);
      }
    }
  }, []);

  const handleSmallStateClick = (id) => {
    const newStateData = stateData.map((obj) => {
      const partyValue = obj.party === 2 ? 0 : obj.party + 1;
      return obj.id === id ? { ...obj, party: partyValue } : obj;
    });
    setStateData(newStateData);
  };

  return (
    <main>
      <Header />
      <VotesBar stateData={stateData} />
      <ShareLink stateData={stateData} />
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
    </main>
  );
}
