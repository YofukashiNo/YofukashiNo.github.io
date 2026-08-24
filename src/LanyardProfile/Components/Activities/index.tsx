import React from "react";
import classNames from "classnames";
import Timebar from "@components/Timebar";
import Cards, { CardExtenderType } from "@components/Cards";
import { CardContext } from "@Utils";

import "./Activities.css";

export default React.memo(({ path, setPath, popout }: CardExtenderType) => {
  const {
    activity: { activities, hidden },
  } = CardContext.use();
  React.useEffect(() => {
    if (
      path.at(-1) !== "activities" &&
      !activities?.some(({ type, name }) => (type || name).toLowerCase() === path[2])
    )
      setPath(path.slice(0, -1));
  }, [activities]);

  if (path.at(-1) === "activities")
    return (
      <Cards
        setPath={setPath}
        popout={popout}
        path={path}
        containerClassName={classNames({ hidden })}>
        <div className="activities">
          <span className="activities-command">/{">"} ls -la</span>
          <ul className="activities-paths">
            {activities.map((e) => (
              <li
                key={e.type || e.name}
                onClick={() => setPath([...path, (e.type || e.name).toLowerCase()])}>
                &gt; {e.type?.toLowerCase() || e.name?.toLowerCase()}
              </li>
            ))}
          </ul>
        </div>
      </Cards>
    );

  const { bigImage, smallImage, name, state, details, timestamps, bigImageTitle, smallImageTitle } =
    activities?.find(({ type, name }) => (type || name).toLowerCase() === path[2]) ?? {};

  return (
    <Cards
      setPath={setPath}
      popout={popout}
      path={path}
      containerClassName={classNames("card", { hidden })}>
      <>
        <div className="activity-wrapper">
          <div className="activity-images">
            <img
              data-tooltip={bigImageTitle}
              id="activity-big-image"
              className={classNames({ hidden: !bigImage })}
              src={bigImage}
              alt={bigImageTitle}
            />
            <img
              data-tooltip={smallImageTitle}
              id="activity-small-image"
              className={classNames({ hidden: !smallImage })}
              src={smallImage}
              alt={smallImageTitle}
            />
          </div>

          <div className="activity-info">
            <div id="activity-name" className={classNames({ hidden: !name })}>
              {name}
            </div>
            <div id="activity-state" className={classNames({ hidden: !state })}>
              {state}
            </div>
            <div id="activity-detail" className={classNames({ hidden: !details })}>
              {details}
            </div>
            <Timebar
              className={classNames({ hidden: !timestamps?.start || timestamps?.end })}
              {...timestamps}
            />
          </div>
        </div>
        <Timebar className={classNames({ hidden: !timestamps?.end })} {...timestamps} />
      </>
    </Cards>
  );
});
