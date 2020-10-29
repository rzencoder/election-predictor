import { getStateColor } from "../../utils";
import "./districts.scss";

const districts = {
  nebraska: ["NE", "NE1", "NE2", "NE3"],
  maine: ["ME", "ME1", "ME2"],
};

export default function Districts({ stateData, handleSmallStateClick }) {
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