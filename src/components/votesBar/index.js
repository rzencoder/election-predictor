import { useState, useEffect } from "react";
import "./votesBar.scss";

export default function VotesBar({ stateData }) {
  const [totals, setTotals] = useState({});

  // Updated total votes for each party when state data is changed
  useEffect(() => {
    const data = stateData.reduce(
      (acc, cur) => {
        // Nebraska and Maine have state and district votes so count state votes as two and district as one
        const votes = cur.id === "NE" ? 2 : cur.id === "ME" ? 2 : cur.votes;
        if (cur.party === 1) acc.dem += votes;
        if (cur.party === 2) acc.rep += votes;
        if (cur.party === 0) acc.blank += votes;
        return acc;
      },
      { dem: 0, rep: 0, blank: 0 }
    );
    setTotals(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateData]);

  return (
    <div className="bar">
      <div className="dem" style={{ width: (totals.dem / 538) * 100 + "%" }}>
        {totals.dem}
      </div>
      <div
        className="swing"
        style={{ width: (totals.blank / 538) * 100 + "%" }}
      ></div>
      <div className="rep" style={{ width: (totals.rep / 538) * 100 + "%" }}>
        {totals.rep}
      </div>
    </div>
  );
}
