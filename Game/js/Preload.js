var soccer = soccer || {};

soccer.Preload = function() {};

soccer.Preload.prototype = {
    preload: function() {
        this.load.image('ball','../assets/ball.png');
        this.load.image('field','../assets/soccerfield.jpg');
        this.load.image('player','../assets/player.png');
        this.load.image('numbutton','../assets/orangebutton.png');

        displayAnswer = this.game.add.text(0,0,"");
        kbd = new Phaser.Keyboard(this);
        backspace = this.game.input.keyboard.addKey(Phaser.Keyboard.BACKSPACE);
        enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    },
    create: function() {
        this.state.start('MainMenu');
    }
};