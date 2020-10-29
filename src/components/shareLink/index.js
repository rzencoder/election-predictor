import { useState, useEffect } from "react";
import { convertMapData } from "../../utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copyIcon from "./copy-icon.png";
import "./shareLink.scss";

export default function ShareLink({ stateData }) {
  const [showLink, setShowLink] = useState(false);
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false); // eslint-disable-line no-unused-vars

  // Convert state data into a url parameter for sharing on selection
  useEffect(() => {
    if (showLink) {
      setLink(convertMapData(stateData));
      setCopied(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLink]);

  // Hide link when user changes map
  useEffect(() => {
    setShowLink(false);
    setLink("");
  }, [stateData]);

  return (
    <section className="share-link-container">
      <button
        className="share-link-button"
        onClick={() => setShowLink(!showLink)}
      >
        {"</> "}Share Map
      </button>
      {showLink && (
        <div className="link-copy">
          <div className="link-text">{`http://localhost:3000?map=${link}`}</div>
          <CopyToClipboard
            text={`http://localhost:3000?map=${link}`}
            onCopy={() => setCopied(true)}
          >
            <button className="copy-button">
              <img src={copyIcon} alt="" />
              Copy
            </button>
          </CopyToClipboard>
        </div>
      )}
    </section>
  );
}