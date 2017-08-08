function Furry(){
  this.x = 0;
  this.y = 0;
  this.direction = "right";
}
function Coin(){
  this.x= Math.floor(Math.random() * 10);
  this.y= Math.floor(Math.random() * 10);
}
function Game(){
  this.board = document.querySelectorAll('#board>div');
  this.furry = new Furry();
  this.newCoin = new Coin();
  this.score = 0;
  this.index = function(x,y) {
    return x + (y * 10);
  }
  this.scoreElement=document.querySelector("#score strong");
  this.showFurry = function (){
    this.hideVisibleFurry();
    this.board[this.index(this.furry.x,this.furry.y)].classList.add('furry');
  }
  this.showCoin = function (){
    this.board[this.index(this.newCoin.x,this.newCoin.y)].classList.add('coin');
  }
  this.startGame = function(){
    this.idSetInterval = setInterval(this.moveFurry, 250);
  }
  var self = this;
  this.moveFurry = function() {
    self.showFurry();
    if(self.furry.direction === "right") {
        self.furry.x = self.furry.x + 1;
    }
    if (self.furry.direction === 'left') {
      self.furry.x = self.furry.x -1;
    }
    if (self.furry.direction === 'bottom'){
      self.furry.y = self.furry.y +1;
    }
    if (self.furry.direction === 'up'){
      self.furry.y = self.furry.y -1;
    }
    self.gameOver();
    self.checkCoinCollision();
  }
  this.hideVisibleFurry = function(){
    var classfury = document.querySelector(".furry")
    if ( classfury !== null) {
      classfury.classList.remove("furry");
    }
  }
  this.turnFurry = function(event){
    switch (event.which) {
    case 37:
    this.furry.direction="left";
    break;
    case 38:
    this.furry.direction="up";
    break;
    case 39:
    this.furry.direction="right";
    break;
    case 40:
    this.furry.direction="bottom";
    break;
  }}
  this.checkCoinCollision = function (){
    if (self.furry.x==self.newCoin.x&&self.furry.y==self.newCoin.y){
          this.board[this.index(this.newCoin.x,this.newCoin.y)].classList.remove('coin');
          self.score +=1;
          self.scoreElement.innerText = this.score;
          self.newCoin = new Coin();
          self.showCoin();
    }
  }
  this.gameOver = function (){
    if (this.furry.x<0||this.furry.x>9||this.furry.y<0||this.furry.y>9){
      clearInterval(this.idSetInterval);
      self.hideVisibleFurry();
      document.querySelector('#gm').innerText = this.score;
      document.querySelector("#over").classList.remove('invisible');
   }
    }
  }
var newgame = new Game;
newgame.showFurry();
newgame.showCoin();
newgame.startGame();
document.addEventListener('keydown', function(event) {
newgame.turnFurry(event);
});
