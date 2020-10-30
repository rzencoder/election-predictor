import { useState, useEffect } from "react";
import { useWindowSize } from "../../hooks/use-window-size";
import { demColor, repColor } from "../../constants/styles";
import AnimationToggle from "../animationToggle";
import Confetti from "react-confetti";
import "./votesBar.scss";

export default function VotesBar({ stateData }) {
  const [totals, setTotals] = useState({});
  const [animations, setAnimations] = useState(true);
  const size = useWindowSize();

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
    <section className="bar-container">
      <div className="bar-markers">
        <div className="markers marker-top" />
        <div className="markers marker-bottom" />
      </div>
      <div className="bar-labels">
        {
          // Check if theres a party with enough votes to win and user hasn't switched off animations. Then checking which party won to apply suitable styling.
          animations && (totals.dem > 269 || totals.rep > 269) && (
            <Confetti
              className={`confetti-container ${
                totals.dem > 269 ? "dem-confetti" : "rep-confetti"
              }`}
              colors={totals.dem > 269 ? [demColor] : [repColor]}
              width={size.width}
              height={size.height}
              numberOfPieces={size.width > 600 ? 180 : 100}
              inset="none"
            />
          )
        }
        <div>Democrats {totals.dem > 269 && "Win"}</div>
        <div>Republicans {totals.rep > 269 && "Win"}</div>
      </div>
      <div className="bar">
        <div
          className={`party-bar dem-bar ${totals.dem > 269 && "win"}`}
          style={{ width: (totals.dem / 538) * 100 + "%" }}
        >
          <div>{totals.dem}</div>
        </div>
        <div
          className="swing-bar"
          style={{ width: (totals.blank / 538) * 100 + "%" }}
        ></div>
        <div
          className={`party-bar rep-bar ${totals.rep > 269 && "win"}`}
          style={{ width: (totals.rep / 538) * 100 + "%" }}
        >
          <div>{totals.rep}</div>
        </div>
      </div>
      <AnimationToggle setAnimations={setAnimations} animations={animations} />
    </section>
  );
}
