import React from "react";
import classNames from "classnames";
import Utils from "@Utils";

import "./Timebar.css";

export default React.memo(
  ({
    className,
    paused,
    start,
    end,
    curr,
    containerRef,
  }: {
    paused?: boolean;
    curr?: number;
    start: number;
    end?: number;
    className?: string;
    containerRef?: React.Ref<HTMLDivElement>;
  }) => {
    const [passedTime, setPassedTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);

    React.useEffect(() => {
      const duration = (end - start) / 1e3;
      setDuration(duration);
      const updateTime = () => {
        const passedSecs = (curr ?? Date.now() - start) / 1e3;

        setPassedTime(
          Number.isNaN(duration)
            ? Math.max(passedSecs, 0)
            : Math.max(Math.min(passedSecs, duration), 0),
        );
      };

      updateTime();
      if (!paused) {
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
      }
      return () => undefined;
    }, [start, end, paused, curr]);

    if (!end)
      return (
        <div className={classNames(className, "passedTime")}>
          Time elapsed - {Utils.humanReadableTime(passedTime)}
        </div>
      );

    return (
      <div ref={containerRef} className={classNames(className, "timebar-container")}>
        <div className="timebar-passedTime">{Utils.humanReadableTime(passedTime)}</div>
        <div className="timebar-mainBackground">
          <div
            className="timebar-main"
            style={{
              width: "".concat(`${100 * Math.max(Math.min(passedTime / duration, 1), 0)}`, "%"),
            }}
          />
        </div>
        <div className="timebar-duration">{Utils.humanReadableTime(duration)}</div>
      </div>
    );
  },
);
