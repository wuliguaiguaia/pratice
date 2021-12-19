class FPSMonitor {
  constructor(monitor) {
    if (!monitor) {
      throw new Error('Invalid argument "monitor"');
    }
    this.timer = null;
    this.ended = false;
    this.rememberFpsList = [];
    this.monitor = monitor;
  }

  now() {
    return (performance || new Date()).now();
  }

  start() {
    const times = [];
    let lastTime = this.now();

    const refreshLoop = () => {
      const now = this.now();
      while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
      }
      times.push(now);
      if (this.ended) {
        this.ended = false;
        return;
      }
      if (now - lastTime >= 1000) {
        try {
          console.log(times.length, '++++++');
          this.monitor(times.length);
        } catch (e) {
          console.error(e);
        }
        lastTime = now;
      }
      requestAnimationFrame(refreshLoop);
    };

    this.timer = requestAnimationFrame(refreshLoop);
  }

  stop() {
    cancelAnimationFrame(this.timer);
    console.log('stopped FPS');
    this.ended = true;
  }

  isBlocking(fps, below = 10, last = 5) {
    if (this.rememberFpsList.length >= last) {
      this.rememberFpsList.shift();
    }
    this.rememberFpsList.push(fps);
    if (this.rememberFpsList.length < last) {
      return false;
    }
    if (this.rememberFpsList.find(item => item > below)) {
      return false;
    }
    this.rememberFpsList = [];
    return true;
  }
}

export default FPSMonitor
