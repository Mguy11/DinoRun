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
    function GameObject(pos, tag) {
        this.position = [0, 0];
        this.htmlElement = document.createElement(tag);
        document.body.appendChild(this.htmlElement);
        this.spawn(pos);
    }
    GameObject.prototype.getRectangle = function () {
        return this.htmlElement.getBoundingClientRect();
    };
    GameObject.prototype.spawn = function (pos) {
        this.position = pos;
        this.htmlElement.style.transform = "translate(" + this.position[0] + "px, " + this.position[1] + "px)";
    };
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
    Game.prototype.showmultiplayerScreen = function () {
        document.body.innerHTML = "";
        this.screen = new MultiplayerScreen(this);
    };
    Game.prototype.showStartScreen = function () {
        document.body.innerHTML = "";
        this.screen = new StartScreen(this);
    };
    Game.prototype.showGameOverScreen = function () {
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
        this.div.innerHTML = "Game Over";
    }
    GameOverScreen.prototype.update = function () {
    };
    GameOverScreen.prototype.splashClicked = function () {
        this.game.showStartScreen();
    };
    return GameOverScreen;
}());
var Ground = (function (_super) {
    __extends(Ground, _super);
    function Ground(playscreen) {
        var _this = this;
        var x = 0;
        var y = innerHeight - 70;
        _this = _super.call(this, [x, y], "ground") || this;
        return _this;
    }
    Ground.prototype.update = function () {
    };
    return Ground;
}(GameObject));
var Ground2 = (function (_super) {
    __extends(Ground2, _super);
    function Ground2(multiplayerScreen) {
        var _this = this;
        var x = 0;
        var y = innerHeight - 70;
        _this = _super.call(this, [x, y], "ground") || this;
        return _this;
    }
    Ground2.prototype.update = function () {
    };
    return Ground2;
}(GameObject));
var Meteorite = (function (_super) {
    __extends(Meteorite, _super);
    function Meteorite() {
        var _this = _super.call(this, "meteorite") || this;
        _this._speed = 12;
        return _this;
    }
    return Meteorite;
}(FallingGameObject));
var MultiplayerScreen = (function () {
    function MultiplayerScreen(g) {
        this.eggs = [];
        this.meteorites = [];
        this.maxEggs = 8;
        this.maxMeteorites = 4;
        this.score = 0;
        this.lives = 0;
        this.score2 = 0;
        this.lives2 = 0;
        this.game = g;
        this.ground = new Ground2(this);
        this.scoreElement = document.createElement("scores");
        document.body.appendChild(this.scoreElement);
        this.lifeElement = document.createElement("lives");
        document.body.appendChild(this.lifeElement);
        this.scoreElement2 = document.createElement("scores2");
        document.body.appendChild(this.scoreElement2);
        this.lifeElement2 = document.createElement("lives2");
        document.body.appendChild(this.lifeElement2);
        this.updateScore(0);
        this.updateScore2(0);
        this.updateLives(3);
        this.updateLives2(3);
        this.player1 = new Player1();
        this.player2 = new Player2();
        for (var i = 0; i < this.maxEggs; i++) {
            this.eggs.push(new Egg());
        }
        for (var i = 0; i < this.maxMeteorites; i++) {
            this.meteorites.push(new Meteorite());
        }
    }
    MultiplayerScreen.prototype.update = function () {
        console.log('update');
        this.player1.update();
        this.player2.update();
        this.ground.update();
        for (var _i = 0, _a = this.eggs; _i < _a.length; _i++) {
            var g = _a[_i];
            g.update();
            if (this.checkCollision(g.getRectangle(), this.player1.getRectangle())) {
                console.log('yum');
                this.updateScore(1);
                g.reset();
            }
            if (this.checkCollision(g.getRectangle(), this.player2.getRectangle())) {
                console.log('yum');
                this.updateScore2(1);
                g.reset();
            }
        }
        for (var _b = 0, _c = this.meteorites; _b < _c.length; _b++) {
            var m = _c[_b];
            m.update();
            if (this.checkCollision(m.getRectangle(), this.player1.getRectangle())) {
                console.log('hit');
                this.updateLives(-1);
                m.reset();
            }
            if (this.checkCollision(m.getRectangle(), this.player2.getRectangle())) {
                console.log('hit');
                this.updateLives2(-1);
                m.reset();
            }
        }
    };
    MultiplayerScreen.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    MultiplayerScreen.prototype.updateScore = function (points) {
        this.score = this.score + points;
        this.scoreElement.innerHTML = "Score: " + this.score;
    };
    MultiplayerScreen.prototype.updateLives = function (points) {
        this.lives = this.lives + points;
        this.lifeElement.innerHTML = "Levens: " + this.lives;
        if (this.lives <= 0) {
            this.game.showGameOverScreen();
        }
    };
    MultiplayerScreen.prototype.updateScore2 = function (points) {
        this.score2 = this.score2 + points;
        this.scoreElement2.innerHTML = "Score: " + this.score2;
    };
    MultiplayerScreen.prototype.updateLives2 = function (points) {
        this.lives2 = this.lives2 + points;
        this.lifeElement2.innerHTML = "Levens: " + this.lives2;
        if (this.lives2 <= 0) {
            this.game.showGameOverScreen();
        }
    };
    return MultiplayerScreen;
}());
var PlayScreen = (function () {
    function PlayScreen(g) {
        this.eggs = [];
        this.meteorites = [];
        this.maxEggs = 8;
        this.maxMeteorites = 4;
        this.score = 0;
        this.lives = 0;
        this.game = g;
        this.ground = new Ground(this);
        this.scoreElement = document.createElement("scores");
        document.body.appendChild(this.scoreElement);
        this.lifeElement = document.createElement("lives");
        document.body.appendChild(this.lifeElement);
        this.updateScore(0);
        this.updateLives(3);
        this.player1 = new Player1();
        for (var i = 0; i < this.maxEggs; i++) {
            this.eggs.push(new Egg());
        }
        for (var i = 0; i < this.maxMeteorites; i++) {
            this.meteorites.push(new Meteorite());
        }
    }
    PlayScreen.prototype.update = function () {
        console.log('update');
        this.player1.update();
        this.ground.update();
        for (var _i = 0, _a = this.eggs; _i < _a.length; _i++) {
            var g = _a[_i];
            g.update();
            if (this.checkCollision(g.getRectangle(), this.player1.getRectangle())) {
                console.log('yum');
                this.updateScore(1);
                g.reset();
            }
        }
        for (var _b = 0, _c = this.meteorites; _b < _c.length; _b++) {
            var m = _c[_b];
            m.update();
            if (this.checkCollision(m.getRectangle(), this.player1.getRectangle())) {
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
        this.lifeElement.innerHTML = "Levens: " + this.lives;
        if (this.lives <= 0) {
            this.game.showGameOverScreen();
        }
    };
    return PlayScreen;
}());
var Player = (function () {
    function Player(tag) {
        this.grounded = true;
        this.innerWidth = window.innerWidth - 173;
        this.innerHeight = window.innerHeight - 207;
        this.htmlElement = document.createElement(tag);
        document.body.appendChild(this.htmlElement);
        this.x = 25;
        this.y = 800;
    }
    Player.prototype.getRectangle = function () {
        return this.htmlElement.getBoundingClientRect();
    };
    return Player;
}());
var Player1 = (function (_super) {
    __extends(Player1, _super);
    function Player1() {
        var _this = _super.call(this, "player1") || this;
        _this.leftSpeed = 0;
        _this.rightSpeed = 0;
        _this.grounded = true;
        _this.leftkey = 30;
        _this.rightkey = 32;
        _this.x = 25;
        _this.y = 800;
        var keypressup = window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        var keypressdown = window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        console.log(keypressup);
        console.log(keypressdown);
        return _this;
    }
    Player1.prototype.onKeyDown = function (e) {
        switch (e.key) {
            case "a":
                this.leftSpeed = 15;
                break;
            case "d":
                this.rightSpeed = 15;
                break;
        }
    };
    Player1.prototype.onKeyUp = function (e) {
        switch (e.key) {
            case "a":
                this.leftSpeed = 0;
                break;
            case "d":
                this.rightSpeed = 0;
                break;
        }
    };
    Player1.prototype.update = function () {
        var newX = this.x - this.leftSpeed + this.rightSpeed;
        var newY = this.y;
        if (newX > 0 && newX + 100 < innerWidth)
            this.x = newX;
        if (newY > 0 && newY + 100 < innerHeight)
            this.y = newY;
        this.htmlElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Player1;
}(Player));
var Player2 = (function (_super) {
    __extends(Player2, _super);
    function Player2() {
        var _this = _super.call(this, "player2") || this;
        _this.leftSpeed = 0;
        _this.rightSpeed = 0;
        _this.grounded = true;
        _this.leftkey = 75;
        _this.rightkey = 77;
        _this.x = 25;
        _this.y = 800;
        var keypressup = window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        var keypressdown = window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        console.log(keypressup);
        console.log(keypressdown);
        return _this;
    }
    Player2.prototype.onKeyDown = function (e) {
        switch (e.key) {
            case "j":
                this.leftSpeed = 15;
                break;
            case "l":
                this.rightSpeed = 15;
                break;
        }
    };
    Player2.prototype.onKeyUp = function (e) {
        switch (e.key) {
            case "j":
                this.leftSpeed = 0;
                break;
            case "l":
                this.rightSpeed = 0;
                break;
        }
    };
    Player2.prototype.update = function () {
        var newX = this.x - this.leftSpeed + this.rightSpeed;
        var newY = this.y;
        if (newX > 0 && newX + 100 < innerWidth)
            this.x = newX;
        if (newY > 0 && newY + 100 < innerHeight)
            this.y = newY;
        this.htmlElement.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Player2;
}(Player));
var StartScreen = (function () {
    function StartScreen(g) {
        var _this = this;
        this.game = g;
        this.div = document.createElement("splash");
        document.body.appendChild(this.div);
        this.multi = document.createElement("splash2");
        document.body.appendChild(this.multi);
        this.div.addEventListener("click", function () { return _this.splashClicked(); });
        this.div.innerHTML = "Start DinoRun - Solo";
        this.multi.addEventListener("click", function () { return _this.splashClicked2(); });
        this.multi.innerHTML = "Start DinoRun - Versus";
    }
    StartScreen.prototype.update = function () {
    };
    StartScreen.prototype.splashClicked = function () {
        this.game.showPlayScreen();
    };
    StartScreen.prototype.splashClicked2 = function () {
        this.game.showmultiplayerScreen();
    };
    return StartScreen;
}());
//# sourceMappingURL=main.js.map