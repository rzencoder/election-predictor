import "./animationToggle.scss";

export default function AnimationToggle({ setAnimations, animations }) {
  return (
    <div className="animations">
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
