var SIZE_X = 1000;
var SIZE_Y = 1000;
var NUM_WALKERS = 100;

var iteration = 0;
var positions = setupPositionsArray(NUM_WALKERS);
var pause = false;

var canvas = document.getElementById("canvas").getContext("2d");
resetCanvas();

for (i = 0; i < positions.length; i++) {
    positions[i].changeColor();
}

walk();


function walk() {
    if (!pause) {
        console.log(iteration);

        for (i = 0; i < positions.length; i++) {
            positions[i].draw();
            positions[i].chooseDirection();
        }

        iteration++;
    }

    setTimeout(walk, 0);
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

function onKeyPress(event) {
    var key = event.keyCode;

    switch (key) {
        case 112: // p -pause
            pause = pause ? false : true;
            break;
        case 114: // r -reset
            resetCanvas();
            break;
        case 115: //s -save (opens new tab to save image)
            window.open(document.getElementById("canvas").toDataURL());
            break;
    }
}

function resetCanvas() {
    canvas.fillStyle = 'white';
    canvas.fillRect(0, 0, SIZE_X, SIZE_Y);
    iteration = 0;
}