import { getStateColor } from "../../utils";

import "./districts.scss";

const districts = {
  nebraska: ["NE", "NE1", "NE2", "NE3"],
  maine: ["ME", "ME1", "ME2"],
};

export default function Districts({ stateData, handleSmallStateClick }) {
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
          <tr>
            <td>NE</td>
            {districts.nebraska.map((el) => {
              const matchingState = stateData.find((s) => s.id == el);
              const background = getStateColor(matchingState.party);
              return (
                <td
                  style={{ backgroundColor: background }}
                  onClick={() => {
                    handleSmallStateClick(el);
                  }}
                >
                  {matchingState.votes}
                </td>
              );
            })}
          </tr>
          <tr>
            <td>ME</td>
            {districts.maine.map((el) => {
              const matchingState = stateData.find((s) => s.id == el);
              const background = getStateColor(matchingState.party);
              return (
                <td
                  style={{ backgroundColor: background }}
                  onClick={() => {
                    handleSmallStateClick(el);
                  }}
                >
                  {matchingState.votes}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
