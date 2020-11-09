import { memo } from "react";
import "./yearSelect.scss";

function YearSelect({ yearData, setYear, year }) {
  return (
    <select
      data-testid="year-select"
      value={year}
      onChange={({ target }) => setYear(target.value)}
    >
      <option value="Predictor">Predictor</option>
      {yearData.history.map((el) => (
        <option
          key={`${el.year}-option`}
          value={el.year}
        >{`${el.year} Result`}</option>
      ))}
    </select>
  );
}

export default memo(YearSelect);
