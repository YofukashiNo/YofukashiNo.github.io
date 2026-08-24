import React from "react";
import Cards, { CardExtenderType } from "@components/Cards";
import { CardContext } from "@Utils";

import "./Readme.css";

export default React.memo(({ path, setPath, popout }: CardExtenderType) => {
  const { age } = CardContext.use();
  const containerRef = React.useRef();
  return (
    <Cards containerRef={containerRef} setPath={setPath} popout={popout} path={path}>
      <div className="readme">
        <ul>
          <li>• currently {age}</li>
          <li>• reincarnation of degenracy</li>
          <li>• indian</li>
          <br />
          <li>
            ৹ To support me you can follow my{" "}
            <a data-tooltip="*2300 IST" href="https://www.twitch.tv/yofukashino_">
              {"Twitch"}
            </a>
            {" too"}
          </li>
        </ul>
      </div>
    </Cards>
  );
});
