"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var gameObject = (function () {
    function gameObject(pos, tag) {
        this.position = [0, 0];
        this.lastMove = [0, 0];
        this.htmlElement = document.createElement(tag);
        document.body.appendChild(this.htmlElement);
    }
    gameObject.prototype.spawn = function (pos) {
        this.position = pos;
        this.htmlElement.style.transform = "translate(" + this.position[0] + "px, " + this.position[1] + "px";
    };
    gameObject.prototype.shift = function (pos) {
        if (pos == null) {
            pos = this.lastMove;
        }
        this.lastMove = pos;
        this.position[this.position[0] + pos[0], this.position[1] + pos[1]];
        this.htmlElement.style.transform = "translate(" + this.position[0] + "px, " + this.position[1] + "px";
    };
    gameObject.prototype.remove = function () {
        this.htmlElement.parentElement.removeChild(this.htmlElement);
    };
    gameObject.prototype.getRectangle = function () {
        return this.htmlElement.getBoundingClientRect;
    };
    return gameObject;
}());
var FallingGameObject = (function (_super) {
    __extends(FallingGameObject, _super);
    function FallingGameObject(pos, tag, initialSpeed, gravity) {
        var _this = _super.call(this, pos, tag) || this;
        _this.fallingSpeed = initialSpeed;
        _this.gravitly = gravity;
        _this.update();
        return _this;
    }
    FallingGameObject.prototype.update = function () {
        this.fallingSpeed[1] += this.gravitly;
        this.shift([this.fallingSpeed[0], this.fallingSpeed[1]]);
        console.log("update");
    };
    return FallingGameObject;
}(gameObject));
var Egg = (function (_super) {
    __extends(Egg, _super);
    function Egg() {
        var _this = this;
        var x = Math.random() * (window.innerWidth - 40);
        var y = -22;
        var fallingSpeed = Math.random() * (Egg.eggSpeed - 1) + 1;
        var gravity = 0.01;
        _this = _super.call(this, [x, y], "egg", [0, fallingSpeed], gravity) || this;
        _this.update();
        return _this;
    }
    Egg.eggSpeed = 5;
    return Egg;
}(FallingGameObject));
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
var Ground = (function (_super) {
    __extends(Ground, _super);
    function Ground(pos, tag) {
        var _this = _super.call(this, pos, tag) || this;
        _this.innerHeight = innerHeight - 50;
        _this.x = 0;
        _this.y = _this.innerHeight;
        return _this;
    }
    Ground.prototype.update = function () {
    };
    return Ground;
}(gameObject));
var PlayScreen = (function () {
    function PlayScreen(g) {
        this.eggCount = 0.01;
        this.eggs = [];
        this.gameOver = false;
        console.log("Game created!");
        this.game = g;
        this.update();
    }
    PlayScreen.prototype.update = function () {
        if (Math.random() < this.eggCount) {
            this.eggs.push(new Egg());
        }
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
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(pos, tag) {
        var _this = _super.call(this, pos, tag) || this;
        _this.upSpeed = 0;
        _this.leftSpeed = 0;
        _this.rightSpeed = 0;
        _this.gravity = 5;
        _this.jumpforce = 5;
        _this.grounded = true;
        _this.innerWidth = window.innerWidth - 173;
        _this.innerHeight = window.innerHeight - 207;
        _this.upkey = 17;
        _this.leftkey = 30;
        _this.rightkey = 32;
        _this.x = 25;
        _this.y = 600;
        var keypressup = window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        var keypressdown = window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        console.log(keypressup);
        console.log(keypressdown);
        return _this;
    }
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
    };
    return Player;
}(gameObject));
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