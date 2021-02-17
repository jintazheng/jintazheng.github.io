
function GamePolicy(){
    this.foul = false;
    this.leftBorderX = Game.size.x/2 - BORDER_SIZE/2;
    this.rightBorderX = Game.size.x/2 + BORDER_SIZE/2;
    this.topBorderY = Game.size.y - BORDER_SIZE;
    this.bottomBorderY = Game.size.y;
    this.target = 0;
    this.whiteHitRed = false;
    this.hitBorderTimes = 0;

    this.heightInterv = 45;
    this.weithInterv = 210;
    this.gameover = false;
}

GamePolicy.prototype.reset = function(){
    this.foul = false;
    this.whiteHitRed = false;
    this.hitBorderTimes = 0;
}
GamePolicy.prototype.drawOver = function(){
    if(this.gameover && !Game.gameWorld.ballsMoving()){
        Canvas2D.clear();
        Canvas2D.drawImage(sprites.background);
        Canvas2D.drawText("Well done, Thank you !", new Vector2(this.weithInterv, Game.size.y/2), new Vector2(150,0), "#11b85c", "top", "Impact", "100px");
    }
}
GamePolicy.prototype.drawScores = function(){//"#096834"

    if(this.whiteHitRed){
        if(1 == this.hitBorderTimes && 0 == this.target){
            this.target = 1;
        }else if(2 == this.hitBorderTimes && 1 == this.target){
            this.target = 2;
        }
    }

    if(0 == this.target){
        Canvas2D.drawText("Hit the red ball with 1 bounce !", new Vector2(this.weithInterv,0), new Vector2(150,0), "#11b85c", "top", "Impact", "40px");
    }else if(1 == this.target){
        Canvas2D.drawText("Hit the red ball with 2 bounces !", new Vector2(this.weithInterv,0), new Vector2(150,0), "#11b85c", "top", "Impact", "40px");
    }else if(2 == this.target){
        Canvas2D.drawText("Hit the red ball with 2 bounces !", new Vector2(this.weithInterv,0), new Vector2(150,0), "#11b85c", "top", "Impact", "40px");
        this.gameover = true;
    }
    Canvas2D.drawText("Bouncing from borders times: " + (this.hitBorderTimes), new Vector2(this.weithInterv, this.heightInterv), new Vector2(150,0), "#0e964b", "top", "Impact", "40px");
    if(this.whiteHitRed){
        Canvas2D.drawText("The white ball hit the red ball: Yes", new Vector2(this.weithInterv,  this.heightInterv * 2), new Vector2(150,0), "#0e964b", "top", "Impact", "40px");
    }else{
        Canvas2D.drawText("The white ball hit the red ball: No", new Vector2(this.weithInterv, this.heightInterv * 2), new Vector2(150,0), "#0e964b", "top", "Impact", "40px");
    }
}

GamePolicy.prototype.checkColisionValidity = function(ball1,ball2){
    if(ball1.color != ball2.color && ball1.color != Color.yellow && ball2.color != Color.yellow){
        this.whiteHitRed = true;
    }
}

GamePolicy.prototype.isXOutsideLeftBorder = function(pos, origin){
    return (pos.x - origin.x) < this.leftBorderX;
}
GamePolicy.prototype.isXOutsideRightBorder = function(pos, origin){
    return (pos.x + origin.x) > this.rightBorderX;
}
GamePolicy.prototype.isYOutsideTopBorder = function(pos, origin){
    return (pos.y - origin.y) < this.topBorderY;
}
GamePolicy.prototype.isYOutsideBottomBorder = function(pos , origin){
    return (pos.y + origin.y) > this.bottomBorderY;
}

GamePolicy.prototype.isOutsideBorder = function(pos,origin){
    return this.isXOutsideLeftBorder(pos,origin) || this.isXOutsideRightBorder(pos,origin) || 
    this.isYOutsideTopBorder(pos, origin) || this.isYOutsideBottomBorder(pos , origin);
}
GamePolicy.prototype.countHittingBorderTimes = function(){
    if(!this.whiteHitRed){
        this.hitBorderTimes= this.hitBorderTimes + 1;
    }
}