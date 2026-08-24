const audio = new Audio();
audio.loop = true;
audio.volume = 0.1;

export default (): HTMLAudioElement & { started?: boolean; current?: React.RefObject<unknown> } =>
  audio;
