"use strict";

function Stick(position){
    this.position = position;
    this.origin = new Vector2(970,11);
    this.shotOrigin = new Vector2(950,11);
    this.shooting = false;
    this.visible = true;
    this.rotation = 0;
    this.power = 15;
    this.trackMouse = true;
}

Stick.prototype.handleInput = function (delta) {

    if (this.power>0 && Mouse.left.down && !Game.gameWorld.whiteBall.moving){
      var strike = sounds.strike.cloneNode(true);
      strike.volume = (this.power/(10))<1?(this.power/(10)):1;
      strike.play();
      this.shooting = true;
      this.origin = this.shotOrigin.copy();
      // count times of hitting white ball
      Game.policy.hitWhiteBallTimes++;
      //direction
      Game.policy.HitDir = this.rotation;
      Game.gameWorld.whiteBall.shoot(this.power, this.rotation);
      KEYBOARD_INPUT_ON = false;
      Game.policy.foul = true;
      var stick = this;
      setTimeout(function(){stick.visible = false;}, 500);
    }
    else if(this.trackMouse){
      var opposite = Mouse.position.y - this.position.y;
      var adjacent = Mouse.position.x - this.position.x;
      this.rotation = Math.atan2(opposite, adjacent);
    }
};

Stick.prototype.shoot = function(power, rotation){
  this.power = power;
  this.rotation = rotation;

  if(Game.sound && SOUND_ON){
    var strike = sounds.strike.cloneNode(true);
    strike.volume = (this.power/(10))<1?(this.power/(10)):1;
    strike.play();
  }
  this.shooting = true;
  this.origin = this.shotOrigin.copy();
  Game.gameWorld.whiteBall.shoot(this.power, this.rotation);
  var stick = this;
  setTimeout(function(){stick.visible = false;}, 500);
}

Stick.prototype.update = function(){
  if(this.shooting && !Game.gameWorld.whiteBall.moving)
    this.reset();
};

Stick.prototype.reset = function(){
  this.position.x = Game.gameWorld.whiteBall.position.x;
  this.position.y = Game.gameWorld.whiteBall.position.y;
	this.origin = new Vector2(970,11);
  this.shooting = false;
  this.visible = true;
	this.power = 15;
};

Stick.prototype.draw = function () {
  if(!this.visible)
    return;
  Canvas2D.drawImage(sprites.stick, this.position,this.rotation,1, this.origin);
};
