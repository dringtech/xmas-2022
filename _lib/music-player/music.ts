import { ctx } from "./audio-context.ts";
import { Synth } from './synth.ts';

// import { notes, durations } from './scores/rudolph-the-red-nosed-reindeer.ts';
import { notes, durations } from './scores/jingle-bells.ts';

const synth = new Synth({
  attack: 0.005,
});

function* score() {
  let i = 0;
  while (true) {
    yield [notes[i % notes.length], durations[i % durations.length]];
    i++;
  }
}

const tune = score();
let playing = false;
let tempo = 1;

export function setTempo(newTempo) {
  tempo = 75/newTempo;
}

setTempo(120);

const playSequence = () => {
  if (!playing) return;
  const [ freq, duration ] = tune.next().value;
  synth.playNote(freq);
  const event = new CustomEvent('playnote', { detail: { freq, duration } })
  window.dispatchEvent(event);
  setTimeout(playSequence, duration * tempo);
}

export const start = () => {
  playing = true;
  ctx.resume();
  setTimeout(playSequence, 1000);
}

export const stop = () => {
  playing = false;
  ctx.suspend();
}
