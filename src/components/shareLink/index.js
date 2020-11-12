import { useState, useEffect } from "react";
import { convertMapData } from "../../utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import copyIcon from "./copy-icon.png";
import { memo } from "react";
import "./shareLink.scss";

function ShareLink({ stateData }) {
  const [showLink, setShowLink] = useState(false);
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false); // eslint-disable-line no-unused-vars
  const [showMessage, setShowMessage] = useState(false);

  const linkURL = process.env.REACT_APP_LINK_URL || "http://localhost:3000";

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

  // Display and remove copy message
  useEffect(() => {
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  }, [showMessage]);

  function handleCopyLink() {
    setCopied(true);
    setShowMessage(true);
  }

  return (
    <section className="share-link-container">
      {!showLink && (
        <button
          className="share-link-button"
          data-testid="share-link-button"
          onClick={() => setShowLink(!showLink)}
        >
          {"</> "}Share Map
        </button>
      )}
      {showLink && (
        <div className="link-copy">
          <div className="link-text">{`${linkURL}?map=${link}`}</div>
          <CopyToClipboard
            text={`${linkURL}?map=${link}`}
            onCopy={() => handleCopyLink()}
          >
            <button className="copy-button" disabled={showMessage}>
              <img src={copyIcon} alt="" />
              Copy
            </button>
          </CopyToClipboard>
        </div>
      )}
      <div className={`message ${showMessage ? "show" : undefined}`}>
        Link copied to clipboard
      </div>
    </section>
  );
}

export default memo(ShareLink);
