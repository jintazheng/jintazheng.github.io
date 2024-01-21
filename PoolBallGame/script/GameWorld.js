"use strict";

function GameWorld() {
    //0 is star2222, and 1 is star333
    this.groupType = 0;
    this.applyGroup = true;
    this.resetGameWorld();
    this.stick = new Stick({ x: this.whiteBall.position.x, y: this.whiteBall.position.y });
    this.gameOver = false;

    this.step_inv = 0;

    if (0 == this.groupType) {
        this.borders = [
            new Border(Color.red, new Vector2(
                Game.size.x / 2,
                Game.size.y - BORDER_SIZE / 2),
                (BORDER_SIZE),
                (BORDER_SIZE))];
        //group
        this.star2222group = new GroupStar2222(RADIUS, BORDER_SIZE, BORDER_SIZE);
        this.yellowBallGroup = new Array(this.star2222group.group.length);
        this.redBallsGroup = new Array(this.star2222group.group.length);
        this.whiteBallsGroup = new Array(this.star2222group.group.length);
        this.bordersGroup = new Array(this.star2222group.group.length);

        for (let i = 0; i < this.star2222group.group.length; i++) {
            this.yellowBallGroup[i] = new Ball(new Vector2(500, 633 + this.step_inv), Color.yellow);
            this.redBallsGroup[i] = new Ball(new Vector2(300, 633), Color.red);
            this.whiteBallsGroup[i] = new Ball(new Vector2(
                Game.size.x / 2,
                Game.size.y - BORDER_SIZE / 2), Color.white);
            this.bordersGroup[i] = new Border(Color.red, new Vector2(
                Game.size.x / 2,
                Game.size.y - BORDER_SIZE / 2),
                (BORDER_SIZE),
                (BORDER_SIZE));
        }
        //get the borders
        // reflection ball
        if (this.applyGroup) {
            var borderPos0 = this.borders[0].pos0.subtract(this.borders[0].pos0);
            var borderPos1 = this.borders[0].pos1.subtract(this.borders[0].pos0);
            var borderPos2 = this.borders[0].pos2.subtract(this.borders[0].pos0);
            var borderPos3 = this.borders[0].pos3.subtract(this.borders[0].pos0);
            for (var i = 0; i < this.star2222group.group.length; i++) {
                this.bordersGroup[i].pos0 = this.borders[0].pos0.add(this.star2222group.group[i].multiplyWithVec2(borderPos0));
                this.bordersGroup[i].pos1 = this.borders[0].pos0.add(this.star2222group.group[i].multiplyWithVec2(borderPos1));
                this.bordersGroup[i].pos2 = this.borders[0].pos0.add(this.star2222group.group[i].multiplyWithVec2(borderPos2));
                this.bordersGroup[i].pos3 = this.borders[0].pos0.add(this.star2222group.group[i].multiplyWithVec2(borderPos3));
                this.bordersGroup[i].reorder();
            }
        }
    } else if (1 == this.groupType) {
        this.borders = [
            new PolyBorder(Color.red, 3)];
        this.borders[0].pos[0] = new Vector2(
            Game.size.x / 2 - BORDER_SIZE_333 / 2,
            Game.size.y - Math.sqrt(3) / 2 * BORDER_SIZE_333);
        this.borders[0].pos[1] = new Vector2(
            Game.size.x / 2 + BORDER_SIZE_333 / 2,
            Game.size.y - Math.sqrt(3) / 2 * BORDER_SIZE_333);
        this.borders[0].pos[2] = new Vector2(
                Game.size.x / 2,
                Game.size.y - Math.sqrt(3) / 2 * BORDER_SIZE_333 - Math.sqrt(3) / 2 * BORDER_SIZE_333);
        //333 group
        this.star333group = new GroupStar333(BORDER_SIZE_333);
        this.yellowBallGroup = new Array(this.star333group.group.length);
        this.redBallsGroup = new Array(this.star333group.group.length);
        this.whiteBallsGroup = new Array(this.star333group.group.length);
        this.bordersGroup = new Array(this.star333group.group.length);
        for (let i = 0; i < this.star333group.group.length; i++) {
            this.yellowBallGroup[i] = new Ball(new Vector2(500, 633), Color.yellow);
            this.redBallsGroup[i] = new Ball(new Vector2(300, 633), Color.red);
            this.whiteBallsGroup[i] = new Ball(new Vector2( Game.size.x / 2,Game.size.y - BORDER_SIZE_333 / 2), Color.white);
            this.bordersGroup[i] = new PolyBorder(Color.red, 3);
        }
        //get the borders
        // reflection ball
        if (this.applyGroup) {
            var borderPos0 = this.borders[0].pos[0].subtract(this.borders[0].pos[0]);
            var borderPos1 = this.borders[0].pos[1].subtract(this.borders[0].pos[0]);
            var borderPos2 = this.borders[0].pos[2].subtract(this.borders[0].pos[0]);
            for (var i = 0; i < this.star333group.group.length; i++) {
                this.bordersGroup[i].pos[0] = this.borders[0].pos[0].add(this.star333group.group[i].multiplyWithVec2(borderPos0));
                this.bordersGroup[i].pos[1] = this.borders[0].pos[0].add(this.star333group.group[i].multiplyWithVec2(borderPos1));
                this.bordersGroup[i].pos[2] = this.borders[0].pos[0].add(this.star333group.group[i].multiplyWithVec2(borderPos2));
            }
        }
    }
}
GameWorld.prototype.resetGameWorld = function () {
    if (0 == this.groupType) {
        this.redBalls = [new Ball(new Vector2(Game.size.x / 2 + BORDER_SIZE / 3, Game.size.y - BORDER_SIZE / 1.9), Color.red)]
        this.yellowBalls = [new Ball(new Vector2(Game.size.x / 2 - BORDER_SIZE / 9, Game.size.y - BORDER_SIZE / 3), Color.yellow)];
        this.whiteBall = new Ball(new Vector2(Game.size.x / 2 - BORDER_SIZE / 3, Game.size.y - BORDER_SIZE / 4), Color.white);
    } else if (1 == this.groupType) {
        this.redBalls = [new Ball(new Vector2(Game.size.x / 2 + BORDER_SIZE_333 / 5, Game.size.y - BORDER_SIZE_333 / 3  - Math.sqrt(3) / 2 * BORDER_SIZE_333), Color.red)]
        this.yellowBalls = [new Ball(new Vector2(Game.size.x / 2 , Game.size.y - BORDER_SIZE_333 / 2.5 - Math.sqrt(3) / 2 * BORDER_SIZE_333), Color.yellow)];
        this.whiteBall = new Ball(new Vector2(Game.size.x / 2 - BORDER_SIZE_333 / 5, Game.size.y - BORDER_SIZE_333 / 3 - Math.sqrt(3) / 2 * BORDER_SIZE_333), Color.white);
    }
    this.balls = [this.yellowBalls[0], this.redBalls[0], this.whiteBall];
    //this.stick.reset();     
};
GameWorld.prototype.getBallsSetByColor = function (color) {

    if (color === Color.red) {
        return this.redBalls;
    }
    if (color === Color.yellow) {
        return this.yellowBalls;
    }
    if (color === Color.white) {
        return this.whiteBall;
    }
    if (color === Color.black) {
        return this.blackBall;
    }
};

