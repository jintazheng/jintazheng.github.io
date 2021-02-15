"use strict";
//@ts-checks
function Border(color, pos, w, h){
    this.visible = true;
    this.color = color; 
    this.pos0 = new Vector2(pos.x - w/2, pos.y  - h/2);
    this.pos1 = new Vector2(pos.x + w/2, pos.y  - h/2);
    this.pos2 = new Vector2(pos.x + w/2, pos.y  + h/2);
    this.pos3 = new Vector2(pos.x - w/2, pos.y  + h/2);
}
Border.prototype.draw = function () {
    if(!this.visible)
        return;

	Canvas2D.drawRect(this.color, this.pos0, this.pos1, this.pos2, this.pos3);
};