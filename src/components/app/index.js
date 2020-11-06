import { useState, useEffect } from "react";
import {
  Districts,
  Header,
  Map,
  SmallStates,
  VotesBar,
  ShareLink,
  Tooltip,
  AnimationToggle,
} from "../../components";
import states from "../../data/states.json";
import { parseURLMapData } from "../../utils";
import ReactTooltip from "react-tooltip";
import { getPresident } from "../../utils";
import "./app.scss";
import YearSelect from "../yearSelect";

export default function App() {
  const [stateData, setStateData] = useState(states);
  const [animations, setAnimations] = useState(true);
  const [tooltipContent, setTooltipContent] = useState(null);
  const [year, setYear] = useState("Predictor");

  // Check if map url parameter and parse it into data to display in the map
  useEffect(() => {
    const queryString = window.location.search;
    if (queryString) {
      const urlParams = new URLSearchParams(queryString);
      const mapParameter = urlParams.get("map");
      // Checking if 19 as data stored in base 3. 50 states + 6 districts + blank
      if (mapParameter.length === 19) {
        setTimeout(() => {
          const mapString = parseURLMapData(mapParameter);
          const mapData = stateData.map((el, index) => {
            return { ...el, party: parseInt(mapString[index]) };
          });
          setStateData(mapData);
          setAnimations(false);
        }, 200);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Change states data when user changes the election year
  useEffect(() => {
    if (year !== "Predictor") {
      setAnimations(false);
    } else {
      setAnimations(true);
    }
    // If user selects the predictor reset the data to the original
    if (year === "Predictor") return setStateData(states);
    const data = stateData.map((el) => {
      const index = el.history.findIndex((el) => el.year === parseInt(year));
      const party = el.history[index].party;
      const votes = el.history[index].votes;
      return { ...el, party, votes };
    });
    setStateData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  return (
    <main>
      <Header />
      <VotesBar stateData={stateData} year={year} animations={animations} />
      <section className="options-container">
        <div>
          <YearSelect yearData={stateData[0]} setYear={setYear} year={year} />
          <AnimationToggle
            setAnimations={setAnimations}
            animations={animations}
          />
        </div>
        {year !== "Predictor" && (
          <div className="title-historical-result">{`${year} ${getPresident(
            parseInt(year),
            1
          )} vs ${getPresident(parseInt(year), 2)}`}</div>
        )}
      </section>

      <section className="container">
        <Map
          stateData={stateData}
          setStateData={setStateData}
          setTooltipContent={setTooltipContent}
        />
        <ReactTooltip className="tooltip-container">
          {tooltipContent && (
            <Tooltip
              matchingState={stateData.find((s) => s.val === tooltipContent)}
            />
          )}
        </ReactTooltip>
        <aside className="states-panel">
          <SmallStates stateData={stateData} setStateData={setStateData} />
          <Districts stateData={stateData} setStateData={setStateData} />
        </aside>
      </section>
      <ShareLink stateData={stateData} />
    </main>
  );
}
