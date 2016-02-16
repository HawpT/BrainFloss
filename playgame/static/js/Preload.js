
var soccer = soccer || {};

soccer.Preload = function() {};

soccer.Preload.prototype = {
    preload: function() {
	
       // this.load.image('ball','home/brainfloss/mygame/playgame/static/playgame/ball');
	this.load.image('ball','../playgame/ball.png');
        this.load.image('field','/home/brainfloss/mygame/playgame/static/playgame/soccerfield.jpg');
        this.load.image('player','../playgame/player.png');
        this.load.image('numbutton','../playgame/orangebutton.png');

        displayAnswer = this.game.add.text(0,0,"");
        kbd = new Phaser.Keyboard(this);
        backspace = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    },
    create: function() {
        this.state.start('MainMenu');
    }
};
