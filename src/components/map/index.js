import { memo } from "react";
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

function Map({ stateData, setStateData, setTooltipContent }) {
  //Handle changing of state party on selection
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
      <ComposableMap
        aria-label="Map of United States"
        projection="geoAlbersUsa"
        data-tip=""
      >
        <SVGDefs stateData={stateData} />
        <Geographies geography={geoData}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                const fill = handleStateColor(geo, stateData);
                const matchingState = stateData.find((s) => s.val === geo.id);
                return (
                  <Geography
                    className={`state ${fill}`}
                    key={geo.rsmKey}
                    stroke="#FFF"
                    geography={geo}
                    role="button"
                    aria-label={`${matchingState.id} map state`}
                    onClick={() => handleStateClick(geo.id)}
                    onKeyDown={({ key }) => {
                      key === "Enter" && handleStateClick(geo.id);
                    }}
                    onMouseEnter={() => {
                      setTooltipContent(geo.id);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent(null);
                    }}
                  ></Geography>
                );
              })}
              {
                // Placement of state abbreviations annotations
                geographies.map((geo) => {
                  const centroid = geoCentroid(geo);
                  const currentState = stateData.find(
                    (el) => el.val === geo.id
                  );
                  // eslint-disable-next-line
                  if (smallStatesData.includes(currentState.id)) return;
                  return (
                    <g key={geo.rsmKey + "-state"} className="state-label">
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
                })
              }
            </>
          )}
        </Geographies>
      </ComposableMap>
    </div>
  );
}

export default memo(Map);
