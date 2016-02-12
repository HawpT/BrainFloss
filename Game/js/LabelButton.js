/*
 * Label button is a wrapper class for Phaser Buttons so that the buttons can have
 * text labels on them
 */

var LabelButton = function(game, x, y, key, label, callback, callbackContext, overFrame, outFrame, downFrame, upFrame){
    Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
    this.style = {'font': '32px Arial','fill': 'black'};
    this.anchor.setTo( 0.5, 0.5 );
    this.label = new Phaser.Text(game, 0, 0, label, this.style);
    this.label.anchor.setTo( 0.5, 0.5 );
    this.addChild(this.label);
    this.setLabel( label );
    game.add.existing( this );
};

LabelButton.prototype = Object.create(Phaser.Button.prototype);

LabelButton.prototype.constructor = LabelButton;

LabelButton.prototype.setLabel = function( label ) {this.label.setText(label);};