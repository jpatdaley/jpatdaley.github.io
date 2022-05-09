const cards = document.querySelectorAll('.five-memory-card')
const scoreBoard = document.querySelector(".scoreBoard")

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let cardsWon = 0

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');

    if(!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
        // second click 
        secondCard = this;

        checkForMatch()
    }


function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();

    // monitoring score
    cardsWon += 1
    scoreBoard.innerHTML = cardsWon;
}

function unFlipCards() {
    lockBoard = true;

    setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard()
    }, 1600);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})();

cards.forEach(card => card.addEventListener('click', flipCard))