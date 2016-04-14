var soccer = soccer || {};

soccer.Teaching = function() {};
var background, problem, text, move, ballgroup, xballgroup, aswer;
var playGameButton;
//prototype the Teaching state
soccer.Teaching.prototype = {
    create: function () {
		
		
		
    	background = this.game.add.image(0,0,'field');
    	//playGameButton = this.game.add.button(600, 50, 'lgbutton', "PLAY GAME",this.clicked, this);
    	playGameButton = new LabelButton
    	        (soccer.game,600,50,'lgbutton','PLAY GAME',this.actionOnClicked,this,0,0,0,0);
    	playGameButton.onInputUp.add(this.playScreen.bind(this));        
    	//move = 100;
    	answer = operand1+operand2;
    	text = operand1 + ' + ' + operand2 + ' = '+ answer;
		probelm=this.game.add.text(150, operand1, text, {font: '64px Arial', fill: '#000'});
		ballgroup = this.game.add.group();
		ballgroup.scale.set(.2);
		
		
//level one addition
		if(operand1<10){
			for(var i=0; i<operand1; i++){
				ballgroup.create(300*i, 350, 'ball');
				//this.move = (50*i)/2;
				}
	
			this.game.add.text(0, 150, '+', {font: '84px Arial', fill: '#000'});
			}

		
		if(operand2<10){
			for(var i=0; i<operand2; i++){
				ballgroup.create(300*i, 1200, 'ball');
				}
		}
		this.game.add.text(0, 300, '=',{font: '84px Arial', fill: '#000'});
			for(var i=0; i<operand2+operand1; i++){
				ballgroup.create(300*i, 1900, 'ball');
				}
		
    },

    //onUpdate, not used
    update: function () {
      
    },

    //when the button is clicked, move to the Play State
    
    playScreen: function() {
        this.game.state.start('PlayState');
    },
    
}
