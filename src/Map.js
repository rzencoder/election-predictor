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

const smallStates = ["VT", "NH", "MA", "RI", "CT", "NJ", "DE", "MD", "DC"];

export default function Map() {
  const [stateData, setStateData] = useState(states);
  const [totals, setTotals] = useState({});

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
                          fill="#fff"
                        >
                          {currentState.id}
                        </text>
                        <text
                          y="16"
                          fontSize={11}
                          textAnchor="middle"
                          fill="#fff"
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
