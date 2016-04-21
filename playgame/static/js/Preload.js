
var soccer = soccer || {};


soccer.Preload = function() {};

soccer.Preload.prototype = {
    preload: function() {
	
        //load images
	    this.load.image('ball','../static/playgame/ball.png');
        this.load.image('field','../static/playgame/soccerfield.jpg');
        this.load.spritesheet('player','../static/playgame/spineboy-old-walk.png',105,170,27);
        this.load.spritesheet('opponent','../static/playgame/opponent-walk.png',105,170,27);
        this.load.image('numbutton','../static/playgame/orangebutton.png');
        this.load.image('playfield','../static/playgame/playfield.png');
        this.load.image('goal','../static/playgame/goals.png');
        this.load.image('lgbutton','../static/playgame/largebutton.png');
        this.load.image('xball1','../static/playgame/xball1.png');
        this.load.image('10ball','../static/playgame/10ball.png');
        this.load.image('100ball','../static/playgame/100ball.png');
        this.load.image('ball1','../static/playgame/ball1.png');
  		this.load.image('x10ball','../static/playgame/x10ball.png');
        this.load.image('x100ball','../static/playgame/x100ball.png');
        
        //load sounds
        this.load.audio('backgroundMusic', '../static/music/Crowd.mp3' );
        this.load.audio('wonFirst', '../static/music/1_person_cheering.mp3' );
        this.load.audio('wonSecond', '../static/music/Crowd_Applause.mp3' );
        this.load.audio('lostFirst', '../static/soundfx/Wha-wha-wha-sound-effect.mp3' );
        this.load.audio('lostSecond', '../static/soundfx/Failure-sound-effect.mp3' );
        this.load.audio('kick', '../static/soundfx/Thump-sound-effect.mp3' );
    },

    //immediately when preload is done
    create: function() {
        //call the Main Menu state
        this.state.start('MainMenu');
    }
};
