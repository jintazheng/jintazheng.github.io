"use strict";
//@ts-checks
function Border(color, pos, w, h) {
    this.visible = true;
    this.color = color;
    this.pos0 = new Vector2(pos.x - w / 2, pos.y - h / 2);
    this.pos1 = new Vector2(pos.x + w / 2, pos.y - h / 2);
    this.pos2 = new Vector2(pos.x + w / 2, pos.y + h / 2);
    this.pos3 = new Vector2(pos.x - w / 2, pos.y + h / 2);
}
Border.prototype.draw = function () {
    if (!this.visible)
        return;
    Canvas2D.drawRectImage(sprites, this.pos0, this.pos1, this.pos2, this.pos3);
    //Canvas2D.drawRect(this.color, this.pos0, this.pos1, this.pos2, this.pos3);
};
//reorder the position to 
// p0 p1 
// p3  p2
Border.prototype.reorder = function () {
    var min_x = this.pos0.x;
    var max_x = this.pos0.x;
    var min_y = this.pos0.y;
    var max_y = this.pos0.y;

    if (min_x > this.pos1.x)
        min_x = this.pos1.x;
    if (min_x > this.pos2.x)
        min_x = this.pos2.x;
    if (min_x > this.pos3.x)
        min_x = this.pos3.x;

    if (max_x < this.pos1.x)
        max_x = this.pos1.x;
    if (max_x < this.pos2.x)
        max_x = this.pos2.x;
    if (max_x < this.pos3.x)
        max_x = this.pos3.x;

    if (min_y > this.pos1.y)
        min_y = this.pos1.y;
    if (min_y > this.pos2.y)
        min_y = this.pos2.y;
    if (min_y > this.pos3.y)
        min_y = this.pos3.y;

    if (max_y < this.pos1.y)
        max_y = this.pos1.y;
    if (max_y < this.pos2.y)
        max_y = this.pos2.y;
    if (max_y < this.pos3.y)
        max_y = this.pos3.y;

    this.pos0 = new Vector2(min_x, min_y);
    this.pos1 = new Vector2(max_x, min_y);
    this.pos2 = new Vector2(max_x, max_y);
    this.pos3 = new Vector2(min_x, max_y);
}