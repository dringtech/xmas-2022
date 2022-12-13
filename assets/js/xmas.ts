import { p5i } from "p5i";
import * as sketch from "lib/sketch/card.ts";
import { start as startSound, stop as stopSound, setTempo } from 'lib/music-player/music.ts';
import { timer } from 'lib/timer.ts';

const { mount } = p5i();

function setupSound() {
  const soundToggle = document.querySelector('#sound-toggle');
  let soundPlaying = false;
  
  if (soundToggle === null) throw new Error('Button not found');

  const toggleSound = () => {
    if (soundPlaying) {
      stopSound();
      soundToggle.innerHTML = 'Play Music';
      return false;
    }
    startSound();
    soundToggle.innerHTML = 'Stop Music';
    return true;
  }
  soundToggle.addEventListener('click', () => {
    soundPlaying = toggleSound();
  });
}

function setupScore() {
  const scoreBox = document.querySelector('#score .time') as Element;
  self.addEventListener('timerchanged', ({ detail }) => {
    scoreBox.innerHTML = detail.toFixed(2);
  })
  timer.reset();
}

addEventListener("DOMContentLoaded", () => {
  setupSound();
  setupScore();
  mount(document.getElementById("cardCanvas"), sketch);
});
