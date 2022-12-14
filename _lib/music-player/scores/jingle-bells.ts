import { midiToFreq } from "../midi-notes.ts";

const score = [
  { note: 48, duration: 500 },
  { note: 57, duration: 500 },
  { note: 55, duration: 500 },
  { note: 53, duration: 500 },

  { note: 48, duration: 1500 },
  { note: 48, duration: 250 },
  { note: 48, duration: 250 },
  
  { note: 48, duration: 500 },
  { note: 57, duration: 500 },
  { note: 55, duration: 500 },
  { note: 53, duration: 500 },

  { note: 50, duration: 2000 },

  { note: 50, duration: 500 },
  { note: 58, duration: 500 },
  { note: 57, duration: 500 },
  { note: 55, duration: 500 },

  { note: 52, duration: 2000 },

  { note: 60, duration: 500 },
  { note: 60, duration: 500 },
  { note: 58, duration: 500 },
  { note: 55, duration: 500 },
  { note: 57, duration: 2000 },

  // Second stanza
  { note: 48, duration: 500 },
  { note: 57, duration: 500 },
  { note: 55, duration: 500 },
  { note: 53, duration: 500 },

  { note: 48, duration: 1500 },
  { note: 48, duration: 250 },
  { note: 48, duration: 250 },

  { note: 48, duration: 500 },
  { note: 57, duration: 500 },
  { note: 55, duration: 500 },
  { note: 53, duration: 500 },

  { note: 50, duration: 2000 },

  { note: 50, duration: 500 },
  { note: 58, duration: 500 },
  { note: 57, duration: 500 },
  { note: 55, duration: 500 },

  { note: 60, duration: 500 },
  { note: 60, duration: 500 },
  { note: 60, duration: 500 },
  { note: 60, duration: 500 },

  { note: 62, duration: 500 },
  { note: 60, duration: 500 },
  { note: 58, duration: 500 },
  { note: 55, duration: 500 },

  { note: 53, duration: 1000 },
  { note: 60, duration: 1000 },

  // Chorus pt 1
  { note: 57, duration: 500 },
  { note: 57, duration: 500 },
  { note: 57, duration: 1000 },

  { note: 57, duration: 500 },
  { note: 57, duration: 500 },
  { note: 57, duration: 1000 },

  { note: 57, duration: 500 },
  { note: 60, duration: 500 },
  { note: 53, duration: 750 },
  { note: 55, duration: 250 },

  { note: 57, duration: 2000 },

  { note: 58, duration: 500 },
  { note: 58, duration: 500 },
  { note: 58, duration: 750 },
  { note: 58, duration: 250 },

  { note: 58, duration: 500 },
  { note: 57, duration: 500 },
  { note: 57, duration: 500 },
  { note: 57, duration: 250 },
  { note: 57, duration: 250 },

  { note: 57, duration: 500 },
  { note: 55, duration: 500 },
  { note: 55, duration: 500 },
  { note: 57, duration: 500 },

  { note: 55, duration: 1000 },
  { note: 60, duration: 1000 },

  // Chorus part 2
  { note: 57, duration: 500 },
  { note: 57, duration: 500 },
  { note: 57, duration: 1000 },

  { note: 57, duration: 500 },
  { note: 57, duration: 500 },
  { note: 57, duration: 1000 },

  { note: 57, duration: 500 },
  { note: 60, duration: 500 },
  { note: 53, duration: 750 },
  { note: 55, duration: 250 },

  { note: 57, duration: 2000 },

  { note: 58, duration: 500 },
  { note: 58, duration: 500 },
  { note: 58, duration: 750 },
  { note: 58, duration: 250 },

  { note: 58, duration: 500 },
  { note: 57, duration: 500 },
  { note: 57, duration: 500 },
  { note: 57, duration: 250 },
  { note: 57, duration: 250 },

  { note: 60, duration: 500 },
  { note: 60, duration: 500 },
  { note: 58, duration: 500 },
  { note: 55, duration: 500 },
  { note: 53, duration: 2000 },
];

export const notes = score.map((x) => x.note).map(midiToFreq);
export const durations = score.map((x) => x.duration);
console.log(durations);
