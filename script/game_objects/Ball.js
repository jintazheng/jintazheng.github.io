"use strict";

function Ball(initPos, color) {
    this.initPos = initPos;
    this.position = initPos.copy();
    //this.origin = new Vector2(25, 25);
    this.origin = new Vector2(19, 19);
    this.velocity = Vector2.zero;
    this.color = color;
    this.moving = false;
    this.visible = true;
    this.inHole = false;
    this.lastCollision = false;
}

Object.defineProperty(Ball.prototype, "color",
    {
        get: function () {
            if (this.sprite == sprites.redBall) {
                return Color.red;
            }
            else if (this.sprite == sprites.yellowBall) {
                return Color.yellow;
            }
            else if (this.sprite == sprites.blackBall) {
                return Color.black;
            }
            else {
                return Color.white;
            }
        },
        set: function (value) {
            if (value === Color.red) {
                this.sprite = sprites.redBall;
            }
            else if (value == Color.yellow) {
                this.sprite = sprites.yellowBall;
            }
            else if (value == Color.black) {
                this.sprite = sprites.blackBall;
            }
            else {
                this.sprite = sprites.ball;
            }
        }
    });

Ball.prototype.shoot = function (power, angle) {
    if (power <= 0)
        return;

    this.moving = true;

    this.velocity = calculateBallVelocity(power, angle);
}

var calculateBallVelocity = function (power, angle) {

    return new Vector2(100 * Math.cos(angle) * power, 100 * Math.sin(angle) * power);
}

Ball.prototype.update = function (delta) {

    this.updatePosition(delta);

    this.velocity.multiplyWith(0.98);

    if (this.moving && Math.abs(this.velocity.x) < 1 && Math.abs(this.velocity.y) < 1) {
        this.stop();
    }
}

Ball.prototype.updatePosition = function (delta) {

    if (!this.moving)
        return;
    var ball = this;
    var newPos = this.position.add(this.velocity.multiply(delta));
    var collision = this.handleCollision(newPos);

    if (collision) {
        this.velocity.multiplyWith(0.95);
    } else {
        this.position = newPos;
    }
}

