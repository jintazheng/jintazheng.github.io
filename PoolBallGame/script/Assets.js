"use strict";

var sprites = {};
var sounds = {};

Game.loadAssets = function () {
    var loadSprite = function (sprite) {
        return Game.loadSprite("assets/sprites/" + sprite);
    };

     var loadSound = function (sound) {
        return new Audio("assets/sounds/" + sound);
    };

    sprites.mainMenuBackground = loadSprite("main_menu_background.png");
    sprites.background = loadSprite("spr_background3.png");
    sprites.background2222 = loadSprite("spr_background2222.png");
    sprites.background333 = loadSprite("spr_background333.png");
    sprites.ball = loadSprite("spr_ball2.png");
    sprites.redBall = loadSprite("spr_redBall2.png");
    sprites.yellowBall = loadSprite("spr_blackBall2.png");
    sprites.blackBall = loadSprite("spr_blackBall2.png");
    sprites.stick = loadSprite("spr_stick.png");
    sprites.twoPlayersButton = loadSprite("2_players_button.png");
    sprites.twoPlayersButtonHover = loadSprite("2_players_button_hover.png");
    sprites.onePlayersButton = loadSprite("1_player_button.png");
    sprites.onePlayersButtonHover = loadSprite("1_player_button_hover.png");
    sprites.muteButton = loadSprite("mute_button.png");
    sprites.muteButtonHover = loadSprite("mute_button_hover.png");
    sprites.muteButtonPressed = loadSprite("mute_button_pressed.png");
    sprites.muteButtonPressedHover = loadSprite("mute_button_pressed_hover.png");
    sprites.easyButton = loadSprite("easy_button.png");
    sprites.easyButtonHover = loadSprite("easy_button_hover.png");
    sprites.mediumButton = loadSprite("medium_button.png");
    sprites.mediumButtonHover = loadSprite("medium_button_hover.png");
    sprites.hardButton = loadSprite("hard_button.png");
    sprites.hardButtonHover = loadSprite("hard_button_hover.png");
    sprites.backButton = loadSprite("back_button.png");
    sprites.backButtonHover = loadSprite("back_button_hover.png");
    sprites.continueButton = loadSprite("continue_button.png");
    sprites.continueButtonHover = loadSprite("continue_button_hover.png");
    sprites.insaneButton = loadSprite("insane_button.png");
    sprites.insaneButtonHover = loadSprite("insane_button_hover.png");
    sprites.aboutButton = loadSprite("about_button.png");
    sprites.aboutButtonHover = loadSprite("about_button_hover.png");
    sprites.controls = loadSprite("controls.png");
    sprites.bar0 = loadSprite("bar0.png");
    sprites.bar1 = loadSprite("bar1.png");
    sprites.bar2 = loadSprite("bar2.png");
    sprites.bar3 = loadSprite("bar3.png");
    sprites.bar333 = loadSprite("bar333.png");
    sprites.barv0 = loadSprite("barv0.png");
    sounds.side = loadSound("Side.wav");
    sounds.ballsCollide = loadSound("BallsCollide.wav");
    sounds.strike = loadSound("Strike.wav");
    sounds.hole = loadSound("Hole.wav");
    
    // Bossa Antigua Kevin MacLeod (incompetech.com)
    // Licensed under Creative Commons: By Attribution 3.0 License
    // http://creativecommons.org/licenses/by/3.0/
    sounds.jazzTune = loadSound("Bossa Antigua.mp3");
}

sounds.fadeOut = function(sound) {

    var fadeAudio = setInterval(function () {

        if(GAME_STOPPED)
            return;

        // Only fade if past the fade out point or not at zero already
        if ((sound.volume >= 0.05)) {
            sound.volume -= 0.05;
        }
        else{
            sound.pause();
            clearInterval(fadeAudio);
        }
    }, 400);
}