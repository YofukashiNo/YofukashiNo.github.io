import React from "react";
import classNames from "classnames";
import Constants from "@Constants";
import { CardContext } from "@Utils";

import "./Cards.css";

export interface CardExtenderType {
  path: string[];
  setPath?: (e: string[]) => void;
  popout?: boolean;
}

interface CardType extends CardExtenderType {
  children: React.ReactElement;
  titleClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  containerRef?: React.LegacyRef<HTMLDivElement>;
}

export default React.memo(
  ({
    children,
    containerClassName,
    titleClassName,
    contentClassName,
    path,
    containerRef,
    setPath,
    popout,
  }: CardType) => {
    const { setPopout, popoutPath } = CardContext.use();
    const popable =
      setPopout &&
      (popoutPath.at(-1) !== path.at(-1) || popout) &&
      !["home", "loading"].includes(path.at(-1));
    return (
      <div className={classNames("cards-container", containerClassName)} ref={containerRef}>
        <div className={classNames("cards-title", titleClassName)}>
          <span>
            @{Constants.USER}{" "}
            {path.map((e) => (
              <span
                key={e}
                className={classNames({ "clickable-path": setPath && !popout })}
                onClick={
                  !popout && setPath
                    ? () =>
                        setPath([
                          ...path.splice(
                            0,
                            path.findIndex((p) => p === e),
                          ),
                          e,
                        ])
                    : undefined
                }>
                &gt; {e}{" "}
              </span>
            ))}
          </span>
          {popable && (
            <span
              key={path.at(-1)}
              className="cards-controls"
              data-tooltip={popout ? "close" : "popout"}
              onClick={() => {
                setPopout(popout ? [] : path);
                if (!popout) setPath(path.slice(0, -1));
              }}>
              {popout ? "X" : "^"}
            </span>
          )}
        </div>
        <div className={classNames("cards-content", contentClassName)}>{children}</div>
      </div>
    );
  },
);
