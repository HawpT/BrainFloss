var soccer = soccer || {};

soccer.game = new Phaser.Game(800,600, Phaser.AUTO, '');

var frame = "";
var color = "";
var delay = 0;
var num1 = 4;
var num2 = 3;
var text = "";
var backspace;
var enter;
var kbd;




soccer.game.state.add('Preload', soccer.Preload);
soccer.game.state.add('MainMenu', soccer.Menu);
soccer.game.state.add('PlayState', soccer.PlayState);

soccer.game.state.start('Preload');


