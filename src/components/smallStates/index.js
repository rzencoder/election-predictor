import smallStatesData from "../../data/smallStates.json";
import { getStateColor } from "../../utils";
import "./smallStates.scss";

export default function SmallStates({ stateData, handleSmallStateClick }) {
  return (
    <div className="small-states-container">
      {smallStatesData.map((el) => {
        const matchingState = stateData.find((s) => s.id === el);
        const background = getStateColor(matchingState.party);
        return (
          <div key={`${matchingState.id}-state`} className="button-container">
            <button
              className={`small-state-button ${background}`}
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
