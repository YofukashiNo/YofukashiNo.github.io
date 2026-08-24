import Cards from "@components/Cards";
import Loading from "@components/Loading";
import Utils, { CardContext } from "@Utils";

import "./UserProfile.css";

export default () => {
  const { avatar, discordStatus, displayName, username, status, loading } = CardContext.use();

  if (loading) return <Loading />;

  return (
    <Cards path={["home"]}>
      <div className="user-profile">
        <div className="profile-pic">
          <img id="pfp" src={avatar} alt="" />
          <div className="status-dot-container">
            <div
              id="status-dot"
              data-tooltip={discordStatus}
              aria-label={discordStatus}
              style={Utils.getStatusStyles(discordStatus)}
            />
          </div>
        </div>
        <div className="user-info">
          {displayName ? (
            <>
              <div id="display-name">{displayName}</div>
              <div id="username-secondary">{username}</div>
            </>
          ) : (
            <div id="username">{username}</div>
          )}
          <div id="status">{status}</div>
          <div
            id="status2"
            style={{
              color: Utils.getStatusStyles(discordStatus).color,
            }}>
            {discordStatus !== "offline" ? discordStatus : "unknown"}
          </div>
        </div>
      </div>
    </Cards>
  );
};