GameWorld.prototype.handleInput = function (delta) {
    this.stick.handleInput(delta);
};

GameWorld.prototype.update = function (delta) {

    for (var i = 0; i < this.balls.length; i++) {
        for (var j = i + 1; j < this.balls.length; j++) {
            this.handleCollision(this.balls[i], this.balls[j], delta);
        }
    }

    for (var i = 0; i < this.balls.length; i++) {
        this.balls[i].update(delta);
    }
    this.stick.update(delta);
    if (!this.ballsMoving()) {
        if (Game.policy.foul) {
            Game.restartGame();
        }
    }
    if (0 == this.groupType) {
        // reflection ball
        if (this.applyGroup) {
            var yellowPos = this.yellowBalls[0].position.subtract(this.borders[0].pos0);
            var redPos = this.redBalls[0].position.subtract(this.borders[0].pos0);
            var whitePos = this.whiteBall.position.subtract(this.borders[0].pos0);
            for (var i = 0; i < this.star2222group.group.length; i++) {
                this.yellowBallGroup[i].setPosition(this.borders[0].pos0.add(this.star2222group.group[i].multiplyWithVec2(yellowPos)));
                this.redBallsGroup[i].setPosition(this.borders[0].pos0.add(this.star2222group.group[i].multiplyWithVec2(redPos)));
                this.whiteBallsGroup[i].setPosition(this.borders[0].pos0.add(this.star2222group.group[i].multiplyWithVec2(whitePos)));
            }
        }
    } else if (1 == this.groupType) {
        // reflection ball
        if (this.applyGroup) {
            var yellowPos = this.yellowBalls[0].position.subtract(this.borders[0].pos[0]);
            var redPos = this.redBalls[0].position.subtract(this.borders[0].pos[0]);
            var whitePos = this.whiteBall.position.subtract(this.borders[0].pos[0]);
            for (var i = 0; i < this.star333group.group.length; i++) {
                this.yellowBallGroup[i].setPosition(this.borders[0].pos[0].add(this.star333group.group[i].multiplyWithVec2(yellowPos)));
                this.redBallsGroup[i].setPosition(this.borders[0].pos[0].add(this.star333group.group[i].multiplyWithVec2(redPos)));
                this.whiteBallsGroup[i].setPosition(this.borders[0].pos[0].add(this.star333group.group[i].multiplyWithVec2(whitePos)));
            }
        }
    }

};

