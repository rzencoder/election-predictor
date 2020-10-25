import { geoCentroid } from "d3-geo";
import { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

import states from "./data/states.json";
import geoData from "./data/geo.json";
import { convertMapData } from "./utils/convertMapData";
import { parseURLMapData } from "./utils/parseURLMapData";
import {
  handleDistrictColor,
  handleStateColor,
} from "./utils/handleStateColor";
import SVGDefs from "./components/SVGDefs";

const smallStates = ["VT", "NH", "MA", "RI", "CT", "NJ", "DE", "MD", "DC"];
const districts = ["ME1", "ME2", "NE1", "NE2", "NE3"];

export default function Map() {
  const [stateData, setStateData] = useState(states);
  const [totals, setTotals] = useState({});
  const [showLink, setShowLink] = useState(false);
  const [link, setLink] = useState("");

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

  useEffect(() => {
    const data = stateData.reduce(
      (acc, cur) => {
        const votes = cur.id === "NE" ? 2 : cur.id === "ME" ? 2 : cur.votes;
        if (cur.party === 1) acc.dem += votes;
        if (cur.party === 2) acc.rep += votes;
        if (cur.party === 0) acc.blank += votes;
        return acc;
      },
      { dem: 0, rep: 0, blank: 0 }
    );
    setTotals(data);
    console.log(totals);
  }, [stateData]);

  useEffect(() => {
    if (showLink) {
      setLink(convertMapData(stateData));
    }
  }, [showLink]);

  const handleStateClick = (id) => {
    const newStateData = stateData.map((obj) => {
      // Dem: 1, Rep: 2, Blank: 0
      let partyValue = obj.party === 2 ? 0 : obj.party + 1;
      // Find matching state from stateDate and assign party change
      return obj.val === id ? { ...obj, party: partyValue } : obj;
    });
    // Change Nebraska districts to state party on state click
    if (id === "31") {
      newStateData[51].party = newStateData[27].party;
      newStateData[52].party = newStateData[27].party;
      newStateData[53].party = newStateData[27].party;
    } else if (id === "23") {
      // Change Maine districts to state party on state click
      newStateData[54].party = newStateData[19].party;
      newStateData[55].party = newStateData[19].party;
    }
    setStateData(newStateData);
  };

  const handleSmallStateClick = (id) => {
    const newStateData = stateData.map((obj) => {
      const partyValue = obj.party === 2 ? 0 : obj.party + 1;
      return obj.id === id ? { ...obj, party: partyValue } : obj;
    });
    setStateData(newStateData);
  };

  console.log("render map");

  return (
    <>
      <div>
        <h2>
          <span>US</span>Presidential <span>Election</span>
        </h2>
        <p>Predictor</p>
      </div>
      <div className="bar">
        <div
          className="dem"
          style={{ width: (totals.dem / 538) * 100 + "%" }}
        ></div>
        <div
          className="swing"
          style={{ width: (totals.blank / 538) * 100 + "%" }}
        ></div>
        <div
          className="rep"
          style={{ width: (totals.rep / 538) * 100 + "%" }}
        ></div>
      </div>
      <div>
        <button onClick={() => setShowLink(!showLink)}>Share Map</button>
        {showLink && <div>{`http://localhost:3000?map=${link}`}</div>}
      </div>
      <div>
        {smallStates.map((el) => {
          const matchingState = stateData.find((s) => s.id == el);
          const background = handleDistrictColor(matchingState);
          return (
            <button
              style={{ background: background }}
              onClick={() => {
                handleSmallStateClick(el);
              }}
            >
              {el}
            </button>
          );
        })}
      </div>
      <div>
        {districts.map((el) => {
          return (
            <button
              onClick={() => {
                handleSmallStateClick(el);
              }}
            >
              {el}
            </button>
          );
        })}
      </div>
      <ComposableMap projection="geoAlbersUsa">
        <SVGDefs stateData={stateData} />
        <Geographies geography={geoData}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                const fill = handleStateColor(geo, stateData);
                return (
                  <Geography
                    key={geo.rsmKey}
                    stroke="#FFF"
                    geography={geo}
                    onClick={() => handleStateClick(geo.id)}
                    fill={fill}
                  ></Geography>
                );
              })}
              {geographies.map((geo) => {
                const centroid = geoCentroid(geo);
                const currentState = stateData.find((el) => el.val === geo.id);
                if (smallStates.includes(currentState.id)) {
                  return;
                }
                return (
                  <g key={geo.rsmKey + "-state"}>
                    {currentState && centroid[0] > -160 && centroid[0] < -67 && (
                      <Marker coordinates={centroid}>
                        <text
                          y="2"
                          fontSize={13}
                          textAnchor="middle"
                          fill={currentState.id === "HI" ? "#000" : "#fff"}
                        >
                          {currentState.id}
                        </text>
                        <text
                          y="16"
                          fontSize={11}
                          textAnchor="middle"
                          fill={currentState.id === "HI" ? "#000" : "#fff"}
                        >
                          {currentState.votes}
                        </text>
                      </Marker>
                    )}
                  </g>
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>
    </>
  );
}
