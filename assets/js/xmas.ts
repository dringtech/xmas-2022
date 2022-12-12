import { p5i } from "p5i";
import * as sketch from "lib/sketch/card.ts";
import { start as startSound, stop as stopSound, setTempo } from 'lib/music-player/music.ts';
import { timer } from 'lib/timer.ts';

const { mount } = p5i();

function setupSound() {
  const soundToggle = document.querySelector('#sound-toggle');
  let soundPlaying = false;
  
  if (soundToggle !== null) {
    soundToggle.addEventListener('click', () => {
      console.log('Togglin ' + soundPlaying);
      soundPlaying = toggleSound();
    });  
  }
  
  const toggleSound = () => {
    if (soundPlaying) {
      stopSound();
      return false;
    }
    startSound();
    return true;
  }
}

function setupScore() {
  const scoreBox = document.getElementById('score') as Element;
  self.addEventListener('timerchanged', ({ detail }) => {
    scoreBox.innerHTML = detail.toFixed(2) + ' s';
  })
  timer.reset();
}

addEventListener("DOMContentLoaded", () => {
  setupSound();
  setupScore();
  mount(document.getElementById("cardCanvas"), sketch);
});
