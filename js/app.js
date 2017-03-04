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

    this.id = this.getNextInstanceId();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Setting the Enemy initial location
    this.resetPosition();

    // Setting the Enemy speed
    this.resetSpeed();
};

// Provides initial value of speed of enemy
Enemy.prototype.resetSpeed = function(){
    this.speed = {
        // Initial speed randomly selected in range of [200, 400) units
        x: 200 + Math.random() * 200,
        y: 0
    };
};

Enemy.prototype.getNextInstanceId = (function(){
    var _instanceId = 0;
    return function(){
        return ++_instanceId;
    };
})();

// Provides initial value of position of enemy
// Used in constructor as well as later when enemy is off screen.
Enemy.prototype.resetPosition = function(){
    // step can be 0, 1 or 2 generated at random. Based on this, enemy is placed on one of the three rows.
    var nRows = 3;
    var initialRowChoice = Math.floor(Math.random() * nRows);
    this.position = {
        x: -1 * CONSTANTS.BLOCK_WIDTH, // initial horizontal position one block left of canvas
        y: 55 + CONSTANTS.BLOCK_HEIGHT * initialRowChoice
    };
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Updates the Enemy location
    this.position.x += this.speed.x * dt;

    // If the bug has run past the whole width of canvas, regenerate it from beginning.
    if(this.position.x > CONSTANTS.CANVAS_WIDTH){
        this.resetPosition();
    }
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

    // Setting the Enemy initial location
    this.speed = {
        x: 0,
        y: 0
    };

    // Setting the Enemy speed
    this.resetPosition();
};

Player.prototype.resetPosition = function(){
    this.position = {
        x: (CONSTANTS.CANVAS_WIDTH - CONSTANTS.BLOCK_WIDTH) / 2,
        y: 55 + 85 * 3
    };
};

// Update the player's position, required method for game 
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Updates the Player location
    this.position.x += this.speed.x * dt;
    this.position.y += this.speed.y * dt;
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y);
}

Player.prototype.reset = function() {
    this.resetPosition();
}

// handle input to navigate the player
Player.prototype.handleInput = function(moveDirection) {
    var prevPositionX = this.position.x,
        prevPositionY = this.position.y,
        minPositionY = 61,
        maxPositionY = 393,
        minPositionX = 0,
        maxPositionX = 404;
    switch(moveDirection){
        case 'left':
            if(prevPositionX > minPositionX){
                this.position.x = prevPositionX - CONSTANTS.BLOCK_WIDTH;
            }
            break;
        case 'right':
            if(prevPositionX < maxPositionX){
                this.position.x = prevPositionX + CONSTANTS.BLOCK_WIDTH;
            }
            break;
        case 'up':
            if(prevPositionY > minPositionY){
                this.position.y = prevPositionY - CONSTANTS.BLOCK_HEIGHT;
            }else{
                player.reset();
            }
            break;
        case 'down':
            if(prevPositionY < maxPositionY){
                this.position.y = prevPositionY + CONSTANTS.BLOCK_HEIGHT;
            }
            break;
        default:
            // do nothing on other events
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy(),
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
