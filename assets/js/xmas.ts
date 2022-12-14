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
  addEventListener('startGame', play);
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
  const { top } = controls.getBoundingClientRect()
  console.log(top, window.innerHeight);
  if ( top < window.innerHeight) {
    startGame();
    return;
  }

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
  mount(document.getElementById("cardCanvas"), sketch);
  setupSound();
  setupScore();
  addEventListener('cardLoaded', () => {
    setupObserver();
  })
});
