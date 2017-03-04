// Constants
var CONSTANTS = CONSTANTS || {};
CONSTANTS.CANVAS_WIDTH = 505;
CONSTANTS.CANVAS_HEIGHT = 606;
CONSTANTS.BLOCK_WIDTH = 101;
CONSTANTS.BLOCK_HEIGHT = 83;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Setting the Enemy initial location (you need to implement)
    this.position = this.getInitialPosition();

    // Setting the Enemy speed (you need to implement)
    this.speed = {
        x: 200,
        y: 0
    };
};

Enemy.prototype.getInitialPosition = function(){
    // step can be 0, 1 or 2 generated at random. Based on this, enemy is placed on one of the three rows.
    var nRows = 3;
    var step = Math.floor(Math.random() * nRows);
    return {
        x: -1 * CONSTANTS.BLOCK_HEIGHT, // initial horizontal position one block left of canvas
        y: 55 + CONSTANTS.BLOCK_HEIGHT * step // 85 seems to the block width
    };
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Updates the Enemy location (you need to implement)
    this.position.x += this.speed.x * dt;
    // this.position.y += this.speed.y * dt;

    // if the bug has run past the whole width of canvas, regenerate it from beginning.
    if(this.position.x > CONSTANTS.CANVAS_WIDTH){
        this.position = this.getInitialPosition();
    }

    // @todo Handles collision with the Player (you need to implement)
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    // default player avatar
    this.sprite = 'images/char-boy.png'; 

    // Setting the Enemy initial location (you need to implement)
    this.speed = {
        x: 0,
        y: 0
    };

    // Setting the Enemy speed (you need to implement)
    this.position = {
        x: (CONSTANTS.CANVAS_WIDTH + CONSTANTS.BLOCK_WIDTH) / 2,
        y: 55 + 85 * 3
    };
};

// Update the player's position, required method for game 
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Updates the Player location (you need to implement)
    this.position.x += this.speed.x * dt;
    this.position.y += this.speed.y * dt;

    // @todo Handles collisions (you need to implement)
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
}

// handle input to navigate the player
Player.prototype.handleInput = function(moveDirection) {
    switch(moveDirection){
        case 'left':
            this.position.x -= CONSTANTS.BLOCK_WIDTH;
            break;
        case 'right':
            this.position.x += CONSTANTS.BLOCK_WIDTH;
            break;
        case 'up':
            this.position.y -= CONSTANTS.BLOCK_HEIGHT;
            break;
        case 'down':
            this.position.y += CONSTANTS.BLOCK_HEIGHT;
            break;
        default:
            throw new Error('Invalid value of direction.');
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy()
];
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