GameWorld.prototype.whiteBallOverlapsBalls = function () {

    let ballsOverlap = false;
    for (var i = 0; i < this.balls.length; i++) {
        if (this.whiteBall !== this.balls[i]) {
            if (this.whiteBall.position.distanceFrom(this.balls[i].position) < BALL_SIZE) {
                ballsOverlap = true;
            }
        }
    }

    return ballsOverlap;
}

GameWorld.prototype.ballsMoving = function () {

    var ballsMoving = false;

    for (var i = 0; i < this.balls.length; i++) {
        if (this.balls[i].moving) {
            ballsMoving = true;
        }
    }

    return ballsMoving;
}

GameWorld.prototype.handleCollision = function (ball1, ball2, delta) {

    if (!ball1.moving && !ball2.moving)
        return;

    var ball1NewPos = ball1.position.add(ball1.velocity.multiply(delta));
    var ball2NewPos = ball2.position.add(ball2.velocity.multiply(delta));

    var dist = ball1NewPos.distanceFrom(ball2NewPos);

    if (dist < BALL_SIZE) {
        Game.policy.checkColisionValidity(ball1, ball2);

        var power = (Math.abs(ball1.velocity.x) + Math.abs(ball1.velocity.y)) +
            (Math.abs(ball2.velocity.x) + Math.abs(ball2.velocity.y));
        power = power * 0.00482;

        if (Game.sound && SOUND_ON) {
            var ballsCollide = sounds.ballsCollide.cloneNode(true);
            ballsCollide.volume = (power / (20)) < 1 ? (power / (20)) : 1;
            ballsCollide.play();
        }

        var opposite = ball1.position.y - ball2.position.y;
        var adjacent = ball1.position.x - ball2.position.x;
        var rotation = Math.atan2(opposite, adjacent);

        ball1.moving = true;
        ball2.moving = true;

        var velocity2 = new Vector2(90 * Math.cos(rotation + Math.PI) * power, 90 * Math.sin(rotation + Math.PI) * power);
        ball2.velocity = ball2.velocity.addTo(velocity2);

        ball2.velocity.multiplyWith(0.97);

        var velocity1 = new Vector2(90 * Math.cos(rotation) * power, 90 * Math.sin(rotation) * power);
        ball1.velocity = ball1.velocity.addTo(velocity1);

        ball1.velocity.multiplyWith(0.97);
    }

}

GameWorld.prototype.draw = function () {
    if(Game.policy.gameover && !this.ballsMoving()){
        Canvas2D.drawImage(sprites.background);
    }else if(0 == this.groupType){
        Canvas2D.drawImage(sprites.background2222);
    }else if(1 == this.groupType){
        Canvas2D.drawImage(sprites.background333);
    }
    
    if (0 == this.groupType) {
        //draw group
        if (this.applyGroup) {
            for (var i = 0; i < this.star2222group.group.length; i++) {
                this.bordersGroup[i].draw();
                this.yellowBallGroup[i].draw();
                this.redBallsGroup[i].draw();
                this.whiteBallsGroup[i].draw();
            }
        } else {
            for (var i = 0; i < this.borders.length; i++) {
                this.borders[i].draw();
            }
            for (var i = 0; i < this.balls.length; i++) {
                this.balls[i].draw();
            }
        }
    } else if (1 == this.groupType) {
        //
        if (this.applyGroup) {
            //
            for (var i = 0; i < this.star333group.group.length; i++) {
                this.bordersGroup[i].draw();
                this.yellowBallGroup[i].draw();
                this.redBallsGroup[i].draw();
                this.whiteBallsGroup[i].draw();
            }
        } else {
            for (var i = 0; i < this.borders.length; i++) {
                this.borders[i].draw();
            }
            for (var i = 0; i < this.balls.length; i++) {
                this.balls[i].draw();
            }
        }
    }
    Game.policy.drawScores();
    this.stick.draw();
    //draw hint
    if (!this.ballsMoving()) {
        Canvas2D.drawLine(Color.white, this.whiteBall.position, Mouse._position);
        Canvas2D.drawCircle(Color.white, Mouse._position, BALL_SIZE / 2);
    }
    Game.policy.drawOver();
};

GameWorld.prototype.reset = function () {
    this.gameOver = false;

    for (var i = 0; i < this.balls.length; i++) {
        this.balls[i].reset();
    }

    this.stick.reset();

    if (AI_ON && AI_PLAYER_NUM === 0) {
        AI.startSession();
    }
};

GameWorld.prototype.initiateState = function (balls) {

    for (var i = 0; i < this.balls.length; i++) {
        this.balls[i].position.x = balls[i].position.x;
        this.balls[i].position.y = balls[i].position.y;
        this.balls[i].visible = balls[i].visible;
        this.balls[i].inHole = balls[i].inHole;
    }
    this.stick.position = this.whiteBall.position;
}

