var SIZE_X = 1000;
var SIZE_Y = 1000;

var canvas = document.getElementById("canvas").getContext("2d");
canvas.fillRect(0, 0, SIZE_X, SIZE_Y);

var iteration = 0;
var position = new Position();

start();


function start() {
    console.log(iteration);
    if (iteration % 2000 === 0) {
        position.changeColor();
    }

    position.draw();

    var direction = Math.floor((Math.random() * 4));

    switch (direction) {
        case 0:
            position.up();
            break;
        case 1:
            position.down();
            break;
        case 2:
            position.left();
            break;
        case 3:
            position.right();
            break;
    }

    iteration++;
    setTimeout(start, 0);
}

function Position() {
    this.x = SIZE_X / 2;
    this.y = SIZE_Y / 2;

    this.draw = function () {
        canvas.fillRect(this.x, this.y, 1, 1);
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

    this.changeColor = function () {
        var red = Math.floor((Math.random() * 256));
        var green = Math.floor((Math.random() * 256));
        var blue = Math.floor((Math.random() * 256));

        canvas.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    }
}