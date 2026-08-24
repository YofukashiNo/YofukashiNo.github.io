import React from "react";
import Assets from "@Assets";
import Cards, { CardExtenderType } from "@components/Cards";
import constants from "@Constants";

import "./Socials.css";

/* <ul className="socials-paths">
  {socials.map((e) => (
    <li key={e.type || e.name} onClick={() => setPath([...path, (e.type || e.name).toLowerCase()])}>
       {e.type?.toLowerCase() || e.name?.toLowerCase()}
    </li>
  ))}
</ul>; */

export default React.memo(({ path, setPath, popout }: CardExtenderType) => {
  return (
    <Cards setPath={setPath} popout={popout} path={path}>
      <div className="socials">
        <span className="socials-command">/{">"} ls --help</span>
        <ul className="socials-paths">
          <a href="https://www.twitch.tv/yofukashino_">
            <li>
              &gt; <Assets.socials.twitch className="social-icon" />
              &gt; twitch
            </li>
          </a>

          <a href="https://github.com/yofukashino">
            <li>
              &gt; <Assets.socials.github className="social-icon" />
              &gt; github
            </li>
          </a>

          <a href="https://www.instagram.com/yofukashino_">
            <li>
              &gt; <Assets.socials.instagram className="social-icon" />
              &gt; instagram
            </li>
          </a>

          <a href="https://www.youtube.com/@yofukashino_">
            <li>
              &gt; <Assets.socials.youtube className="social-icon" />
              &gt; youtube
            </li>
          </a>

          {/* <a href="https://discord.com/invite/SgKSKyh9gY">
            <li>
              &gt; <Assets.socials.support className="social-icon" />
              &gt; support server
            </li>
          </a> */}

          {/*   <a href={`https://discord.com/users/${constants.USER_ID}`}>
            <li>
              &gt; <Assets.socials.discord className="social-icon" />
              &gt; {constants.USER} (discord)
            </li>
          </a> */}

          {/*   <a href="https://github.com/yofukashino/RepluggedPlugins">
            <li>
              &gt; <Assets.socials.plugin className="social-icon" />
              &gt; replugged plugins
            </li>
          </a> */}
        </ul>
      </div>
    </Cards>
  );
});
