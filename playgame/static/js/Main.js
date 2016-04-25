var soccer = soccer || {};

//default canvas on which Phaser will draw
soccer.game = new Phaser.Game(800,600, Phaser.AUTO, '');

//These are global variables visible anywhere in the project.
var frame = "";
var color = "";
var delay = 0;
var text = "";

loadPlayState();

//Adding all the state we will need in our game.

soccer.game.state.add('Preload', soccer.Preload);
soccer.game.state.add('MainMenu', soccer.Menu);
soccer.game.state.add('PlayState', soccer.PlayState);
soccer.game.state.add('Teaching',soccer.Teaching);

soccer.game.state.start('Preload');


