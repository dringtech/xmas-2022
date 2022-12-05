import { p5i } from 'p5i';
import * as sketch from 'lib/sketch/card.ts';

const { mount } = p5i();

addEventListener('DOMContentLoaded', () => {
  mount(document.getElementById('cardCanvas'), sketch);
});