
import midilib from 'npm:@tonejs/midi';

const midiData = Deno.readFileSync('JingleBells.mid');

const midi = new midilib.Midi(midiData);
console.log(midi.tracks[0]);

const extractMidiNoteData = (n) => ({
  note: n.midi,
  duration: n.ticks,
});
function createNoteSteps(score, {note, velocity, duration}) {
  const length = duration;
  const rests = Array.from({ length }, () => ({ n: 0 }));
  return [...score, {n: note, v: velocity, l: duration}, ...rests];
}

console.log(midi.tracks[0].notes.map(extractMidiNoteData));

const score = midi.tracks[0].notes.map(extractMidiNoteData);

Deno.writeTextFileSync('scores/jingle-bells.json', JSON.stringify(score));