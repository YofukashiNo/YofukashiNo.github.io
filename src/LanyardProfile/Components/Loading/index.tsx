import React from "react";
import Utils from "@Utils";
import Cards from "@components/Cards";
import Assets, { BackgroundAudio } from "@Assets";

import "./Loading.css";

export default React.memo(() => {
  const audio = Utils.getAudio();
  React.useEffect(() => {
    audio.src = BackgroundAudio.awkwardCricket;
    if (audio.started && audio.paused) audio.play();
    return () => {
      audio.src = BackgroundAudio.アレンジ;
      if (audio.started && audio.paused) audio.play();
    };
  });
  return (
    <Cards path={["loading"]}>
      <div className="loading-wrapper">
        <img id="loading-image" src={Assets.loader} alt="" />
        <div id="loading-header">LOADING...</div>
      </div>
    </Cards>
  );
});
