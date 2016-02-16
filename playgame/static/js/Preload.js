
var soccer = soccer || {};

soccer.Preload = function() {};

soccer.Preload.prototype = {
    preload: function() {
	
        //this.load.image('ball','https://www.petfinder.com/wp-content/uploads/2012/11/140272627-grooming-needs-senior-cat-632x475.jpg');
	this.load.image('ball','../static/playgame/ball.png');
        this.load.image('field','../static/playgame/soccerfield.jpg');
        this.load.image('player','../static/playgame/player.png');
        this.load.image('numbutton','../static/playgame/orangebutton.png');

        displayAnswer = this.game.add.text(0,0,"");
        kbd = new Phaser.Keyboard(this);
        backspace = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    },
    create: function() {
        this.state.start('MainMenu');
    }
};
