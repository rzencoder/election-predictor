import "./animationToggle.scss";
import { memo } from "react";

function AnimationToggle({ setAnimations, animations }) {
  return (
    <div className="animations-container">
      <div className="animations-text">Animations</div>
      <label className="switch">
        <input
          checked={animations}
          type="checkbox"
          aria-label="toggle-animations"
          onChange={() => setAnimations(!animations)}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default memo(AnimationToggle);
