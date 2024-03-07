class Snake {
   
    constructor(game) {
        this.game = game;
        this.reset();
    }

    setDirection(x, y) {
        this.direction = {x, y};
    }

    move() {
        const head = {x: this.bodyPositions[0].x + this.direction.x, y: this.bodyPositions[0].y + this.direction.y};
        this.bodyPositions.unshift(head);

        const food = this.game.foods.find(food => food.x === head.x && food.y === head.y);
        if (food) {
            this.eat(food);
            this.game.updateScoreDisplay();
        } else {
            this.bodyPositions.pop();
        }
        if (head.x < 0 || head.x >= this.game.areaSize || head.y < 0 || head.y >= this.game.areaSize || 
            this.bodyPositions.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
            alert("Game Over! Score: " + this.score);
            this.reset();
        }
        //print snake's body location
        console.log(this.bodyPositions);

        this.game.updateGameArea();
    }

    reset() {
        this.bodyPositions = [{x:1, y:0},{x: 0, y: 0}];
        this.bodyValues = ["C", "-"];
        this.direction = {x: 1, y: 0};
        this.score = 0;
        this.game.updateScoreDisplay();
    }

    eat(food) {
        if(food.value==='C'){
            console.log("Eating C");
            let lastCIndex = this.bodyValues.lastIndexOf('C');
            if (! /^-?\d+(\.\d+)?$/.test(this.bodyValues[lastCIndex + 1])) {
                //if no number after the last C, insert it before '-'
                let cCount = this.bodyValues.filter(v => v === 'C').length;
                this.bodyValues.splice(lastCIndex + 1, 0, ''+(cCount+1));
                //increase the snake's length by 1 according to the direction
                let lastSegment = this.bodyPositions[this.bodyPositions.length - 1];
                let newSegment = {x: lastSegment.x - this.direction.x, y: lastSegment.y - this.direction.y};
                this.bodyPositions.push(newSegment);
            } else {
                //Already a number after the last C, so change it to int and increase it by 1
                let cCount = parseInt(this.bodyValues[lastCIndex + 1]);
                this.bodyValues[lastCIndex + 1] = ''+(cCount+1);
            }
        } else {
            console.log("Eating H");
            let lastHIndex = this.bodyValues.lastIndexOf('H');
            
            if (lastHIndex === -1) {
                //if no H, insert it before '-'
                let lastDashIndex = this.bodyValues.lastIndexOf('-');
                this.bodyValues.splice(lastDashIndex, 0, 'H');  
            } else if (! /^-?\d+(\.\d+)?$/.test(this.bodyValues[lastHIndex + 1])){
                //insert the H count between the last H and the - after it
                let hCount = this.bodyValues.filter(v => v === 'H').length;
                this.bodyValues.splice(lastHIndex + 1, 0, ''+(hCount+1));
                //increase the snake's length by 1 according to the direction
                let lastSegment = this.bodyPositions[this.bodyPositions.length - 1];
                let newSegment = {x: lastSegment.x - this.direction.x, y: lastSegment.y - this.direction.y};
                this.bodyPositions.push(newSegment);
            } else {
                //Already a number after the last H, so change it to int and increase it by 1
                let hCount = parseInt(this.bodyValues[lastHIndex + 1]);
                this.bodyValues[lastHIndex + 1] = ''+(hCount+1);
            }
        }
        this.game.score++;
        this.game.removeFood(food);
    }
 
}
