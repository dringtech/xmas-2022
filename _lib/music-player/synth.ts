import { ctx } from './audio-context.ts';

interface SynthOptions {
  attack: number;
}

export class Synth {
  attack: number;
  dist: WaveShaperNode;

  constructor({
    attack
  }: Partial<SynthOptions> = {}) {
    this.attack = attack || 0.01;
    this.dist = ctx.createWaveShaper();
    const limiter = ctx.createDynamicsCompressor();
    limiter.connect(ctx.destination);
    this.dist.connect(limiter);

    this.dist.curve = Synth.makeDistortionCurve(10);
    this.dist.oversample = '4x';

  }

  static makeDistortionCurve(amount: number) {
    const k = typeof amount === 'number' ? amount : 50;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0 ; i < n_samples; ++i ) {
      const x = i * 2 / n_samples - 1;
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
  }
  
  playNote(freq: number) {
    const startTime = ctx.currentTime;
    const endTime = startTime + 0.5;

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, startTime);
    env.gain.exponentialRampToValueAtTime(0.1, startTime + this.attack);
    env.gain.exponentialRampToValueAtTime(0.0001, endTime);
    env.connect(this.dist);

    const osc = ctx.createOscillator();
    osc.type = 'triangle';

    osc.frequency.setValueAtTime(freq, startTime);
    osc.connect(env);

    osc.start(startTime);
    osc.stop(endTime);
  }
}