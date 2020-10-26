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
        <td>{stateDistricts[0]}</td>
        {stateDistricts.map((el) => {
          const matchingState = stateData.find((s) => s.id === el);
          const background = getStateColor(matchingState.party);
          return (
            <td
              className={`${background}`}
              onClick={() => {
                handleSmallStateClick(el);
              }}
            >
              {matchingState.votes}
            </td>
          );
        })}
      </tr>
    );
  }

  return (
    <div className="panel">
      <table>
        <thead>
          <tr>
            <td></td>
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
