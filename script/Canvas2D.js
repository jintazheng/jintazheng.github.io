"use strict";
//@ts-checks
function Canvas2D_Singleton() {
    this._canvas = null;
    this._canvasContext = null;
    this._canvasOffset = Vector2.zero;
}

Object.defineProperty(Canvas2D_Singleton.prototype, "offset",
    {
        get: function () {
            return this._canvasOffset;
        }
    });

Object.defineProperty(Canvas2D_Singleton.prototype, "scale",
    {
        get: function () {
            return new Vector2(this._canvas.width / Game.size.x,
                this._canvas.height / Game.size.y);
        }
    });

Canvas2D_Singleton.prototype.initialize = function (divName, canvasName) {
    this._canvas = document.getElementById(canvasName);
    this._div = document.getElementById(divName);

    if (this._canvas.getContext)
        this._canvasContext = this._canvas.getContext('2d');
    else {
        alert('Your browser is not HTML5 compatible.!');
        return;
    }
    window.onresize = Canvas2D_Singleton.prototype.resize;
    this.resize();
};

Canvas2D_Singleton.prototype.clear = function () {
    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
};

Canvas2D_Singleton.prototype.resize = function () {
    var gameCanvas = Canvas2D._canvas;
    var gameArea = Canvas2D._div;
    var widthToHeight = Game.size.x / Game.size.y;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
    } else {
        newHeight = newWidth / widthToHeight;
    }
    gameArea.style.width = newWidth + 'px';
    gameArea.style.height = newHeight + 'px';

    gameArea.style.marginTop = (window.innerHeight - newHeight) / 2 + 'px';
    gameArea.style.marginLeft = (window.innerWidth - newWidth) / 2 + 'px';
    gameArea.style.marginBottom = (window.innerHeight - newHeight) / 2 + 'px';
    gameArea.style.marginRight = (window.innerWidth - newWidth) / 2 + 'px';

    gameCanvas.width = newWidth;
    gameCanvas.height = newHeight;

    var offset = Vector2.zero;
    if (gameCanvas.offsetParent) {
        do {
            offset.x += gameCanvas.offsetLeft;
            offset.y += gameCanvas.offsetTop;
        } while ((gameCanvas = gameCanvas.offsetParent));
    }
    Canvas2D._canvasOffset = offset;
};

Canvas2D_Singleton.prototype.drawImage = function (sprite, position, rotation, scale, origin) {
    var canvasScale = this.scale;

    position = typeof position !== 'undefined' ? position : Vector2.zero;
    rotation = typeof rotation !== 'undefined' ? rotation : 0;
    scale = typeof scale !== 'undefined' ? scale : 1;
    origin = typeof origin !== 'undefined' ? origin : Vector2.zero;

    this._canvasContext.save();
    this._canvasContext.scale(canvasScale.x, canvasScale.y);
    this._canvasContext.translate(position.x, position.y);
    this._canvasContext.rotate(rotation);
    this._canvasContext.drawImage(sprite, 0, 0,
        sprite.width, sprite.height,
        -origin.x * scale, -origin.y * scale,
        sprite.width * scale, sprite.height * scale);
    this._canvasContext.restore();
};

