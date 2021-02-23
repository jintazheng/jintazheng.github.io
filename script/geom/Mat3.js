"use strict";
//define matrix with column-major layout
//default identity matrix
function Mat3() {
    this.m = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0];
}
Mat3.prototype.TranslateWith = function (v) {
   let t = new Mat3();
   for(let i = 0; i < this.m.length; i++){
      t.m[i] = this.m[i];
   }
   t.m[6] += v.x;
   t.m[7] += v.y;
   return t;
};
Mat3.prototype.multiplyWithMat = function (m1) {
   let t = new Mat3();
   t.m[0] = this.m[0] * m1.m[0] + this.m[3] * m1.m[1] + this.m[6] * m1.m[2];
   t.m[1] = this.m[1] * m1.m[0] + this.m[4] * m1.m[1] + this.m[7] * m1.m[2];
   t.m[2] = this.m[2] * m1.m[0] + this.m[5] * m1.m[1] + this.m[8] * m1.m[2];
   t.m[3] = this.m[0] * m1.m[3] + this.m[3] * m1.m[4] + this.m[6] * m1.m[5];
   t.m[4] = this.m[1] * m1.m[3] + this.m[4] * m1.m[4] + this.m[7] * m1.m[5];
   t.m[5] = this.m[2] * m1.m[3] + this.m[5] * m1.m[4] + this.m[8] * m1.m[5];
   t.m[6] = this.m[0] * m1.m[6] + this.m[3] * m1.m[7] + this.m[6] * m1.m[8];
   t.m[7] = this.m[1] * m1.m[6] + this.m[4] * m1.m[7] + this.m[7] * m1.m[8];
   t.m[8] = this.m[2] * m1.m[6] + this.m[5] * m1.m[7] + this.m[8] * m1.m[8];
   return t;
};
 Mat3.prototype.multiplyWithVec2 = function (v) {
   let res = new Vector2(0,0);
    res.x = this.m[0] * v.x + this.m[3] * v.y + this.m[6] * 1.0;
    res.y = this.m[1] * v.x + this.m[4] * v.y + this.m[7] * 1.0;
    return res;
 };
 Mat3.prototype.getRefMatAlongX = function(){
   let m0 = new Mat3();
   for(let i = 0; i < this.m.length; i++){
      m0.m[i] = this.m[i];
   }
   m0.m[4] = -1.0;
   return m0;
 };
 Mat3.prototype.getRefMatAlongY = function(){
   let m0 = new Mat3();
   for(let i = 0; i < this.m.length; i++){
      m0.m[i] = this.m[i];
   }
   m0.m[0] = -1.0;
   return m0;
};
Mat3.prototype.makeDihedralGroupR = function(k, n){
   let m0 = new Mat3();
   m0.m[0] = Math.cos(2 * Math.PI * k / n);
   m0.m[1] = Math.sin(2 * Math.PI * k / n);
   m0.m[3] = -Math.sin(2 * Math.PI * k / n);
   m0.m[4] = Math.cos(2 * Math.PI * k / n);
   return m0;
};
Mat3.prototype.makeDihedralGroupS = function(k, n){
   let m0 = new Mat3();
   m0.m[0] = Math.cos(2 * Math.PI * k / n);
   m0.m[1] = Math.sin(2 * Math.PI * k / n);
   m0.m[3] = Math.sin(2 * Math.PI * k / n);
   m0.m[4] = -Math.cos(2 * Math.PI * k / n);
   return m0;
};

