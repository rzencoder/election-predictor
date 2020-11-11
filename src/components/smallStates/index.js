import smallStatesData from "../../data/smallStates.json";
import { memo } from "react";
import { getStateColor } from "../../utils";
import "./smallStates.scss";

function SmallStates({ stateData, setStateData }) {
  // Handle clicking on states too small to click directly on the map
  const handleSmallStateClick = (id) => {
    const newStateData = stateData.map((el) => {
      // Change party when state selected and roll back to a blank if neither rep or dem.
      const partyValue = el.party === 2 ? 0 : el.party + 1;
      return el.id === id ? { ...el, party: partyValue } : el;
    });
    setStateData(newStateData);
  };

  if (!stateData) return null;

  return (
    <div className="small-states-container">
      {smallStatesData.map((el) => {
        const matchingState = stateData.find((s) => s.id === el);
        const background = getStateColor(matchingState.party);
        return (
          <div key={`${matchingState.id}-state`} className="button-container">
            <button
              className={`small-state-button ${background}`}
              id={`${matchingState.id}-small-state`}
              onClick={() => {
                handleSmallStateClick(el);
              }}
            >
              {matchingState.votes}
            </button>
            <div className="small-state-name">
              <div>{el}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(SmallStates);
