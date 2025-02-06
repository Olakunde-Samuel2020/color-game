const colors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
    '#FF00FF', '#00FFFF', '#FFA500', '#800080',
    '#008000', '#800000', '#008080', '#000080'
];

let score = 0;
let targetColor;

function generateRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function generateOptions(correctColor) {
    const options = [correctColor];
    while (options.length < 6) {
        const newColor = generateRandomColor();
        if (!options.includes(newColor)) {
            options.push(newColor);
        }
    }
    return options.sort(() => Math.random() - 0.5);
}

function showStatus(isCorrect) {
    const statusElement = document.getElementById('gameStatus');
    statusElement.textContent = isCorrect ? 'Correct!' : 'Wrong guess!';
    statusElement.className = isCorrect ? 'correct show' : 'wrong show';

    setTimeout(() => {
        statusElement.className = statusElement.className.replace('show', '');
    }, 1500);
}

function handleGuess(color) {
    if (color === targetColor) {
        score++;
        document.getElementById('score').textContent = `Score: ${score}`;
        showStatus(true);
    } else {
        showStatus(false);
    }

    setTimeout(initializeGame, 1500);
}

function createColorButton(color) {
    const button = document.createElement('button');
    button.className = 'color-option';
    button.setAttribute('data-testid', 'colorOption');
    button.style.backgroundColor = color;
    button.onclick = () => handleGuess(color);
    return button;
}

function initializeGame() {
    targetColor = generateRandomColor();
    const options = generateOptions(targetColor);
    
    document.getElementById('colorBox').style.backgroundColor = targetColor;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    options.forEach(color => {
        optionsContainer.appendChild(createColorButton(color));
    });

    document.getElementById('gameStatus').className = '';
}

// Modify the new game button click handler to reset score
document.getElementById('newGameButton').onclick = () => {
    score = 0; // Reset score to zero
    document.getElementById('score').textContent = 'Score: 0';
    initializeGame();
};

// Start the game
initializeGame();
