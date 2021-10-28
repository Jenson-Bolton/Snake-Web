// get Colours
var mainColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color');
var bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
let appleColor = '#FFA7A5';

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

class Head {
    constructor() {
        this.coords = center;
        this.direction = 'up';
        this.color = '#F1A5FF';
    }
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

class Snake {
    constructor() {
        this.length = 3;
        this.body = [new Head(), new Body(center.x, center.y+1), new Body(center.x, center.y+2)];
    }

    drawSnake() {
        var i = 0;
        for (i = 0; i < this.length; i++) {
            ctx.fillStyle = this.body[i].color;
            ctx.fillRect(this.body[i].coords.x * unit,
                this.body[i].coords.y * unit,
                unit,
                unit);
        }
    }

    moveSnake() {
        // this is wrong
        // make each body part the same coord as the one before and head moves in a direction
        // think about making direction apart of Snake not head
        if (this.body[0].direction == 'up') {
            for (i = 0; i < this.length; i++) {
                this.body[i].coords.y = this.body[i].coords.y - 1
            }
        }
        else if (this.body[0].direction == 'down') {
            for (i = 0; i < this.length; i++) {
                this.body[i].coords.y = this.body[i].coords.y + 1
            }
        }
        else if (this.body[0].direction == 'left') {
            for (i = 0; i < this.length; i++) {
                this.body[i].coords.x = this.body[i].coords.x - 1
            }
        }
    }

}

class Apple {
    constructor(x, y) {
        this.coords = {
            'x': x,
            'y': y
        };
    }
}

var snek = new Snake();
snek.drawSnake();