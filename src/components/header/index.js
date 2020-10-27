import "./header.scss";

export default function Header() {
  return (
    <header>
      <h1 className="header-title">
        <span className="title-span">US</span> Presidential{" "}
        <span className="title-span">Election</span>
      </h1>
      <div className="header-subtitle">
        <span className="header-star red-star">★</span>
        <span className="header-star blue-star">★</span>
        <span className="header-star red-star">★</span>
        <span className="header-subtitle-text">Predictor</span>
        <span className="header-star red-star">★</span>
        <span className="header-star blue-star">★</span>
        <span className="header-star red-star">★</span>
      </div>
    </header>
  );
}
