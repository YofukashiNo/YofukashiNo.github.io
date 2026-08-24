import React from "react";
import Constants from "@Constants";
import Assets from "@Assets";
import Utils, { CardContext } from "@Utils";
import UserProfile from "@components/UserProfile";
import Info from "@components/Info";
import { LanyardData, ProfileData } from "@Types";
import "./LanyardProfile.css";

export default React.memo(() => {
  const audio = Utils.getAudio();
  const [rawData, setRawData] = React.useState<LanyardData>();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [profileData, setProfileData] = React.useState<ProfileData>({
    avatar: Assets.loader,
    discordStatus: "",
    displayName: "",
    username: "",
    status: "",
    age: 0,
    activity: {
      hidden: true,
      activities: [],
    },
  });
  const SocketConstants = React.useRef<{
    heartbeat?: NodeJS.Timeout | null;
    socket?: WebSocket | null;
  }>({});

  React.useEffect(() => {
    const connectWebsocket = () => {
      if (SocketConstants.current.heartbeat) clearInterval(SocketConstants.current.heartbeat);
      SocketConstants.current.socket = new WebSocket(`wss://${Constants.API_URL}/socket`);

      setLoading(true);

      SocketConstants.current.socket.addEventListener("open", () => {
        SocketConstants.current.socket!.send(
          JSON.stringify({
            op: 2,
            d: {
              subscribe_to_id: Constants.USER_ID,
            },
          }),
        );
        SocketConstants.current.heartbeat = setInterval(() => {
          SocketConstants.current.socket!.send(
            JSON.stringify({
              op: 3,
            }),
          );
        }, Constants.HEARTBEAT_INTERVAL);
      });

      SocketConstants.current.socket.addEventListener("message", ({ data }) => {
        const { t, d } = JSON.parse(data) as {
          t: "INIT_STATE" | "PRESENCE_UPDATE";
          d: LanyardData;
        };
        if (t === "INIT_STATE" || t === "PRESENCE_UPDATE") {
          setRawData(d || {});
          if (loading && Object.keys(d).length !== 0) setLoading(false);
        }
      });

      SocketConstants.current.socket.addEventListener("close", connectWebsocket);
    };

    connectWebsocket();

    return () => {
      clearInterval(SocketConstants.current.heartbeat);
      SocketConstants.current.socket!.removeEventListener("close", connectWebsocket);
      SocketConstants.current.socket!.close();
    };
  }, []);

  React.useEffect(() => {
    try {
      const currentData = Utils.mapRawData(rawData);
      setProfileData((prevData) => ({
        ...prevData,
        ...currentData,
      }));
    } catch (err) {
      console.error(err);
    }
  }, [rawData, loading]);

  const [popoutPath, setPopout] = React.useState(["info", "music"]);

  return (
    <div
      className="wrapper"
      onClick={() => {
        if (audio.started) return;
        audio.started = true;
        audio.play();
      }}>
      <span className="container">
        <CardContext.Provider value={{ ...profileData, popoutPath, setPopout, loading }}>
          <UserProfile />
          <Info key={`popout-${popoutPath}`} popout={true} />
          <Info key={"static"} {...profileData} />
        </CardContext.Provider>
      </span>
    </div>
  );
});
