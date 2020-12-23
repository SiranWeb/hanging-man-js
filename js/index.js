import Game from './Game.js';
import View from './View.js';

const letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
const words = ['test', 'qwerty'];
const root = document.querySelector('#root');

const game = new Game(words, letters).start();
new View(root, game).init();