"use strict";
//pos define the center of fundamental domain, raidus define the number of translational fundamental domain (tfd)
//
//w and h are the width and height of fd
function GroupStar333(len) {
    //hardcore the radius = 1
    this.tfdNum = 6;
    this.tfd = new Array(6);
    let tempMat = new Mat3();
    this.tfd[0] = tempMat.makeDihedralGroupR(0, 3);
    this.tfd[1] = tempMat.makeDihedralGroupR(1, 3);
    this.tfd[2] = tempMat.makeDihedralGroupR(2, 3);
    this.tfd[3] = tempMat.makeDihedralGroupS(0, 3);
    this.tfd[4] = tempMat.makeDihedralGroupS(1, 3);
    this.tfd[5] = tempMat.makeDihedralGroupS(2, 3);
    //tfd with translation
    //all transform matrix
    this.group = new Array(this.tfdNum * 7);
    //for the rest translational fundamental domain
    let g = 0;
    //
    let tfd_pos = new Vector2(0,  0);
    for(let c = 0; c < 6; c++){
        this.group[g*6 + c] = this.tfd[c].TranslateWith(tfd_pos);
    }
    g++
    //
    tfd_pos = new Vector2(len/2 + len, Math.sqrt(3) / 2 * len);
    for(let c = 0; c < 6; c++){
        this.group[g*6 + c] = this.tfd[c].TranslateWith(tfd_pos);
    }
    //
    g++
    tfd_pos = new Vector2(len/2 + len, -Math.sqrt(3) / 2 * len);
    for(let c = 0; c < 6; c++){
        this.group[g*6 + c] = this.tfd[c].TranslateWith(tfd_pos);
    }
    g++
    tfd_pos = new Vector2(0,  -Math.sqrt(3) / 2 * len * 2);
    for(let c = 0; c < 6; c++){
        this.group[g*6 + c] = this.tfd[c].TranslateWith(tfd_pos);
    }
    g++
    //
    tfd_pos = new Vector2(-(len/2 + len),  -Math.sqrt(3) / 2 * len);
     for(let c = 0; c < 6; c++){
        this.group[g*6 + c] = this.tfd[c].TranslateWith(tfd_pos);
    }
    g++
    //
    tfd_pos = new Vector2(-(len/2 + len), Math.sqrt(3) / 2 * len);
     for(let c = 0; c < 6; c++){
        this.group[g*6 + c] = this.tfd[c].TranslateWith(tfd_pos);
    }
    g++
    tfd_pos = new Vector2(0, Math.sqrt(3) / 2 * len * 2);
    for(let c = 0; c < 6; c++){
       this.group[g*6 + c] = this.tfd[c].TranslateWith(tfd_pos);
   }
    this.fdSize = this.tfdNum * 7;
}
