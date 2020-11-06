import { getStateColor } from "../../utils";
import districts from "../../data/districts.json";
import { memo } from "react";
import "./districts.scss";

function Districts({ stateData, setStateData }) {
  // Handle clicking on states too small to click directly on the map
  const handleSmallStateClick = (id) => {
    const newStateData = stateData.map((el) => {
      // Change party when state selected and roll back to a blank if neither rep or dem.
      const partyValue = el.party === 2 ? 0 : el.party + 1;
      return el.id === id ? { ...el, party: partyValue } : el;
    });
    setStateData(newStateData);
  };

  // Render a table row for Maine and Nebraska
  function renderStateDistricts(stateDistricts) {
    return (
      <tr>
        <td className="district-state-name">{stateDistricts[0]}</td>
        {stateDistricts.map((el) => {
          const matchingState = stateData.find((s) => s.id === el);
          const background = getStateColor(matchingState.party);
          return (
            <td
              key={`${matchingState.id}-district`}
              className={`district-votes ${background}`}
            >
              <button
                onClick={() => {
                  handleSmallStateClick(el);
                }}
              >
                {matchingState.id === "NE"
                  ? 2
                  : matchingState.id === "ME"
                  ? 2
                  : matchingState.votes}
              </button>
            </td>
          );
        })}
      </tr>
    );
  }

  return (
    <div className="districts-container">
      <table>
        <thead>
          <tr className="table-headers">
            <td></td>
            <td rowSpan="2">state</td>
            <td colSpan="3">districts</td>
          </tr>
          <tr className="district-numbers">
            <td></td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
        </thead>
        <tbody>
          {renderStateDistricts(districts.nebraska)}
          {renderStateDistricts(districts.maine)}
        </tbody>
      </table>
    </div>
  );
}

export default memo(Districts);
