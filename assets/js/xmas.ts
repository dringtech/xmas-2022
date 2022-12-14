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
      soundPlaying = false;
      return;
    }
    startSound();
    soundToggle.innerHTML = 'Stop Music';
    soundPlaying = true;
    return
  }
  soundToggle.addEventListener('click', () => {
    soundPlaying = toggleSound();
  });
  soundToggle.addEventListener('touchstart', () => {
    soundPlaying = toggleSound();
  });
  addEventListener('startGame', toggleSound);
}

function setupScore() {
  const scoreBox = document.querySelector('#score .time') as Element;
  addEventListener('timerchanged', ({ detail }) => {
    scoreBox.innerHTML = detail.toFixed(2);
  })
  timer.reset();
}

function startGame() {
  console.log('Starting');
  dispatchEvent(new CustomEvent('startGame'));
}

function setupObserver() {
  const controls = document.querySelector('#controls');
  if (controls === null) throw new Error("Controls not defined");
  // Observer options.
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.7,
  };
  // Callback function executed during observe.
  const callback = function( entries: IntersectionObserverEntry[], observer: IntersectionObserver ) {
    const observedItem = entries[0];
    if (observedItem.isIntersecting) {
      startGame();
      observer.unobserve(controls);
    }
  };

  // Construct Intersection Observer.
  const observer = new IntersectionObserver( callback, options );

  // Observe if element is present.
  if ( controls ) {
    observer.observe( controls );
  }
}

addEventListener("DOMContentLoaded", () => {
  setupSound();
  setupScore();
  setupObserver();
  mount(document.getElementById("cardCanvas"), sketch);
});
