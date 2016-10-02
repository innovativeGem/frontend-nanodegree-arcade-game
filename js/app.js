var enemyInterval;

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

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt + 1.5;
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

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202.5;
    this.y = 406;
    //    player.x = playerInitX;
    //    player.y = playerInitY;
};

// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    function checkBorder() {
        if (player.x < 5){
            player.x = 5;
            return;
        }else if(player.y <= 0){
            player.y = 0;
        }else if (player.x > (ctx.canvas.width - 80)){
            player.x = ctx.canvas.width - 100;
            return;
        }else if (player.y > (ctx.canvas.height - 180)){
            player.y = ctx.canvas.height - 180;
            return;
        };
    }

    function winner(){
        if (player.y < 25) {
            // clearInterval(enemyInterval);
            alert("Winner!");
            reset();
        }
    };

    switch(key) {
        case "up":
        player.y -= 25;
        winner();
        checkBorder();
        break;
        case "right":
        player.x += 25;
        checkBorder();
        break;
        case "down":
        player.y += 25;
        checkBorder();
        break;
        case "left":
        player.x -= 25;
        checkBorder();
        break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

characters = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
allEnemies = new Array();
player = new Player();


$("body").html("<div class='container' style='z-index: 5; position: relative; top: 0px; background:rgba(50,60,70,0.5);'></div>");
$(".container").append("<h1>Select your player</h1>");
$(".container").append("<div class='avatar'></div>");

$( document ).ready(function() {


    function playGame(img){
        playerInitX = (ctx.canvas.width/2) - 50;
        playerInitY = ctx.canvas.height - 200;
        function createEnemy(){
            var randRow = 60 + (Math.round(Math.random() * 2) * 85);
            enemy = new Enemy();
            enemy.y = randRow;
            allEnemies.push(enemy);
        };
        enemyInterval = setInterval(createEnemy, 1500);
        player.sprite = img;
        player.render();
    };
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

function reset(){
    player.x = playerInitX;
    player.y = playerInitY;
}



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
