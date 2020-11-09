import { memo } from "react";
import { demColor, repColor } from "../../constants/styles";
import { getPresident } from "../../utils";
import "./tooltip.scss";

function Tooltip({ matchingState }) {
  if (!matchingState) return null;
  return (
    <div>
      <div className="tooltip-state">{matchingState.name}</div>
      <div className="tooltip-year">{matchingState.votes} electoral votes</div>
      <div className="tooltip-history">
        <div>History</div>
        <ul>
          {matchingState.history.map((el) => {
            const color = el.party === 1 ? demColor : repColor;
            return (
              <li
                key={`${matchingState.name}-${el.year}-history`}
                style={{ color: color }}
              >
                {el.year} {getPresident(el.year, el.party)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default memo(Tooltip);
