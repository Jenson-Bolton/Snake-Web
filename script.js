// get Colours
var mainColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color');
var bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');

// Initialize canvas
var c = document.querySelector('canvas'); // change to get by ID, later
c.width = parseInt(getComputedStyle(document.getElementById('canvas-container')).getPropertyValue('width'));
c.height = parseInt(getComputedStyle(document.getElementById('canvas-container')).getPropertyValue('height'));
var ctx = c.getContext('2d');
ctx.fillStyle = mainColor;
var unit = c.width/40;
// ctx.fillRect(unit, unit, unit, unit);

var center = {
    'x': parseInt((c.width/unit)/2), 
    'y': parseInt((c.height/unit)/2)
};

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

class Body {
    constructor(x, y) {
        this.coords = {
            'x': x,
            'y': y
        };
        this.color = mainColor;
    }
}

class Head {
    constructor() {
        this.coords = center;
        this.color = '#F1A5FF';
    }
}

class Snake {
    constructor() {
        this.body = [new Head(), new Body(center.x, center.y+1), new Body(center.x, center.y+2)];
        this.direction = 'up';
        this.length = 3;
        this.lastTailCoords = {
            'x': null,
            'y': null
        };
    }

    get head() {
        return this.body[0].coords;
    }

    clear() {        
        for (let i = 0; i < this.length; i++) {
            ctx.clearRect(this.body[i].coords.x * unit,
                this.body[i].coords.y * unit,
                unit,
                unit);
        }
        if (this.lastTailCoords.x != null && this.lastTailCoords.y != null) {
            ctx.clearRect(this.lastTailCoords.x * unit,
                this.lastTailCoords.y * unit,
                unit,
                unit);
        }
    }

    drawSnake() {
        this.clear();
        for (let i = 0; i < this.length; i++) {
            ctx.fillStyle = this.body[i].color;
            ctx.fillRect(this.body[i].coords.x * unit,
                this.body[i].coords.y * unit,
                unit,
                unit);
        }
    }

    grow() {
        this.body.push(new Body(this.lastTailCoords.x, this.lastTailCoords.y));
        this.length += 1;
    }

    headCollides() {
        for (let i = 1; i < this.length; i++) {
            if (snake.head.x == this.body[i].coords.x && snake.head.y == this.body[i].coords.y) {
                return true;
            }
        }
        return false;     
    }

    isSnakeThere(x, y) {
        for (let i = 0; i < this.length; i++) {
            if (x == this.body[i].coords.x && y == this.body[i].coords.y) {
                return true;
            }
        }
        return false;
    }

    moveSnake() {
        let newCoords = [];
        if (this.direction == 'up') {
            for (let i = 0; i < this.length; i++) {
                if (i == 0) {
                    newCoords[0] = {
                        'x': (this.body[0].coords.x),
                        'y': (this.body[0].coords.y - 1)
                    };
                }
                else {
                    newCoords[i] = this.body[i-1].coords;
                }
            }
        }
        else if (this.direction == 'down') {
            for (let i = 0; i < this.length; i++) {
                if (i == 0) {
                    newCoords[0] = {
                        'x': (this.body[0].coords.x),
                        'y': (this.body[0].coords.y + 1)
                    };
                }
                else {
                    newCoords[i] = this.body[i-1].coords;
                }
            }
        }
        else if (this.direction == 'left') {
            for (let i = 0; i < this.length; i++) {
                if (i == 0) {
                    newCoords[0] = {
                        'x': (this.body[0].coords.x - 1),
                        'y': (this.body[0].coords.y)
                    };
                }
                else {
                    newCoords[i] = this.body[i-1].coords;
                }
            }
        }
        else if (this.direction == 'right') {
            for (let i = 0; i < this.length; i++) {
                if (i == 0) {
                    newCoords[0] = {
                        'x': (this.body[0].coords.x + 1),
                        'y': (this.body[0].coords.y)
                    };
                }
                else {
                    newCoords[i] = this.body[i-1].coords;
                }
            }
        }
        this.lastTailCoords = this.body[this.length - 1].coords;
        for (let i = 0; i < this.length; i++) {
            this.body[i].coords = newCoords[i];
        }
    }
}

