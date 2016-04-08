var soccer = soccer || {};

soccer.Menu = function() {};
var newButton;
//prototype the Menu state
soccer.Menu.prototype = {
    create: function () {

        //draw the background
        this.game.add.image(0,0,'field');

        //welcome text
        this.game.add.text(30, 30, 'Welcome', {
            font: '64px Arial',
            fill: '#fff'
        });

        //button to move us to the Play State
        newButton = this.game.add.button(400, 300, 'ball', this.clicked, this);

        //set the buttons anchor to the center of the screen
        newButton.anchor.set(0.5);


    },

    //onUpdate, not used
    update: function () {
        newButton.angle += 1;
    },

    //when the button is clicked, move to the Play State
    clicked: function () {
        this.game.state.start('PlayState');
    }
}