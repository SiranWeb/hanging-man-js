import Game from './Game.js';
import View from './View.js';
import words from './words.js';
import letters from './letters.js';

const root = document.querySelector('#root');

const game = new Game(words, letters).start();
new View(root, game).init();