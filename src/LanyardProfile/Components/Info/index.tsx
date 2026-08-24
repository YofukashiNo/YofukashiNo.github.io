import React from "react";
import Cards from "@components/Cards";
import Readme from "@components/Readme";
import Activities from "@components/Activities";
import MusicPlayer from "@components/MusicPlayer";
import Bio from "@components/Bio";
import Socials from "@components/Socials";
import { CardContext } from "@Utils";

import "./Info.css";

interface InfoType {
  popout?: boolean;
}

export default React.memo(({ popout }: InfoType) => {
  const { popoutPath, activity } = CardContext.use();
  const [path, setPath] = React.useState((popout && popoutPath) || ["info"]);

  React.useEffect(() => {
    if (popout) setPath(popoutPath);
  }, [popoutPath]);

  const paths = [
    "readme",
    !activity.hidden && activity.activities.length && "activities",
    "music",
    "socials",
    "bio",
  ].filter(Boolean);

  if (popout && !popoutPath.length) return null;

  switch (path[1]) {
    case "readme": {
      return <Readme setPath={setPath} popout={popout} path={path} />;
    }
    case "activities": {
      return <Activities setPath={setPath} popout={popout} path={path} />;
    }
    case "bio": {
      return <Bio setPath={setPath} popout={popout} path={path} />;
    }
    case "socials": {
      return <Socials setPath={setPath} popout={popout} path={path} />;
    }
    case "music": {
      return <MusicPlayer setPath={setPath} popout={popout} path={path} />;
    }
    case "info":
    default: {
      return (
        <Cards setPath={setPath} path={path}>
          <div className="info">
            <span className="info-command">/{">"} ls -l</span>
            <ul className="info-paths">
              {paths.map((e) => (
                <li key={e} onClick={() => setPath([...path, e])}>
                  &gt; {e}
                </li>
              ))}
            </ul>
          </div>
        </Cards>
      );
    }
  }
});
