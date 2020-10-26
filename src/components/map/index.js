import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { SVGDefs } from "../index.js";
import geoData from "../../data/geo.json";
import smallStatesData from "../../data/smallStates.json";
import { handleStateColor } from "../../utils";
import "./map.scss";

export default function Map({ stateData, setStateData }) {
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

  return (
    <div className="map-container">
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
                if (smallStatesData.includes(currentState.id)) {
                  return;
                }
                return (
                  <g key={geo.rsmKey + "-state"}>
                    {currentState && centroid[0] > -160 && centroid[0] < -67 && (
                      <Marker coordinates={centroid}>
                        <text
                          y="2"
                          onClick={() => handleStateClick(geo.id)}
                          fontSize={13}
                          textAnchor="middle"
                          fill={currentState.id === "HI" ? "#000" : "#fff"}
                        >
                          {currentState.id}
                        </text>
                        <text
                          y="16"
                          onClick={() => handleStateClick(geo.id)}
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
    </div>
  );
}