Canvas2D_Singleton.prototype.drawText = function (text, position, origin, color, textAlign, fontname, fontsize) {
    var canvasScale = this.scale;

    position = typeof position !== 'undefined' ? position : Vector2.zero;
    origin = typeof origin !== 'undefined' ? origin : Vector2.zero;
    color = typeof color !== 'undefined' ? color : Color.black;
    textAlign = typeof textAlign !== 'undefined' ? textAlign : "top";
    fontname = typeof fontname !== 'undefined' ? fontname : "sans-serif";
    fontsize = typeof fontsize !== 'undefined' ? fontsize : "20px";

    this._canvasContext.save();
    this._canvasContext.scale(canvasScale.x, canvasScale.y);
    this._canvasContext.translate(position.x - origin.x, position.y - origin.y);
    this._canvasContext.textBaseline = 'top';
    this._canvasContext.font = fontsize + " " + fontname;
    this._canvasContext.fillStyle = color.toString();
    this._canvasContext.textAlign = textAlign;
    this._canvasContext.fillText(text, 0, 0);
    this._canvasContext.restore();
};
Canvas2D_Singleton.prototype.drawRect = function (color, pos0, pos1, pos2, pos3) {
    var canvasScale = this.scale;
    this._canvasContext.save();
    this._canvasContext.scale(canvasScale.x, canvasScale.y);
    this._canvasContext.strokeStyle = color.toString();
    this._canvasContext.beginPath();
    this._canvasContext.moveTo(pos0.x, pos0.y);
    this._canvasContext.lineTo(pos1.x, pos1.y);
    this._canvasContext.moveTo(pos1.x, pos1.y);
    this._canvasContext.lineTo(pos2.x, pos2.y);
    this._canvasContext.moveTo(pos2.x, pos2.y);
    this._canvasContext.lineTo(pos3.x, pos3.y);
    this._canvasContext.moveTo(pos3.x, pos3.y);
    this._canvasContext.lineTo(pos0.x, pos0.y);
    this._canvasContext.closePath();
    this._canvasContext.stroke();
    this._canvasContext.restore();
};
Canvas2D_Singleton.prototype.drawPoly = function (color, pos) {
    var canvasScale = this.scale;
    this._canvasContext.save();
    this._canvasContext.scale(canvasScale.x, canvasScale.y);
    this._canvasContext.strokeStyle = color.toString();
    this._canvasContext.beginPath();
    for (let p = 0; p < pos.length; p++) {
        this._canvasContext.moveTo(pos[p].x, pos[p].y);
        this._canvasContext.lineTo(pos[(p + 1) % (pos.length)].x, pos[(p + 1) % (pos.length)].y);
    }
    this._canvasContext.closePath();
    this._canvasContext.stroke();
    this._canvasContext.restore();
};
Canvas2D_Singleton.prototype.drawPolyWithImage = function (sprite, pos) {
    for (let p = 0; p < pos.length; p++) {
        var canvasScale = this.scale;
        this._canvasContext.save();
        this._canvasContext.scale(canvasScale.x, canvasScale.y);
        let pos0 = new Vector2(pos[p].x, pos[p].y);
        let pos1 = new Vector2(pos[(p + 1) % (pos.length)].x, pos[(p + 1) % (pos.length)].y);
        let cosr = pos1.subtract(pos0);
        cosr.normalize();
        let horizontal_v = new Vector2(1.0, 0.0);
        let costheta = cosr.dot(horizontal_v); 
        let rotation = Math.acos(costheta);
        this._canvasContext.translate(pos0.x, pos0.y - sprite.bar333.height);
        let sign_r = 1;
        if(pos1.y > pos0.y)
            sign_r = -1;
        this._canvasContext.rotate(-rotation * sign_r);
        this._canvasContext.translate(-pos0.x, -(pos0.y - sprite.bar333.height));
        this._canvasContext.drawImage(sprite.bar333,
            pos0.x, pos0.y - sprite.bar333.height,
            sprite.bar333.width , sprite.bar333.height );
        this._canvasContext.restore();
    }
};

Canvas2D_Singleton.prototype.drawLine = function (color, pos0, pos1) {
    var canvasScale = this.scale;
    this._canvasContext.save();
    this._canvasContext.scale(canvasScale.x, canvasScale.y);
    this._canvasContext.strokeStyle = color.toString();
    this._canvasContext.beginPath();
    this._canvasContext.moveTo(pos0.x, pos0.y);
    this._canvasContext.lineTo(pos1.x, pos1.y);
    this._canvasContext.closePath();
    this._canvasContext.stroke();
    this._canvasContext.restore();
};
Canvas2D_Singleton.prototype.drawCircle = function (color, pos, r) {
    var canvasScale = this.scale;
    this._canvasContext.save();
    this._canvasContext.scale(canvasScale.x, canvasScale.y);
    this._canvasContext.strokeStyle = color.toString();
    this._canvasContext.beginPath();
    this._canvasContext.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
    this._canvasContext.closePath();
    this._canvasContext.stroke();
    this._canvasContext.restore();
}
Canvas2D_Singleton.prototype.drawRectImage = function (sprite, pos0, pos1, pos2, pos3) {

    var canvasScale = this.scale;
    var scale = 1;
    this._canvasContext.save();
    this._canvasContext.scale(canvasScale.x, canvasScale.y);
    //bar0
    this._canvasContext.drawImage(sprite.bar0,
        pos0.x, pos0.y,
        sprite.bar0.width * scale, sprite.bar0.height * scale);
    //barv0
    this._canvasContext.drawImage(sprite.barv0,
        pos1.x - sprite.barv0.width, pos1.y,
        sprite.barv0.width * scale, sprite.barv0.height * scale);
    //bar0
    this._canvasContext.drawImage(sprite.bar0,
        pos3.x, pos3.y - sprite.bar0.height,
        sprite.bar0.width * scale, sprite.bar0.height * scale);
    //barv0
    this._canvasContext.drawImage(sprite.barv0,
        pos0.x, pos0.y,
        sprite.barv0.width * scale, sprite.barv0.height * scale);
    this._canvasContext.restore();
};
var Canvas2D = new Canvas2D_Singleton();

