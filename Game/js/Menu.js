var soccer = soccer || {};

soccer.Menu = function() {};

soccer.Menu.prototype = {
    create: function () {

        this.game.add.image(0,0,'field');

        this.game.add.text(0, 50, 'Welcome', {
            font: '24px Arial',
            fill: '#fff'
        });

        var newButton = this.game.add.button(400, 300, 'ball', this.clicked, this);
        newButton.anchor.set(0.5);


    },

    update: function () {

    },

    clicked: function () {
        this.game.state.start('PlayState');
    }
}