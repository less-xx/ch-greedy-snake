class Game {
    constructor() {
        this.areaSize = 40;
        this.gameArea = [];
        this.foods = [];
        this.foodCount = 10;
        this.foodTypes = ['C', 'H'];
        this.speed = 200; // Milliseconds
        this.score = 0;
        this.snake = new Snake(this);
    }

    initGame() {
        const gameAreaElement = document.getElementById('gameArea');
        gameAreaElement.innerHTML = ''; // Clear the game area
        for (let y = 0; y < this.areaSize; y++) {
            for (let x = 0; x < this.areaSize; x++) {
                const cellElement = document.createElement('div');
                this.gameArea.push({x, y, element: cellElement});
                gameAreaElement.appendChild(cellElement);
            }
        }
        // randomly place the snake
        this.snake.bodyPositions[0].x = Math.floor(Math.random() * this.areaSize);
        this.snake.bodyPositions[1].x = this.snake.bodyPositions[0].x + 1;
    
        document.addEventListener('keydown', (event) => this.changeDirection(event));

        this.placeFoods();
        this.updateGameArea();
        //setInterval(moveSnake, speed);
        
    }

    placeFood(foodValue) {
        let food;
        do {
            food = {
                x: Math.floor(Math.random() * this.areaSize),
                y: Math.floor(Math.random() * this.areaSize),
                value: foodValue || 'C'
            };
        } while (this.snake.bodyPositions.some(segment => segment.x === food.x && segment.y === food.y));
        this.foods.push(food);
    }

    placeFoods() {
        //randomly place different food types at different locations
        for (let i = 0; i < this.foodCount; i++) {
            let foodValue = this.foodTypes[Math.floor(Math.random() * this.foodTypes.length)];
            this.placeFood(foodValue);
        }
    }

    removeFood(food) {
        this.foods = this.foods.filter(f => f !== food);
    }

    updateScoreDisplay() {
        document.getElementById('scorePanel').textContent = 'Score: ' + this.score;
    }

    updateGameArea() {
        this.gameArea.forEach(cell => {
            cell.element.className = '';
            cell.element.textContent = '';
        });
        this.snake.bodyPositions.forEach((segment, index) => {
            const segmentElement = this.gameArea.find(cell => cell.x === segment.x && cell.y === segment.y).element;
            segmentElement.className = 'snake-body';
            segmentElement.textContent = this.snake.bodyValues[index];
        });
        this.foods.forEach(food => {
            const foodElement = this.gameArea.find(cell => cell.x === food.x && cell.y === food.y).element;
            foodElement.className = 'food';
            foodElement.textContent = food.value;
        });
    }

    moveSnake(direction) {
        this.snake.setDirection(direction.x, direction.y);
        this.snake.move();
    }

    changeDirection(event) {
        const keyPressed = event.key;
        if (keyPressed === 'ArrowUp') this.moveSnake({x: 0, y: -1});
        if (keyPressed === 'ArrowDown') this.moveSnake({x: 0, y: 1});
        if (keyPressed === 'ArrowLeft') this.moveSnake({x: -1, y: 0});
        if (keyPressed === 'ArrowRight') this.moveSnake({x: 1, y: 0});
    }

}

function setupControls(game) {
    document.getElementById('up').addEventListener('click', () => game.moveSnake({x: 0, y: -1}));
    document.getElementById('down').addEventListener('click', () => game.moveSnake({x: 0, y: 1}));
    document.getElementById('left').addEventListener('click', () => game.moveSnake({x: -1, y: 0}));
    document.getElementById('right').addEventListener('click', () => game.moveSnake({x: 1, y: 0}));
}

document.addEventListener("DOMContentLoaded", () => {
    const game = new Game();
    game.initGame();
    //game.start();
    setupControls(game);
});
