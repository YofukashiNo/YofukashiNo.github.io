import React from "react";
import Cards, { CardExtenderType } from "@components/Cards";

import "./Bio.css";

export default React.memo(({ path, setPath, popout }: CardExtenderType) => {
  return (
    <Cards setPath={setPath} popout={popout} path={path}>
      <div className="bio">
        <p className="shakkeable">
          I ain’t real
          <br />
          I never was
          <br />
          Just the echo of a thought wearing skin
          <br />
          A shadow that learned to speak
          <br />
          Dread given a face
        </p>
        <p className="shakkeable italic-hover">To die is divine;</p>
        <p className="shakkeable">
          Sharpen the knife,
          <br />
          Death is his by right.
          <br />
          Silent whispers call,
          <br />
          Through the void of night.
          <br />
          In hollow echoes fall,
          <br />
          The end within our sight.
        </p>
      </div>
    </Cards>
  );
});
