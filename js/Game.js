export default class Game {
    constructor(_words, _letters) {
        this.#words = _words;
        this.#letters = _letters;
    }

    // public:
    get status() { return this.#status }
    get usedLetters() { return this.#usedLetters }
    get letters() { return this.#letters }
    get unusedLetters() { return this.#unusedLetters }
    get guessedPlaces() { return this.#guessedPlaces }
    get wordLength() { return this.#currentWord.length }
    get mistakes() { return this.#mistakes }
    get guessedWord() { return this.#guessedWord }

    start() {
        const randIndex = Math.floor(Math.random() * this.#words.length);
        this.#currentWord = this.#words[randIndex];
        this.#mistakes = 0;
        this.#status = 0;
        this.#usedLetters = [];
        this.#unusedLetters = [...this.#letters];
        this.#guessedPlaces = [];
        this.#guessedWord = '';
        for (let i = 0; i < this.wordLength; i++) {
            this.#guessedWord += '_'; // not supported by lemonade_standregular font. Fixed by border-bottom
        }
        return this;
    }

    tryLetter(letter) {
        if (this.#status !== 0) return;
        if (letter.length !== 1) return;
        if (this.#usedLetters.some( item => item === letter )) return;
        if (!this.#letters.some( item => item === letter )) return;

        this.#addUsedLetter(letter);
        this.#removeUnusedLetter(letter);

        const letterGuessedPlaces = this.#wordContain(letter);
        if (letterGuessedPlaces.length !== 0) {
            this.#addGuessedPlaces(letterGuessedPlaces);
            this.#updateGuessedWord();
            if (this.#isWin()) this.#setStatus(2);
        } else {
            this.#increaseMistakes();
            if (this.#isLose()) this.#setStatus(1);
        }
    }

    // private:
    #words;
    #letters;
    #usedLetters;
    #unusedLetters;
    #guessedPlaces;
    #guessedWord;
    #status; // 0 - in game, 1 - lose, 2 - win
    #currentWord;

    #maxMistakes = 6;
    #mistakes;

    #addUsedLetter(letter) {
        this.#usedLetters.push(letter);
    }

    #removeUnusedLetter(letter) {
        const index = this.#unusedLetters.indexOf(letter);
        this.#unusedLetters.splice(index, 1);
    }

    #wordContain(letter) {
        const indexes = [];
        this.#currentWord.split('').forEach((item, index) => {
            return item === letter ? indexes.push(index) : null;
        });
        return indexes;
    }

    #addGuessedPlaces(indexes) {
        this.#guessedPlaces.push(...indexes);
        this.#guessedPlaces.sort((a, b) => a < b ? -1 : 1);
    }

    #updateGuessedWord() {
        this.#guessedWord = this.#guessedWord.split('');
        this.#guessedPlaces.forEach(index => {
            this.#guessedWord[index] = this.#currentWord[index];
        })
        this.#guessedWord = this.#guessedWord.join('');
    }

    #increaseMistakes() {
        this.#mistakes++;
    }

    #setStatus(type) {
        this.#status = type;
    }

    #isLose() {
        return this.#mistakes >= this.#maxMistakes;
    }

    #isWin() {
        return this.#currentWord.length === this.#guessedPlaces.length;
    }
}