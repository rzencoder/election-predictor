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

const smallStates = ["VT", "NH", "MA", "RI", "CT", "NJ", "DE", "MD", "DC"];

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
      if (map.length === 17) {
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
        if (cur.party === 1) acc.dem += cur.votes;
        if (cur.party === 2) acc.rep += cur.votes;
        if (cur.party === 0) acc.blank += cur.votes;
        return acc;
      },
      { dem: 0, rep: 0, blank: 0 }
    );
    setTotals(data);
  }, [stateData]);

  useEffect(() => {
    if (showLink) {
      setLink(convertMapData(stateData));
    }
  }, [showLink]);

  const handleStateClick = ({ id }) => {
    const newStateData = stateData.map((obj) => {
      const partyValue = obj.party === 2 ? 0 : obj.party + 1;
      return obj.val === id ? { ...obj, party: partyValue } : obj;
    });
    setStateData(newStateData);
  };

  function handleStateColor(geo) {
    const { party } = stateData.find((s) => s.val === geo.id);
    if (party === 0) return "#888";
    if (party === 1) return "#00f";
    if (party === 2) return "#f00";
    return "#000";
  }

  console.log("render map");

  return (
    <>
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
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoData}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                const fill = handleStateColor(geo);
                return (
                  <Geography
                    key={geo.rsmKey}
                    stroke="#FFF"
                    geography={geo}
                    onClick={() => handleStateClick(geo)}
                    fill={fill}
                  />
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
