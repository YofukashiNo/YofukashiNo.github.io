export default (asset?: string, appId?: string): string => {
  // https://jsdate.wtf
  if (!asset || asset === "mp:undefined") return "";

  if (asset?.includes("external"))
    return asset.replace("mp:external", "https://media.discordapp.net/external");

  if (asset?.startsWith("mp:attachments"))
    return asset.replace("mp:attachments", "https://cdn.discordapp.com/attachments");

  if (asset.startsWith("mp:banners")) {
    return asset.replace("mp:banners", "https://cdn.discordapp.com/banners");
  }
  if (asset?.startsWith("twitch:"))
    return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${asset?.replace(
      "twitch:",
      "",
    )}-640x480.jpg`;

  return `https://cdn.discordapp.com/app-assets/${appId}/${asset}.png`;
};

//
