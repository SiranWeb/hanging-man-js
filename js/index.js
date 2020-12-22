import Game from "./Game.js";

const letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
const words = ['test', 'qwerty'];

const game = new Game(words, letters).start();

console.log('wordLength: ', game.wordLength);

function testTry(letter) {
    game.tryLetter(letter);
    console.log('Status: ', game.status);
    console.log('usedLetters: ', game.usedLetters);
    console.log('unusedLetters: ', game.unusedLetters);
    console.log('guessedPlaces: ', game.guessedPlaces);
    console.log('mistakes: ', game.mistakes);
}

window.testTry = testTry;