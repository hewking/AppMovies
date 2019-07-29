
export const MAX_AUDIO_DURATION = 61; // 60s
export const MIN_AUDIO_DURATION = 1; // 1s

/**
 * 录音计时，权限控制
 */
export default class AudioController {

  private timer: number;
  private seconds: number;
  private overTimeCallback?: () => void;

  public reset = () => {
    this.seconds = 0;
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  public start = (calllback?: () => void) => {
    this.overTimeCallback = calllback;
    this.reset();
    this.next();
  }

  public stop = () => {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  public checkInTime: () => boolean = () => {
    return this.seconds < MAX_AUDIO_DURATION;
  }

  public checkApprove: () => boolean = () => {
    console.log(`audio checkApprove seconds: ${this.seconds} ${this.seconds >= MIN_AUDIO_DURATION}`);
    return this.seconds >= MIN_AUDIO_DURATION;
  }

  private next = () => {
    this.timer = setTimeout(() => {
      this.seconds += MIN_AUDIO_DURATION;
      if (!this.checkInTime() && this.overTimeCallback) {
        this.overTimeCallback();
        this.reset();
      }
      console.log(`audioController seconds: ${this.seconds}`);
      this.next();
    }, MIN_AUDIO_DURATION * 1000);
  }

}
