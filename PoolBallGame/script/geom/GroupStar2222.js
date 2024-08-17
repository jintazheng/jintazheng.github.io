"use strict";
//pos define the center of fundamental domain, raidus define the number of translational fundamental domain (tfd)
//radius = 0, 1 tfd, radius = 1, 9 tfds
//w and h are the width and height of fd
function GroupStar2222(radius, w, h) {
    this.tfdNum = 0;
    if(radius == 0){
        this.tfdNum = 1;
    }else{
       this.tfdNum = (radius * 2 + 1) * (radius + 1);
    }
    this.tfd = new Array(4);
    this.tfd[0] = new Mat3();
    var ref_x_m = new Mat3();
    ref_x_m = ref_x_m.getRefMatAlongX();
    var ref_y_m = new Mat3();
    ref_y_m = ref_y_m.getRefMatAlongY();
    this.tfd[1] = ref_x_m;
    this.tfd[2] = ref_y_m.multiplyWithMat(this.tfd[1]);
    this.tfd[3] = ref_x_m.multiplyWithMat(this.tfd[2]);
    //tfd with translation
    //all transform matrix
    this.group = new Array(this.tfdNum * 4);
    //for the rest translational fundamental domain
    let g_i = 0;
    for(let c = -radius; c <= radius; c++){
        for(let r = 0;  r<= radius; r++){
            let tfd_pos = new Vector2(c * 2 * w, - r * 2 * h);
            this.group[g_i] = new Mat3();
            this.group[g_i] = this.tfd[0].TranslateWith(tfd_pos);
            g_i++;
            this.group[g_i] = new Mat3();
            this.group[g_i] = this.tfd[1].TranslateWith(tfd_pos);
            g_i++;
            this.group[g_i] = new Mat3();
            this.group[g_i] = this.tfd[2].TranslateWith(tfd_pos);
            g_i++;
            this.group[g_i] = new Mat3();
            this.group[g_i] = this.tfd[3].TranslateWith(tfd_pos);
            g_i++;
        }
    }
      
    this.fdSize = this.tfdNum * 4;
}
