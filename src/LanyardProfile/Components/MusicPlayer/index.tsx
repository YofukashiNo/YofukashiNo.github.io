import React from "react";
import Timebar from "@components/Timebar";
import Cards, { CardExtenderType } from "@components/Cards";
import Utils, { CardContext } from "@Utils";
import { BackgroundAudio } from "@Assets";

import "./MusicPlayer.css";

import classNames from "classnames";
export default React.memo(({ path, setPath, popout }: CardExtenderType) => {
  const { loading } = CardContext.use();
  const audio = Utils.getAudio();
  const [name, setName] = React.useState("");
  const [isPlaying, setIsPlaying] = React.useState(!audio.paused);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [hoveringControls, setHoveringControls] = React.useState(null);
  const [controlsTooltip, setControlsTooltip] = React.useState(null);
  const [currentTime, setCurrentTime] = React.useState(0);
  const isScrubbing = React.useRef(false);
  const playAfterScrub = React.useRef(false);
  const timebarRef = React.useRef<HTMLDivElement>();

  /*   const barRef = React.useRef(null);
  const isScrubbing = React.useRef(false);


 */
  React.useEffect(() => {
    if (!timebarRef.current) return () => undefined;

    const bar = timebarRef.current.querySelector(`.timebar-mainBackground`);

    const seek = (clientX) => {
      const { duration } = audio;

      if (!bar || !duration) return;

      const rect = bar.getBoundingClientRect();
      const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      console.log(percent);
      audio.currentTime = percent * duration || 0;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isScrubbing.current) return;
      seek(e.clientX);
    };

    const stopScrub = () => {
      isScrubbing.current = false;
      if (playAfterScrub.current) audio.play();
    };

    const startScrub = (e) => {
      isScrubbing.current = true;
      playAfterScrub.current = isPlaying;
      audio.pause();
      seek(e.clientX);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopScrub);
    bar.addEventListener("mousedown", startScrub);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopScrub);
      bar.removeEventListener("mousedown", startScrub);
    };
  }, [timebarRef.current]);

  const toggleAudio = React.useCallback(() => {
    if (audio.paused) {
      audio.play();
      return;
    }
    audio.pause();
  }, [audio.paused]);

  React.useEffect(() => {
    if (hoveringControls) {
      const timeout = setTimeout(() => {
        setControlsTooltip(() => (isPlaying ? "Pause" : endTime ? "Resume" : "Play"));
      }, 1000);
      const timeoutVolume = setTimeout(() => {
        setControlsTooltip(() => "Scroll for volume");
      }, 4000);
      return () => {
        clearTimeout(timeout);
        clearTimeout(timeoutVolume);
        setControlsTooltip(null);
      };
    }

    setControlsTooltip(null);
    return () => undefined;
  }, [hoveringControls, isPlaying]);

  React.useEffect(() => {
    setName(
      loading
        ? "This is Awakward"
        : "【8bitアレンジ】よふかしのうた 2期op Creepy Nuts 「Mirage」 / Call of the Night op song 8bit-cover",
    );
  }, [audio.src, loading]);

  React.useEffect(() => {
    const handlePlay = () => {
      setIsPlaying(() => true);
      const now = new Date();
      setStartTime(now);
      if (audio.duration) {
        setEndTime(new Date(now.getTime() + audio.duration * 1000));
      }
    };
    const handlePause = () => {
      setIsPlaying(() => false);
    };

    const handleLoadedMetadata = () => {
      if (startTime) {
        setEndTime(new Date(startTime.getTime() + audio.duration * 1000));
      }
    };
    const updateTime = () => {
      setCurrentTime(audio.currentTime * 1e3);
    };

    handlePlay();
    handlePause();
    handleLoadedMetadata();
    updateTime();

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [audio.src, loading]);

  return (
    <Cards setPath={setPath} popout={popout} path={path}>
      <div
        className={classNames("music-player", {
          isScrubbing: isScrubbing.current,
        })}
        key={`${loading}-${name}`}>
        <div
          key={`${audio.paused}`}
          className={classNames("music-player-wrapper", {
            "music-player-playing": isPlaying,
          })}>
          <div className="music-player-images">
            <img id="music-player-cover-image" src={BackgroundAudio.disc} />
            <div
              className="music-player-controls"
              onClick={toggleAudio}
              onWheel={(e) => {
                console.log(e);
              }}
              onMouseOver={() => setHoveringControls(true)}
              onMouseLeave={() => setHoveringControls(false)}
              data-tooltip={controlsTooltip}>
              <img
                id="music-player-play"
                className="music-player-control"
                src={isPlaying ? BackgroundAudio.pause : BackgroundAudio.play}
              />
            </div>
          </div>

          <div className="music-player-info">
            <div id="music-player-name">{name}</div>
            <div id="music-player-detail">
              {loading ? "「Fetching User Data」" : "「By - まつもり / Matsumori」"}
            </div>
          </div>
        </div>
        <Timebar
          className={classNames("timebarScrubable", {
            hidden: loading || !endTime,
          })}
          paused={!isPlaying}
          curr={currentTime}
          end={endTime}
          start={startTime}
          containerRef={timebarRef}
        />
      </div>
    </Cards>
  );
});
