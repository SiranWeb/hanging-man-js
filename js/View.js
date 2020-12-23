export default class View {
    constructor(_rootElem, _game) {
        this.#rootElem = _rootElem;
        this.#game = _game;
        this.#hmWordElem = this.#rootElem.querySelector('#hm-word');
        this.#hmLettersElem = this.#rootElem.querySelector('#hm-letters');
        this.#hmResultElem = this.#rootElem.querySelector('#hm-result');
        this.#hmGibbet = this.#rootElem.querySelector('#hm-gibbet').contentDocument.querySelector('#human-group');
    }

    // public:
    init() {
        this.#updateLetters();
        this.#updateWord();
        return this;
    }

    // private:
    #game;
    #rootElem;
    #hmWordElem;
    #hmLettersElem;
    #hmResultElem;
    #hmGibbet;
    #humanVectors = [
        '<ellipse stroke="blue" ry="44" rx="44" cy="150" cx="300" stroke-width="3" fill="none"/>',
        '<ellipse stroke="blue" ry="75" rx="35" cy="270" cx="300" stroke-width="3" fill="none"/>',
        '<line stroke="blue" y1="212" x1="277" y2="320" x2="240" stroke-width="3" fill="none"/>',
        '<line stroke="blue" y1="212" x1="323" y2="320" x2="361" stroke-width="3" fill="none"/>',
        '<line stroke="blue" y1="342" x1="303" y2="430" x2="335" stroke-width="3" fill="none"/>',
        '<line stroke="blue" y1="342" x1="295" y2="430" x2="265" stroke-width="3" fill="none"/>'
    ];

    #updateLetters() {
        this.#hmLettersElem.innerHTML = '';
        this.#game.letters.forEach(letter => {
            const elem = document.createElement('div');
            elem.classList.add('hm-letter');
            if (this.#game.usedLetters.some(item => item === letter)) {
                elem.classList.add('hm-unavailable');
            } else {
                elem.classList.add('hm-available');
            }
            elem.innerText = letter;
            elem.addEventListener('click', () => {
                this.#game.tryLetter(letter);
                this.#updateLetters();
                this.#updateWord();
                this.#updateGibbet();
                this.#updateResult();
            });
            this.#hmLettersElem.appendChild(elem);
        })
    }

    #updateWord() {
        this.#hmWordElem.innerHTML = '';
        this.#game.guessedWord.split('').forEach(letter => {
            const elem = document.createElement('span');
            elem.classList.add('hm-word-letter');
            if (letter === '_') {
                elem.classList.add('hm-hidden');
            } else {
                elem.classList.add('hm-showed');
            }
            elem.innerText = letter;
            this.#hmWordElem.appendChild(elem);
        })
    }

    #updateGibbet() {
        if (this.#game.mistakes === 0) return;
        this.#hmGibbet.innerHTML += this.#humanVectors[this.#game.mistakes - 1];
    }

    #clearGibbet() {
        this.#hmGibbet.innerHTML = '';
    }

    #updateResult() {
        this.#hmResultElem.innerHTML = '';
        if (this.#game.status) {
            const answer = this.#game.currentWord;
            const p = document.createElement('p');
            p.classList.add('hm-answer');
            p.innerHTML = answer;
            const btn = document.createElement('button');
            btn.classList.add('hm-restart');
            btn.innerHTML = 'Restart';
            btn.addEventListener('click', () => {
               this.#game.start();
               this.init();
               this.#clearGibbet();
               this.#updateResult();
            });
            this.#hmResultElem.appendChild(p);
            this.#hmResultElem.appendChild(btn);
        }
    }
}
