var SIZE_X = 5000;
var SIZE_Y = 3000;
var NUM_WALKERS = 1000;
var COLOR_CHANGE_INTERVAL = -1;

var screen = document.getElementById("canvas");
screen.width = SIZE_X;
screen.height = SIZE_Y;

var canvas = screen.getContext("2d");
resetCanvas();

var positions = setupPositionsArray(NUM_WALKERS);
var pause = false;
var stop = false;


main();


function main() {
    if (!pause) {
        console.log(iteration);

        for (i = 0; i < positions.length; i++) {
            // if (iteration % COLOR_CHANGE_INTERVAL === 0) {
            if (iteration === 0) {
                positions[i].changeColor();
            }

            positions[i].draw();
            positions[i].chooseDirection();
        }

        iteration++;
    }

    if (!stop) {
        setTimeout(main, 0);
    }
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
    this.canvas = canvas;

    this.draw = function () {
        this.canvas.fillStyle = 'rgb(' + this.red + ', ' + this.green + ', ' + this.blue + ')';
        this.canvas.fillRect(this.x, this.y, 1, 1);
    }

    this.changeColor = function () {
        this.red = Math.floor((Math.random() * 256));
        this.green = 0;//Math.floor((Math.random() * 256));
        this.blue = Math.floor((Math.random() * 256));
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

}

function onKeyPress(event) {
    var key = event.keyCode;

    switch (key) {
        case 112: // p -pause
            pause = pause ? false : true;
            console.log("paused/unpaused");
            break;
        case 114: // r -reset
            resetCanvas();
            stop = false;
            main();
            console.log("reset");
            break;
        case 115: //s -save (downloads png)
            var image = screen.toDataURL();
            var button = document.getElementById("button");
            button.href = image;
            button.click();
            console.log("saved image");
            break;
        case 120: //x -stop
            stop = true;
            console.log("stopped");
            break;
    }
}

function resetCanvas() {
    canvas.fillStyle = 'white';
    canvas.fillRect(0, 0, SIZE_X, SIZE_Y);
    iteration = 0;
}