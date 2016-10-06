var enemyInterval;
characters = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
allEnemies = [];
var ENEMY_SPEED = 1;
var INTERVAL = 1600;
var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;


// Superclass Character
var Character = function() {
    this.sprite = '';
    this.x = 0;
    this.y = 0;
};

// Draw the enemy and player on the screen, required method for game
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 60;
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt + ENEMY_SPEED;
    this.checkCollision();
};

Enemy.prototype.checkCollision = function(){
    // collission test

    var customWidth = 70;
    var customHeight = 55;
    if (this.x < (player.x + customWidth) && (this.x + customWidth) > player.x && this.y < (player.y + customHeight) && (this.y + customHeight) > player.y){
        player.x = playerInitX;
        player.y = playerInitY;
    }
};


// Now write your own player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202.5;
    this.y = 406;
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function() {
};


Player.prototype.handleInput = function(key) {
//  checkBorder
        if (this.x < 1){
            this.x = 1;
            return;
        }else if (this.x > (ctx.canvas.width - TILE_WIDTH)){
            this.x = ctx.canvas.width - TILE_WIDTH;
            return;
        }else if (this.y > (ctx.canvas.height - 180)){
            this.y = ctx.canvas.height - 200;
            return;
        }

    switch(key) {
        case "up":
        this.y -= TILE_HEIGHT;
        this.winner();
        break;
        case "right":
        this.x += TILE_WIDTH;
        break;
        case "down":
        this.y += TILE_HEIGHT;
        break;
        case "left":
        this.x -= TILE_WIDTH;
        break;
    }
};

Player.prototype.winner = function (){
    if (this.y < 0) {
        // clearInterval(enemyInterval);
        alert("Winner!");
        ENEMY_SPEED += 1;
        INTERVAL -= 200;
        this.reset();
    }
};

// reset Player to original position
Player.prototype.reset = function (){
    player.x = playerInitX;
    player.y = playerInitY;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

 var player = new Player();
// var player;
var playerInitX;
var playerInitY;


$("body").html("<div class='container' style='z-index: 5; position: relative; top: 0px; background:rgba(50,60,70,0.5);'></div>");
$(".container").append("<h1>Select your player</h1>");
$(".container").append("<div class='avatar'></div>");

$( document ).ready(function() {

    function playGame(img){
        'use strict';
        playerInitX = (ctx.canvas.width/2) - 50;
        playerInitY = ctx.canvas.height - 200;
        function createEnemy(){
            var randRow = 60 + (Math.round(Math.random() * 2) * 85);
            var enemy = new Enemy();
            enemy.y = randRow;
            allEnemies.push(enemy);
        }
        enemyInterval = setInterval(createEnemy, INTERVAL);
        player.sprite = img;
        player.render();
    }
    // playGame();
    $.each(characters, function(index){
        $(".container .avatar").append("<a href ='#'><img src='"+characters[index]+"'></a>");
    });

    $("a").click(function(){
        var img = $(this).find("img").attr("src");
        playGame(img);
        $(".container").css("display", "none");
    });

});



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
