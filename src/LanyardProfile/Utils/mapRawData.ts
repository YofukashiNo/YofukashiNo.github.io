import Constants from "@Constants";
import Utils from "@Utils";
import type { LanyardData, ProfileData } from "@Types";

export default (rawData?: LanyardData): ProfileData => {
  const { discord_user, discord_status, activities = [], spotify } = rawData ?? {};
  const statusActivity = activities.find((activity) => activity.type === 4);
  const streaming = activities.some((activity) => activity.type === 1);

  const currentData: ProfileData = {
    avatar: `https://cdn.discordapp.com/avatars/${Constants.USER_ID}/${discord_user?.avatar}`,
    discordStatus: streaming ? "streaming" : discord_status,
    username: `@${discord_user?.username}`,
    displayName: discord_user?.display_name ?? "",
    age: Utils.calculateAge(Constants.DATE_OF_BIRTH),
    status:
      discord_status !== "offline" && statusActivity?.state ? statusActivity?.state || "" : "",
    activity: {
      hidden: discord_status === "offline" || !activities?.length,
      activities: activities.reduce(
        (acts, activity) => {
          if (
            activity.type == 4 ||
            activity.id?.startsWith("spotify") ||
            acts.some((a) => a.name === activity.name)
          )
            return acts;

          return [
            ...acts,
            {
              bigImage: Utils.getAssetURL(activity.assets?.large_image, activity.application_id),
              bigImageTitle: activity?.assets?.large_text,
              smallImage: Utils.getAssetURL(activity.assets?.small_image, activity.application_id),
              smallImageTitle: activity.assets?.small_text,
              name: activity?.name,
              state: activity?.state,
              details: activity?.details,
              timestamps: activity?.timestamps,
            },
          ];
        },
        [
          spotify && {
            bigImage: spotify?.album_art_url,
            bigImageTitle: spotify?.album,
            name: spotify.song,
            state: spotify.album,
            details: spotify.artist,
            timestamps: spotify?.timestamps,
            type: "spotify",
          },
        ].filter(Boolean),
      ),
    },
  };

  return currentData;
};
