export default interface ProfileData {
  avatar: string;
  discordStatus: string;
  username: string;
  displayName: string;
  status: string;
  age: number;
  activity: {
    hidden: boolean;
    activities: Array<{
      bigImage?: string;
      bigImageTitle?: string;
      smallImage?: string;
      smallImageTitle?: string;
      name?: string;
      state?: string;
      details?: string;
      type?: string;
      timestamps?: { start: number; end?: number };
    }>;
  };
}
