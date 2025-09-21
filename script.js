// Create confetti elements for background
function createConfetti(container, count = 50) {
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.style.position = 'absolute';
        piece.style.width = `${Math.random() * 10 + 5}px`;
        piece.style.height = piece.style.width;
        piece.style.background = `hsl(${Math.random() * 360}, 100%, 80%)`;
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.top = '-10px';
        piece.style.animationDelay = `${Math.random() * 5}s`;
        piece.style.animationDuration = `${Math.random() * 3 + 3}s`;
        container.appendChild(piece);
    }
}

// Initialize homepage confetti
const confettiContainer = document.querySelector('.confetti');
createConfetti(confettiContainer);

// Memory game logic
const gameBoard = document.getElementById('game-board');
const emojis = ['🎂', '🎉', '🎈', '🥳', '🎁', '🍰', '🎂', '🎉', '🎈', '🥳', '🎁', '🍰']; // 6 pairs
let shuffled = emojis.sort(() => 0.5 - Math.random());
let selected = [];
let matched = 0;

// Create game cards
shuffled.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-face front">${emoji}</div>
        <div class="card-face back"></div>
    `;
    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
});

// Handle card click
function handleCardClick(e) {
    const card = e.currentTarget;
    if (card.classList.contains('flipped') || selected.length === 2) return;
    
    card.classList.add('flipped');
    selected.push(card);

    if (selected.length === 2) {
        checkMatch();
    }
}

// Check for card match
function checkMatch() {
    const [card1, card2] = selected;
    const emoji1 = card1.querySelector('.front').textContent;
    const emoji2 = card2.querySelector('.front').textContent;

    if (emoji1 === emoji2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matched += 2;
        if (matched === emojis.length) {
            celebrate();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }
    selected = [];
}

// Celebrate on game completion
function celebrate() {
    const surprise = document.getElementById('surprise');
    surprise.style.display = 'flex';

    // Animate modal with GSAP
    gsap.from('.modal-content', { scale: 0, rotation: 360, duration: 1, ease: 'bounce.out' });

    // Additional confetti for celebration
    const celebConfetti = document.getElementById('celebration-confetti');
    createConfetti(celebConfetti, 100);
    setTimeout(() => celebConfetti.innerHTML = '', 5000); // Clean up after 5s
}

// Toggle sections
document.getElementById('start-game').addEventListener('click', () => {
    document.getElementById('homepage').classList.remove('active');
    document.getElementById('game').classList.add('active');
});

document.getElementById('back-home').addEventListener('click', () => {
    document.getElementById('game').classList.remove('active');
    document.getElementById('homepage').classList.add('active');
    resetGame();
});

document.getElementById('close-surprise').addEventListener('click', () => {
    document.getElementById('surprise').style.display = 'none';
    resetGame();
});

// Reset game
function resetGame() {
    gameBoard.innerHTML = '';
    shuffled = emojis.sort(() => 0.5 - Math.random());
    shuffled.forEach(emoji => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-face front">${emoji}</div>
            <div class="card-face back"></div>
        `;
        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
    matched = 0;
}
