"use strict";
//@ts-checks
function PolyBorder(color, num) {
    this.visible = true;
    this.color = color;
    this.pos = new Array(num);
    for(let p = 0; p < num; p++){
        this.pos[p] = new Vector2(0,0);
    }
}
PolyBorder.prototype.draw = function () {
    if (!this.visible)
        return;
    //dray polygon
  //  Canvas2D.drawPoly(this.color, this.pos);
    Canvas2D.drawPolyWithImage(sprites,this.pos);
};
