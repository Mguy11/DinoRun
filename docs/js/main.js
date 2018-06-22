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
var GameObject = (function () {
    function GameObject() {
    }
    return GameObject;
}());
var FallingGameObject = (function () {
    function FallingGameObject(tag) {
        this._speed = 0;
        this.htmlElement = document.createElement(tag);
        document.body.appendChild(this.htmlElement);
        this.x = Math.random() * (window.innerWidth);
        this.y = -400 - (Math.random() * 450);
        this.update();
    }
    FallingGameObject.prototype.update = function () {
        this.y += this._speed;
        this.htmlElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        if (this.y + this.htmlElement.clientHeight > window.innerHeight) {
            this.reset();
        }
    };
    FallingGameObject.prototype.getRectangle = function () {
        return this.htmlElement.getBoundingClientRect();
    };
    FallingGameObject.prototype.reset = function () {
        console.log('reset');
        this.x = Math.random() * (window.innerWidth - 200);
        this.y = -400 - (Math.random() * 450);
    };
    return FallingGameObject;
}());
var Egg = (function (_super) {
    __extends(Egg, _super);
    function Egg() {
        var _this = _super.call(this, "egg") || this;
        _this._speed = 3;
        return _this;
    }
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
    Game.prototype.showStartScreen = function () {
        document.body.innerHTML = "";
        this.screen = new StartScreen(this);
    };
    Game.prototype.showGameOverScreen = function () {
        document.body.innerHTML = "";
        document.body.innerHTML = "";
        this.screen = new GameOverScreen(this);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var GameOverScreen = (function () {
    function GameOverScreen(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
        this.div.innerHTML = "Helaas...";
    }
    GameOverScreen.prototype.update = function () {
    };
    GameOverScreen.prototype.splashClicked = function () {
        this.game.showStartScreen();
    };
    return GameOverScreen;
}());
var Ground = (function () {
    function Ground(playscreen) {
        this.ground = document.createElement("ground");
        document.body.appendChild(this.ground);
        this.innerHeight = innerHeight - 70;
        this.x = 0;
        this.y = this.innerHeight;
    }
    Ground.prototype.update = function () {
        this.ground.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Ground;
}());
var Meteorite = (function (_super) {
    __extends(Meteorite, _super);
    function Meteorite() {
        var _this = _super.call(this, "meteorite") || this;
        _this._speed = 12;
        return _this;
    }
    return Meteorite;
}(FallingGameObject));
var PlayScreen = (function () {
    function PlayScreen(g) {
        this.eggs = [];
        this.meteorites = [];
        this.maxEggs = 8;
        this.maxMeteoritess = 4;
        this.score = 0;
        this.lives = 0;
        this.game = g;
        this.ground = new Ground(this);
        this.scoreElement = document.createElement("scores");
        document.body.appendChild(this.scoreElement);
        this.liveElement = document.createElement("lives");
        document.body.appendChild(this.liveElement);
        this.updateScore(0);
        this.updateLives(3);
        this.player = new Player(this);
        for (var i = 0; i < this.maxEggs; i++) {
            this.eggs.push(new Egg());
        }
        for (var i = 0; i < this.maxMeteoritess; i++) {
            this.meteorites.push(new Meteorite());
        }
    }
    PlayScreen.prototype.update = function () {
        console.log('update');
        this.player.update();
        this.ground.update();
        for (var _i = 0, _a = this.eggs; _i < _a.length; _i++) {
            var g = _a[_i];
            g.update();
            if (this.checkCollision(g.getRectangle(), this.player.getRectangle())) {
                console.log('yum');
                this.updateScore(1);
                g.reset();
            }
        }
        for (var _b = 0, _c = this.meteorites; _b < _c.length; _b++) {
            var m = _c[_b];
            m.update();
            if (this.checkCollision(m.getRectangle(), this.player.getRectangle())) {
                console.log('hit');
                this.updateLives(-1);
                m.reset();
            }
        }
    };
    PlayScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    PlayScreen.prototype.updateScore = function (points) {
        this.score = this.score + points;
        this.scoreElement.innerHTML = "Score: " + this.score;
    };
    PlayScreen.prototype.updateLives = function (points) {
        this.lives = this.lives + points;
        this.liveElement.innerHTML = "Levens: " + this.lives;
        if (this.lives <= 0) {
            this.game.showGameOverScreen();
        }
    };
    return PlayScreen;
}());
var Player = (function () {
    function Player(playscreen) {
        var _this = this;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.grounded = true;
        this.innerWidth = window.innerWidth - 173;
        this.innerHeight = window.innerHeight - 207;
        this.player = document.createElement("player");
        document.body.appendChild(this.player);
        this.upkey = 17;
        this.leftkey = 30;
        this.rightkey = 32;
        this.x = 25;
        this.y = 800;
        var keypressup = window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        var keypressdown = window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        console.log(keypressup);
        console.log(keypressdown);
    }
    Player.prototype.onKeyDown = function (e) {
        switch (e.key) {
            case "a":
                this.leftSpeed = 15;
                break;
            case "d":
                this.rightSpeed = 15;
                break;
        }
    };
    Player.prototype.onKeyUp = function (e) {
        switch (e.key) {
            case "a":
                this.leftSpeed = 0;
                break;
            case "d":
                this.rightSpeed = 0;
                break;
        }
    };
    Player.prototype.getRectangle = function () {
        return this.player.getBoundingClientRect();
    };
    Player.prototype.update = function () {
        var newX = this.x - this.leftSpeed + this.rightSpeed;
        var newY = this.y;
        if (newX > 0 && newX + 100 < innerWidth)
            this.x = newX;
        if (newY > 0 && newY + 100 < innerHeight)
            this.y = newY;
        this.player.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
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
        this.div.innerHTML = "Start DinoRun";
    }
    StartScreen.prototype.update = function () {
    };
    StartScreen.prototype.splashClicked = function () {
        this.game.showPlayScreen();
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map