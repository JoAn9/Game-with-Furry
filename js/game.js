document.addEventListener("DOMContentLoaded", function() {
    console.log('U mnie działa');

    var Furry = require('./furry.js');
    var Coin = require('./coin.js');

    var Game = function(board, furry, coin, score) {
        this.board = document.querySelectorAll('#board div');
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;

        this.index = function(x,y) {
            return x + (y * 10);
        };
        this.showFurry = function() {
            this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
        };
        this.showCoin = function() {
            this.board[this.index(this.coin.x,this.coin.y)].classList.add('coin');
        };
        this.hideVisibleFurry = function() {
            var divWithFurry = document.querySelector('.furry');
            divWithFurry.classList.remove('furry');
        };
        this.checkCoinCollision = function() {
            if(this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
                var divWithCoin = document.querySelector('.coin');
                divWithCoin.classList.remove('coin');
                this.score = this.score + 1;
                var scoreArea = document.querySelector('#score strong');
                scoreArea.innerHTML = this.score;
                this.coin = new Coin();
                this.showCoin();
            }
        };
        this.gameOver = function() {
            if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
                clearInterval(this.idSetInterval);
                var gameOver = document.querySelector('#over');
                gameOver.classList.remove('invisible');
                gameOver.innerHTML = 'game over <br> Zdobyłeś tylko ' + this.score + ' punktów';
                this.hideVisibleFurry();
            }
        };
        this.moveFurry = function() {
            this.hideVisibleFurry();
            if(this.furry.direction === "right") {
                this.furry.x = this.furry.x + 1;
            } else if (this.furry.direction === "left") {
                this.furry.x = this.furry.x - 1;
            } else if (this.furry.direction === "up") {
                this.furry.y = this.furry.y - 1;
            } else if (this.furry.direction === "down") {
                this.furry.y = this.furry.y + 1;
            }
            this.checkCoinCollision();
            this.gameOver();
            this.showFurry();

        };

        var self = this;
        this.startGame = function() {
            this.idSetInterval = setInterval(function() {
                self.moveFurry();
            }, 250);
        };
        this.turnFurry = function(event) {
            switch (event.which) {
                case 37:
                    this.furry.direction = "left";
                    break;
                case 38:
                    this.furry.direction = "up";
                    break;
                case 39:
                    this.furry.direction = "right";
                    break;
                case 40:
                    this.furry.direction = "down";
                    break;
            }
        };
    };

    var game = new Game();
    game.showFurry();
    game.showCoin();
    game.startGame();

    document.addEventListener('keydown', function(event) {
        game.turnFurry(event);
    });
});
