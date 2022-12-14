import { p5i } from "p5i";
import * as sketch from "lib/sketch/card.ts";
import { start as startSound, stop as stopSound, setTempo } from 'lib/music-player/music.ts';
import { timer } from 'lib/timer.ts';

const { mount } = p5i();

let soundPlaying = false;

function setupSound() {
  const soundToggle = document.querySelector('#sound-toggle') as Element;
  if (soundToggle === null) throw new Error('Button not found');

  function play() {
    if (soundPlaying) return;
    startSound();
    soundToggle.innerHTML = 'Stop Music';
    soundPlaying = true;
  }
  function stop() {
    if (!soundPlaying) return;
    stopSound();
    soundToggle.innerHTML = 'Play Music';
    soundPlaying = false;
  }
  function toggleSound () {
    if (soundPlaying) stop();
    else play();
  }
  soundToggle.addEventListener('click', toggleSound);
  stop();
  addEventListener('turkeySnaffled', () => {
    setTempo(220);
  })
  addEventListener('turkeyDropped', () => {
    setTempo(150);
  })
  setTempo(150);
}

function setupScore() {
  const scoreBox = document.querySelector('#score .time') as Element;
  addEventListener('timerchanged', ({ detail }) => {
    scoreBox.innerHTML = detail.toFixed(2);
  })
  timer.reset();
}

function startGame() {
  dispatchEvent(new CustomEvent('startGame'));
}

function setupStart() {
  const startButton = document.querySelector('#start');
  if (startButton === null) throw new Error("Start Button not found");
  const instructions = document.querySelector('#instructions') as HTMLElement;
  if (instructions === null) throw new Error("Start Button not found");

  function hideInstructions() {
    instructions.style.top = '-100vh';
    removeEventListener('startGame', hideInstructions);
  }
  addEventListener('startGame', hideInstructions);
  addEventListener('startGame', () => {
    document.getElementById('controls')?.scrollIntoView(true);
  })
  startButton.addEventListener('click', startGame)
  startButton.addEventListener('touchstart', startGame)
}

addEventListener("DOMContentLoaded", () => {
  mount(document.getElementById("cardCanvas"), sketch);
  setupSound();
  setupScore();
  addEventListener('cardLoaded', () => {
    setupStart();
  })
});
