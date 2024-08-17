"use strict";

var requestAnimationFrame = (function () {
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function Game_Singleton() {
    this.size = undefined;
    this.spritesStillLoading = 0;
    this.gameWorld = undefined;
    this.sound = true;
    this.mainMenu = new Menu();
    this.userId = "";
}

Game_Singleton.prototype.start = function (divName, canvasName, x, y) {
    this.size = new Vector2(x,y);
    Canvas2D.initialize(divName, canvasName);
    this.loadAssets();
    this.assetLoadingLoop();
};

Game_Singleton.prototype.initialize = function () {
    this.gameWorld = new GameWorld();
    this.policy = new GamePolicy();
    
    this.initMenus();

    AI.init(this.gameWorld, this.policy);
    //initialize data base
    //AV.init({
     //   appId: "SscV2MImxUueELA2wBws2JQr-gzGzoHsz",
    //    appKey: "hTELzwv4KMwLXu7lLt1kAByn",
    //    serverURL: "https://sscv2mim.lc-cn-n1-shared.com"
   // });
   // localStorage.setItem('debug', 'leancloud*');
    //get user id
    var time = new Date().getTime();
    var random_num = Math.floor(Math.random() * Math.floor(1000));
    this.userId = time.toString().concat(random_num.toString());
};

Game_Singleton.prototype.initMenus = function(inGame){

    let labels = generateMainMenuLabels("Pool Ball Game");

    let buttons = generateMainMenuButtons(inGame);

    this.mainMenu.init
    (
        sprites.mainMenuBackground,
        labels,
        buttons,
        sounds.jazzTune
    );
}
Game_Singleton.prototype.loadSprite = function (imageName) {
    console.log("Loading sprite: " + imageName);
    var image = new Image();
    image.src = imageName;
    this.spritesStillLoading += 1;
    image.onload = function () {
        Game.spritesStillLoading -= 1;
    };
    return image;
};

Game_Singleton.prototype.assetLoadingLoop = function () {
    if (!this.spritesStillLoading > 0)
        requestAnimationFrame(Game.assetLoadingLoop);
    else {
        Game.initialize();
        requestAnimationFrame(this.mainMenu.load.bind(this.mainMenu));
    }
};

Game_Singleton.prototype.handleInput = function(){

    if(Keyboard.down(Keys.escape)){
        GAME_STOPPED = true;
        Game.initMenus(true);
        requestAnimationFrame(Game.mainMenu.load.bind(this.mainMenu));
    }
}

Game_Singleton.prototype.startNewGame = function(){
    Canvas2D._canvas.style.cursor = "auto";
    KEYBOARD_INPUT_ON = true;
    Keyboard.reset();
    Mouse.reset();
    Game.gameWorld = new GameWorld();
    Game.policy = new GamePolicy();

    Canvas2D.clear();
    Canvas2D.drawImage(
        sprites.controls, 
        new Vector2(Game.size.x/2,Game.size.y/2), 
        0, 
        1, 
        new Vector2(sprites.controls.width/2,sprites.controls.height/2)
    );
    Game.policy.HelpMenuTime = true;
    Game.policy.UsedTimeHit = new Date().getTime();
     setTimeout(()=>{
         Game.mainLoop();
     },5000);
}
Game_Singleton.prototype.restartGame = function(){
    Canvas2D._canvas.style.cursor = "auto";
    KEYBOARD_INPUT_ON = true;
    Keyboard.reset();
    Mouse.reset();
    Game.gameWorld.reset();
    Game.policy.reset();
    Canvas2D.clear();
    if(Game.policy.target2FirstTime){
        Game.policy.UsedTimeHit = new Date().getTime();
        Game.policy.target2FirstTime = false;
    }
}

Game_Singleton.prototype.continueGame = function(){
    Canvas2D._canvas.style.cursor = "auto";

    requestAnimationFrame(Game.mainLoop);
}

Game_Singleton.prototype.mainLoop = function () {
    
    if(DISPLAY && !GAME_STOPPED){
        Game.gameWorld.handleInput(DELTA);
        Game.gameWorld.update(DELTA);
        Canvas2D.clear();
        Game.gameWorld.draw();
        Mouse.reset();
        Game.handleInput();
        requestAnimationFrame(Game.mainLoop);
    }
};

var Game = new Game_Singleton();