class Apple {
    constructor(x, y) {
        this.coords = {
            'x': x,
            'y': y
        };
        this.color = '#FFA7A5';
    }

    clear() {
        ctx.fillStyle = this.color;
        ctx.clearRect(this.coords.x * unit,
            this.coords.y * unit,
            unit,
            unit);
    }

    drawApple(snake) {
        let newPos;
        while (true) {
            newPos = {
                'x': randomIntFromInterval(0, 39),
                'y': randomIntFromInterval(0, 19)
            }
            if (!snake.isSnakeThere(newPos.x, newPos.y)) {
                break;
            }
        }
        this.coords = newPos;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.coords.x * unit,
            this.coords.y * unit,
            unit,
            unit);
    }

    isAppleThere(x, y) {
        if (x == this.coords.x && y == this.coords.y) {
            return true;
        }
        else {
            return false;
        }
    }
}

function gameLoop(interval) {

    // Move snake
    setTimeout(function() {
        snake.moveSnake();
    }, parseInt(interval / 4));

    // Change last direction
    lastDirection = snake.direction;

    // Check if snake collided with apple
    if (apple.isAppleThere(snake.head.x, snake.head.y)) {
        snake.grow();
        apple.drawApple(snake);
    }

    // Check if snake collides with wall
    if (snake.head.x < 0 || snake.head.y < 0 || snake.head.x >= (c.width/unit) || snake.head.y >= (c.height/unit)) {
        reset();
    }

    //Check if snake collides with itself
    if (snake.headCollides()) {
        reset();
    }

    setTimeout(function() {
        snake.drawSnake();
    }, parseInt(interval / 2));


}

function reset() {
    snake.clear();
    snake = new Snake();
    snake.drawSnake();
    apple.clear();
    apple = new Apple();
    apple.drawApple(snake);
}

// Init objects
var snake = new Snake();
var apple = new Apple();

// Set game tickrate
let interval = 250;

// Initial drawn
snake.drawSnake();
apple.drawApple(snake);

// Start eventListener for keyboard
var lastDirection = 'up';
window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
      return;
    }
  
    switch(event.code) {
        case "KeyW":
        case "ArrowUp":
            if (lastDirection != 'down') {
                snake.direction = 'up';
            }
            break;
        case "KeyS":
        case "ArrowDown":
            if (lastDirection != 'up') {
                snake.direction = 'down';
            }
            break;
        case "KeyA":
        case "ArrowLeft":
            if (lastDirection != 'right') {
                snake.direction = 'left';
            }
            break;
        case "KeyD":
        case "ArrowRight":
            if (lastDirection != 'left') {
                snake.direction = 'right';
            }
            break;
    }

    event.preventDefault();
});

// Add eventlistener for mobile
let touchstartX = 0;
let touchstartY = 0;
let touchendX = 0;
let touchendY = 0;

document.addEventListener('touchstart', function(event) {
    touchstartX = event.changedTouches[0].screenX;
    touchstartY = event.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', function(event) {
    touchendX = event.changedTouches[0].screenX;
    touchendY = event.changedTouches[0].screenY;
    handleGesture();
}, false); 

function handleGesture() {
    if (touchendX <= touchstartX) {
        if (lastDirection != 'right') {
            snake.direction = 'left';
        }
    }
    
    if (touchendX >= touchstartX) {
        if (lastDirection != 'left') {
            snake.direction = 'right';
        }
    }
    
    if (touchendY <= touchstartY) {
        if (lastDirection != 'down') {
            snake.direction = 'up';
        }
    }
    
    if (touchendY >= touchstartY) {
        if (lastDirection != 'up') {
            snake.direction = 'down';
        }
    }
    
    /* if (touchendY === touchstartY) {
        console.log('Tap');
    } */
}

// Start game loop
setInterval(
    () => gameLoop(interval),
    interval);