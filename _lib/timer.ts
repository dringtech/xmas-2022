class StreakTimer {
  time: number;
  timer: number | null;
  resolution: number;
  constructor() {
    this.time = 0;
    this.resolution = 0.01;
    this.timer = null;
    addEventListener('turkeySnaffled', () => this.start());
    addEventListener('turkeyDropped', () => this.stop());
  }
  start() {
    this.reset();
    this.timer = setInterval(() => {
      this.time++;
      this.broadcast();

    }, this.resolution * 1000);
  }
  private broadcast() {
    dispatchEvent(new CustomEvent('timerchanged', { detail: this.time * this.resolution }))
  }
  stop() {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
  reset() {
    this.stop();
    this.time = 0;
    this.broadcast();
  }
}

export const timer = new StreakTimer();