Ball.prototype.handleCollision = function (newPos) {

    var collision = false;
    if (0 == Game.gameWorld.groupType) {
        if (Game.policy.isXOutsideLeftBorder(newPos, this.origin)) {
            this.velocity.x = -this.velocity.x;
            this.position.x = Game.policy.leftBorderX + this.origin.x;
            collision = true;
        }
        else if (Game.policy.isXOutsideRightBorder(newPos, this.origin)) {
            this.velocity.x = -this.velocity.x;
            this.position.x = Game.policy.rightBorderX - this.origin.x;
            collision = true;
        }

        if (Game.policy.isYOutsideTopBorder(newPos, this.origin)) {
            this.velocity.y = -this.velocity.y;
            this.position.y = Game.policy.topBorderY + this.origin.y;
            collision = true;
        }
        else if (Game.policy.isYOutsideBottomBorder(newPos, this.origin)) {
            this.velocity.y = -this.velocity.y;
            this.position.y = Game.policy.bottomBorderY - this.origin.y;
            collision = true;
        }
    } else if (1 == Game.gameWorld.groupType) { //star 333 case
        //collide with pos0, pos1
        if (0 == Game.policy.isOutsidePolyBorder(newPos, this.origin)) {
            let n = new Vector2(0, 1);
            //
            let unit_v_d = this.velocity.copy();
            unit_v_d.y = -unit_v_d.y;
            unit_v_d.normalize();
            //
            let pos1 = Game.gameWorld.borders[0].pos[1].copy();
            pos1.y = - pos1.y;
            let pos = this.position.copy();
            pos.y = - pos.y;
            let pos_pos1 = pos.subtract(pos1);
            let _d = pos_pos1.dot(n);
            pos_pos1.normalize();
            let cos_d = unit_v_d.dot(n);
            let move_len = (_d - this.origin.x) / cos_d;
            let unit_v = this.velocity.copy();
            unit_v.normalize();
            this.position.addTo(unit_v.multiply(move_len - 0.0001));
            //
            let v_len = this.velocity.len();
            unit_v_d = new Vector2(-unit_v_d.x, -unit_v_d.y);
            let ref_v = (n.multiply(2 * (unit_v_d.dot(n)))).subtract(unit_v_d);
            ref_v.y = - ref_v.y;
            this.velocity = ref_v.multiply(v_len);
            collision = true;
        }//collide with pos1, pos2
        else if (1 == Game.policy.isOutsidePolyBorder(newPos, this.origin)) {
            let n = new Vector2(- Math.sqrt(3)/2, -1/2);
            //
            let unit_v_d = this.velocity.copy();
            unit_v_d.y = -unit_v_d.y;
            unit_v_d.normalize();
            //
            let pos2 = Game.gameWorld.borders[0].pos[2].copy();
            pos2.y = - pos2.y;
            let pos = this.position.copy();
            pos.y = - pos.y;
            let pos_pos2 = pos.subtract(pos2);
            let _d = pos_pos2.dot(n);
            pos_pos2.normalize();
            let cos_d = unit_v_d.dot(n);
            let move_len = (_d - this.origin.x) / cos_d;
            let unit_v = this.velocity.copy();
            unit_v.normalize();
            this.position.addTo(unit_v.multiply(move_len - 0.0001));
            //
            let v_len = this.velocity.len();
            unit_v_d = new Vector2(-unit_v_d.x, -unit_v_d.y);
            let ref_v = (n.multiply(2 * (unit_v_d.dot(n)))).subtract(unit_v_d);
            ref_v.y = - ref_v.y;
            this.velocity = ref_v.multiply(v_len);
            collision = true;
        }//collide with pos2, pos3
        else if(2 == Game.policy.isOutsidePolyBorder(newPos, this.origin)){
            let n = new Vector2(Math.sqrt(3)/2, -1/2);
            //
            let unit_v_d = this.velocity.copy();
            unit_v_d.y = -unit_v_d.y;
            unit_v_d.normalize();
            //
            let pos0 = Game.gameWorld.borders[0].pos[0].copy();
            pos0.y = - pos0.y;
            let pos = this.position.copy();
            pos.y = - pos.y;
            let pos_pos0 = pos.subtract(pos0);
            let _d = pos_pos0.dot(n);
            pos_pos0.normalize();
            let cos_d = unit_v_d.dot(n);
            let move_len = (_d - this.origin.x) / cos_d;
            let unit_v = this.velocity.copy();
            unit_v.normalize();
            this.position.addTo(unit_v.multiply(move_len - 0.0001));
            //
            let v_len = this.velocity.len();
            unit_v_d = new Vector2(-unit_v_d.x, -unit_v_d.y);
            let ref_v = (n.multiply(2 * (unit_v_d.dot(n)))).subtract(unit_v_d);
            ref_v.y = - ref_v.y;
            this.velocity = ref_v.multiply(v_len);
            collision = true;
        }
    }

    //count collision for target
    if (collision && this.color == Color.white && !this.lastCollision) {
        Game.policy.countHittingBorderTimes();
    }
    this.lastCollision = collision;
    return collision;
}

Ball.prototype.stop = function () {

    this.moving = false;
    this.velocity = Vector2.zero;
}

Ball.prototype.reset = function () {
    this.inHole = false;
    this.moving = false;
    this.velocity = Vector2.zero;
    this.position = this.initPos.copy();
    this.visible = true;
    this.lastCollision = false;
}

Ball.prototype.out = function () {

    this.position = new Vector2(0, 900);
    this.visible = false;
    this.inHole = true;

}
Ball.prototype.setPosition = function (pos) {
    this.position = pos;
}
Ball.prototype.draw = function () {
    if (!this.visible)
        return;

    Canvas2D.drawImage(this.sprite, this.position, 0, 1, new Vector2(25, 25));
};

