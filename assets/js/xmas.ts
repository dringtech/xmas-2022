import { p5i } from 'p5i';
import { setup, draw, windowResized, mouseMoved } from 'lib/sketch/card.ts';

const { mount } = p5i();

addEventListener('DOMContentLoaded', () => {
  mount(document.getElementById('cardCanvas'), { setup, draw, windowResized, mouseMoved });
});