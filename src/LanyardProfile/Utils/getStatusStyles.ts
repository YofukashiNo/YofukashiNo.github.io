import { Status } from "@Assets";

export default (
  discordStatus: string,
): {
  background?: string;
  title?: string;
  color?: string;
  opacity?: number;
  mask?: string;
} => {
  switch (discordStatus) {
    case "online":
      return {
        background: "#3ba45d",
        title: "Online",
        color: "#3ba45d",
        opacity: 1,
        mask: `url("${Status.online}") no-repeat`,
      };
    case "dnd":
      return {
        background: "#ed4245",
        title: "Do not disturb",
        color: "#ed4245",
        opacity: 1,
        mask: `url("${Status.dnd}") no-repeat`,
      };
    case "idle":
      return {
        background: "#faa81a",
        title: "Idle",
        color: "#faa81a",
        opacity: 1,
        mask: `url("${Status.idle}") no-repeat`,
      };
    case "streaming":
      return {
        background: "#9147ff",
        title: "Streaming",

        color: "#9147ff",
        opacity: 1,
        mask: `url("${Status.stream}") no-repeat`,
      };
    case "offline":
      return {
        background: "#747e8c",
        title: "Offline",
        color: "#747e8c",
        opacity: 0.5,
        mask: `url("${Status.offline}") no-repeat`,
      };

    default:
      return {};
  }
};
