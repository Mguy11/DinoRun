"use strict";
var Game = (function () {
    function Game() {
        this.screen = new StartScreen(this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.screen.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.showPlayScreen = function () {
        document.body.innerHTML = "";
        this.screen = new PlayScreen(this);
    };
    Game.prototype.endGame = function () {
        document.body.innerHTML = "";
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameOverScreen = (function () {
    function GameOverScreen() {
    }
    GameOverScreen.prototype.update = function () {
    };
    return GameOverScreen;
}());
var Ground = (function () {
    function Ground() {
        this.ground = document.createElement("ground");
        document.body.appendChild(this.ground);
        this.innerHeight = innerHeight - 50;
        this.x = 0;
        this.y = this.innerHeight;
    }
    Ground.prototype.getRectangle = function () {
        return this.ground.getBoundingClientRect();
    };
    Ground.prototype.update = function () {
        this.ground.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Ground;
}());
var Platforms = (function () {
    function Platforms() {
        this.gravity = 5;
        this.div = document.createElement("platform1");
        document.body.appendChild(this.div);
        this.innerWidth = innerWidth - 650;
        this.innerHeight = innerHeight - 170;
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
    }
    Platforms.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Platforms.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Platforms;
}());
var PlayScreen = (function () {
    function PlayScreen(g) {
        this.platform = [];
        this.ground = [];
        this.game = g;
        this.player = new Player();
        for (var i = 0; i < 5; i++) {
            this.platform.push(new Platforms());
        }
        for (var i = 0; i < 5; i++) {
            this.ground.push(new Ground());
        }
    }
    PlayScreen.prototype.update = function () {
        for (var _i = 0, _a = this.platform; _i < _a.length; _i++) {
            var p = _a[_i];
            if (this.checkCollision(p.getRectangle(), this.player.getRectangle())) {
                this.player.hitPlatform();
            }
            p.update();
        }
        for (var _b = 0, _c = this.ground; _b < _c.length; _b++) {
            var g = _c[_b];
            if (this.checkCollision(g.getRectangle(), this.player.getRectangle())) {
                this.player.hitPlatform();
            }
            g.update();
        }
        this.player.update();
    };
    PlayScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
        console.log(this.checkCollision);
    };
    return PlayScreen;
}());
var Player = (function () {
    function Player() {
        var _this = this;
        this.upSpeed = 0;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.gravity = 5;
        this.jumpforce = 5;
        this.grounded = true;
        this.innerWidth = window.innerWidth - 173;
        this.innerHeight = window.innerHeight - 207;
        this.div = document.createElement("player");
        document.body.appendChild(this.div);
        this.upkey = 17;
        this.leftkey = 30;
        this.rightkey = 32;
        this.x = 25;
        this.y = 600;
        var keypressup = window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        var keypressdown = window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        console.log(keypressup);
        console.log(keypressdown);
    }
    Player.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Player.prototype.onKeyDown = function (e) {
        switch (e.key) {
            case "w":
                this.jump();
                break;
            case "a":
                this.leftSpeed = 5;
                break;
            case "d":
                this.rightSpeed = 5;
                break;
        }
    };
    Player.prototype.onKeyUp = function (e) {
        switch (e.key) {
            case "w":
                this.upSpeed = 0;
                this.gravity = 9;
                break;
            case "a":
                this.leftSpeed = 0;
                break;
            case "d":
                this.rightSpeed = 0;
                break;
        }
    };
    Player.prototype.jump = function () {
        this.upSpeed = 10;
        this.gravity = 4;
        this.grounded = false;
    };
    Player.prototype.hitPlatform = function () {
        this.gravity = 0;
    };
    Player.prototype.update = function () {
        var newX = this.x - this.leftSpeed + this.rightSpeed;
        var newY = this.y - this.upSpeed + this.gravity;
        if (newX > 0 && newX + 100 < innerWidth)
            this.x = newX;
        if (newY > 0 && newY + 100 < innerHeight)
            this.y = newY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Player;
}());
var StartScreen = (function () {
    function StartScreen(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
        this.div.innerHTML = "START THE GIMMA";
    }
    StartScreen.prototype.update = function () {
    };
    StartScreen.prototype.splashClicked = function () {
        this.game.showPlayScreen();
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map