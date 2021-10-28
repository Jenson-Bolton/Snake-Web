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
        this.direction = 'down';
        this.length = 3;
    }

    #clear() {        
        for (let i = 0; i < this.length; i++) {
            ctx.fillStyle = this.body[i].color;
            ctx.clearRect(this.body[i].coords.x * unit,
                this.body[i].coords.y * unit,
                unit,
                unit);
        }
    }

    drawSnake() {
        this.#clear();
        for (let i = 0; i < this.length; i++) {
            ctx.fillStyle = this.body[i].color;
            ctx.fillRect(this.body[i].coords.x * unit,
                this.body[i].coords.y * unit,
                unit,
                unit);
        }
    }

    isSnakeThere(x, y) {

    }

    moveSnake() {
        let tempCoord;
        if (this.direction == 'up') {

        }
        else if (this.direction == 'down') {
            for (let i = this.length-1; i >= 0; i = i-1) {
                if (i == 0) {
                    this.body[i].coords.y = this.body[i].coords.y+1;
                }
                else {
                    this.body[i].coords = this.body[i-1].coords;
                }
            }
        }
        else if (this.direction == 'left') {
            for (let i = this.length-1; i >= 0; i = i-1) {
                if (i == 0) {
                    this.body[i].coords.x = this.body[i].coords.x-1;
                }
                else {
                    this.body[i].coords = this.body[i-1].coords;
                }
            }
        }
        else if (this.direction == 'right') {
            for (let i = this.length-1; i >= 0; i = i-1) {
                if (i == 0) {
                    this.body[i].coords.x = this.body[i].coords.x+1;
                }
                else {
                    this.body[i].coords = this.body[i-1].coords;
                }
            }}
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

    #clear() {
        ctx.fillStyle = this.color;
        ctx.clearRect(this.coords.x * unit,
            this.coords.y * unit,
            unit,
            unit);
    }

    drawApple(snake) {
        this.#clear();
        let newPos;
        let positioned = false;
        while (positioned == false) {
            newPos = {
                'x': randomIntFromInterval(0, 39),
                'y': randomIntFromInterval(0, 19)
            }
            for (let i = 0; i < snake.length; i++) {
                snake.body[i] = 
            }
        }
    }
}

var snek = new Snake();
var apple = new Apple();
// console.log(snek.body);
// snek.moveSnake()
// console.log(snek.body);
snek.drawSnake()