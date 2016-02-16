var soccer = soccer || {};

soccer.game = new Phaser.Game(800,600, Phaser.AUTO, '');

//These are global variables visible anywhere in the project.
var frame = "";
var color = "";
var delay = 0;
var num1 = 4;
var num2 = 3;
var text = "";
var backspace;
var enter;
var kbd;



//Adding all the state we will need in our game.
soccer.game.state.add('Preload', soccer.Preload);
soccer.game.state.add('MainMenu', soccer.Menu);
soccer.game.state.add('PlayState', soccer.PlayState);

soccer.game.state.start('Preload');


