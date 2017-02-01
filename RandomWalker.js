var SIZE_X = 3000;
var SIZE_Y = 2000;
var NUM_WALKERS = 2000;

var iteration = 0;
var positions = setupPositionsArray(NUM_WALKERS);

for (i = 0; i < positions.length; i++) {
    positions[i].changeColor();
}

start();


function start() {
    console.log(iteration);

    for (i = 0; i < positions.length; i++) {
        positions[i].draw();
        positions[i].chooseDirection();
    }

    iteration++;
    setTimeout(start, 0);
}

function setupPositionsArray(numberOfPositions) {
    var array = [];

    for (i = 0; i < numberOfPositions; i++) {
        array[i] = new Position(
            Math.floor((Math.random() * SIZE_X)),
            Math.floor((Math.random() * SIZE_Y))
        );
    }

    return array;
}

function Position(x, y) {
    this.x = x;
    this.y = y;
    this.canvas = document.getElementById("canvas").getContext("2d");

    this.draw = function () {
        this.canvas.fillStyle = 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';
        this.canvas.fillRect(this.x, this.y, 1, 1);
    }

    this.changeColor = function () {
        this.red = Math.floor((Math.random() * 256));
        this.green = Math.floor((Math.random() * 256));
        this.blue = Math.floor((Math.random() * 256));
    }

    this.up = function () {
        if (this.y > 0) {
            this.y -= 1;
        }
    }

    this.down = function () {
        if (this.y < SIZE_Y) {
            this.y += 1;
        }
    }

    this.left = function () {
        if (this.x > 0) {
            this.x -= 1;
        }
    }

    this.right = function () {
        if (this.x < SIZE_X) {
            this.x += 1;
        }
    }

    this.chooseDirection = function () {
        var direction = Math.floor((Math.random() * 4));

        switch (direction) {
            case 0:
                this.up();
                break;
            case 1:
                this.down();
                break;
            case 2:
                this.left();
                break;
            case 3:
                this.right();
                break;
        }
    }
}