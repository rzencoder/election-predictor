import { useState, useEffect } from "react";
import { convertMapData } from "../../utils";
import "./shareLink.scss";

export default function ShareLink({ stateData }) {
  const [showLink, setShowLink] = useState(false);
  const [link, setLink] = useState("");

  useEffect(() => {
    if (showLink) {
      setLink(convertMapData(stateData));
    }
  }, [showLink]);

  return (
    <div>
      <button onClick={() => setShowLink(!showLink)}>Share Map</button>
      {showLink && <div>{`http://localhost:3000?map=${link}`}</div>}
    </div>
  );
}
