
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
    },

    //immediately when preload is done
    create: function() {
        //call the Main Menu state
        this.state.start('MainMenu');
    }
};
