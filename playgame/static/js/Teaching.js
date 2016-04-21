var soccer = soccer || {};

soccer.Teaching = function() {};
var background, problem, text, move, ballgroup, xballgroup, ballgroup2, ballgroup3, operand3, operand4, operand5;
var playGameButton, ball10,problemAnswer;
var ballgroup4, ballgroup5, ballgroup6, ballgroup7, ballgroup8, ballgroup9, ballgroup10,ballgroup11, ballgroup12, ballgroup13,ballgroup14, ballgroup15;
//prototype the Teaching state
soccer.Teaching.prototype = {
    create: function () {
		
		
		
    	background = this.game.add.image(0,0,'field');
    	//playGameButton = this.game.add.button(600, 50, 'lgbutton', "PLAY GAME",this.clicked, this);
    	playGameButton = new LabelButton
    	        (soccer.game,600,50,'lgbutton','PLAY GAME',this.actionOnClicked,this,0,0,0,0);
    	playGameButton.onInputUp.add(this.playScreen.bind(this));        
    	//move = 100;
    	if (questionType === 2)
    		problemAnswer = operand1 - operand2;
    		
    	else if(questionType === 1)
    		problemAnswer = operand1 + operand2;
    		
    	else if (questionType === 3)
    		problemAnswer = 0;
    		
		ballgroup = this.game.add.group();
		ballgroup2 = this.game.add.group();
		ballgroup4= this.game.add.group();
		ballgroup5= this.game.add.group();
		ballgroup3 = this.game.add.group();
		ballgroup6= this.game.add.group();
		ballgroup7 = this.game.add.group();
		ballgroup8 = this.game.add.group();
		ballgroup9 = this.game.add.group();
		ballgroup10= this.game.add.group();
		ballgroup11= this.game.add.group();
		ballgroup12= this.game.add.group();
		ballgroup13= this.game.add.group();
		ballgroup14= this.game.add.group();
		ballgroup15= this.game.add.group();
    		
    	//this.game.add.text(600,0,problemAnswer,{font: '64px Arial', fill: '#000'});
    	console.log(problemAnswer);
    	if (problemAnswer>=operand1 && questionType === 1){
			text = operand1 + ' + ' + operand2 + ' = '+ problemAnswer;
			probelm=this.game.add.text(0, 0, text, {font: '64px Arial', fill: '#000'});
			
		
			this.game.add.text(0, 180, '+', {font: '84px Arial', fill: '#000'});
			this.game.add.text(0, 350, '=',{font: '84px Arial', fill: '#000'});
		//level one addition
		//if first number is less than 10
			if(operand1<10){
				for(var i=0; i<operand1; i++){
					ballgroup.create(200*i, 350, 'ball1');
					ballgroup.scale.set(.2);
					}
				}
				//if first number is greater than 10
			else{
				operand3 = Math.floor(operand1/100);
							
				for(var i=0; i<operand3; i++){
					ballgroup2.create(200*i, 300, '100ball');
					ballgroup2.scale.set(.2);}
					
				operand4= operand1-(operand3*100)
				
				if(operand4>10){
						operand5 = Math.floor(operand4/10)
						for(var i=0; i<operand5; i++){
							ballgroup10.create(200*i, 500, '10ball');
							ballgroup10.scale.set(.2);}
						operand6= operand4-(operand5*10);
						
						for(var i=0; i<operand6;i++){
							ballgroup11.create(200*i, 700, 'ball1');
							ballgroup11.scale.set(.2);}
			
					}
			}
			
				//if second number is less than 10
				
			if(operand2<10){
				for(var i=0; i<operand2; i++){
					ballgroup4.create(200*i, 1300, 'ball1');
					ballgroup4.scale.set(.2);
					}
			}
				//second number is greater than 10	
			else{
				operand3 = Math.floor(operand2/100);
									
				for(var i=0; i<operand3; i++){
					ballgroup5.create(200*i, 1250, '100ball');
					ballgroup5.scale.set(.2);}
					
				operand4= operand2-(operand3*100)
				
				if(operand4>10|| opperand2===0){
						operand5 = Math.floor(operand4/10)
						for(var i=0; i<operand5; i++){
							ballgroup10.create(200*i, 1450, '10ball');
							ballgroup10.scale.set(.2);}
							
						operand6= operand4-(operand5*10);
						
						for(var i=0; i<operand6;i++){
							ballgroup11.create(200*i, 1650, 'ball1');
							ballgroup11.scale.set(.2);}
			
					}
					
			}	//answer section
				if(problemAnswer<10 || operand2==0){
				for(var i=0; i<problemAnswer; i++){
					ballgroup7.create(200*i, 2200, 'ball1');
					ballgroup7.scale.set(.2);
					}
			}
			
				else if(problemAnswer>=100){
					operand3 = Math.floor(problemAnswer/100);
								
					for(var i=0; i<operand3; i++){
						ballgroup9.create(200*i, 2100, '100ball');
						ballgroup9.scale.set(.2);}
						
					operand4= problemAnswer-(operand3*100)
					if(operand4>10){
						operand5 = Math.floor(operand4/10)
						for(var i=0; i<operand5; i++){
							ballgroup10.create(200*i, 2300, '10ball');
							ballgroup10.scale.set(.2);}
						operand6= operand4-(operand5*10);
						
						for(var i=0; i<operand6;i++){
							ballgroup11.create(200*i, 2500, 'ball1');
							ballgroup11.scale.set(.2);}
			
					}
					else{
						for(var i=0; i<operand4; i++){
						ballgroup8.create(200*i, 2300, 'ball1');
						ballgroup8.scale.set(.2);}
					}
						
					
				}	
				//problemAnswer is less than 100 but greater than 10	
				else{
					operand3 = Math.floor(problemAnswer/10);
								
					for(var i=0; i<operand3; i++){
						ballgroup9.create(200*i, 2200, '10ball');
						ballgroup9.scale.set(.2);}
						
					operand4= problemAnswer-(operand3*10)
					
					for(var i=0; i<operand4; i++){
						ballgroup8.create(200*i, 2500, 'ball1');
						ballgroup8.scale.set(.2);}
						
					
				}	
		}
		//subtraction
		else if (problemAnswer<operand1||operand2===0){
			problemAnswer = operand1-operand2;
			text = operand1 + ' - ' + operand2 + ' = '+ problemAnswer;
			probelm=this.game.add.text(0, 0, text, {font: '64px Arial', fill: '#000'});
			
			
			//first number is less than 10
			if(operand1<10){
				for(var i=0; i<operand1; i++){
					ballgroup.create(200*i, 350, 'ball1');
					ballgroup.scale.set(.2);
					
				}
			}
				//first number is greater than 10
				
		else{
				operand3 = Math.floor(operand1/100);
							
				for(var i=0; i<operand3; i++){
					ballgroup2.create(200*i, 300, '100ball');
					ballgroup2.scale.set(.2);}
					
				operand4= operand1-(operand3*100)
				
				if(operand4>10){
						operand5 = Math.floor(operand4/10)
						for(var i=0; i<operand5; i++){
							ballgroup3.create(200*i, 500, '10ball');
							ballgroup3.scale.set(.2);}
						operand6= operand4-(operand5*10);
						
						for(var i=0; i<operand6;i++){
							ballgroup4.create(200*i, 700, 'ball1');
							ballgroup4.scale.set(.2);}
			
				}
			}	
	
			this.game.add.text(0, 160, '-', {font: '84px Arial', fill: '#000'});
			this.game.add.text(0, 350, '=', {font: '84px Arial', fill: '#000'});

			//if second number is less than 10
				
			if(operand2<10){
				for(var i=0; i<operand2; i++){
					ballgroup5.create(200*i, 1600, 'xball1');
					ballgroup5.scale.set(.2);
					}
			}
				//second number is greater than 10	
			else{
				operand3 = Math.floor(operand2/100);
									
				for(var i=0; i<operand3; i++){
					ballgroup6.create(200*i, 1150, 'x100ball');
					ballgroup6.scale.set(.2);}
					
				operand4= operand2-(operand3*100)
				
				if(operand4>10){
						operand5 = Math.floor(operand4/10)
						for(var i=0; i<operand5; i++){
							ballgroup7.create(200*i, 1350, 'x10ball');
							ballgroup7.scale.set(.2);}
							
						operand6= operand4-(operand5*10);
						
						for(var i=0; i<operand6;i++){
							ballgroup8.create(200*i, 1600, 'xball1');
							ballgroup8.scale.set(.2);}
			
					}
					
			}	//answer section
				if(problemAnswer<10){
				for(var i=0; i<problemAnswer; i++){
					ballgroup9.create(200*i, 2200, 'ball1');
					ballgroup9.scale.set(.2);
					}
			}
			
				else if(problemAnswer>=100){
					operand3 = Math.floor(problemAnswer/100);
								
					for(var i=0; i<operand3; i++){
						ballgroup10.create(200*i, 2100, '100ball');
						ballgroup10.scale.set(.2);}
						
					operand4= problemAnswer-(operand3*100)
					if(operand4>10){
						operand5 = Math.floor(operand4/10)
						for(var i=0; i<operand5; i++){
							ballgroup11.create(200*i, 2300, '10ball');
							ballgroup11.scale.set(.2);}
						operand6= operand4-(operand5*10);
						
						for(var i=0; i<operand6;i++){
							ballgroup12.create(200*i, 2500, 'ball1');
							ballgroup12.scale.set(.2);}
			
					}
					else{
						for(var i=0; i<operand4; i++){
						ballgroup13.create(200*i, 2300, 'ball1');
						ballgroup13.scale.set(.2);}
					}
						
					
				}	
				//problemAnswer is less than 100 but greater than 10	
				else{
					operand3 = Math.floor(problemAnswer/10);
								
					for(var i=0; i<operand3; i++){
						ballgroup14.create(200*i, 2200, '10ball');
						ballgroup14.scale.set(.2);}
						
					operand4= problemAnswer-(operand3*10)
					
					for(var i=0; i<operand4; i++){
						ballgroup15.create(200*i, 2500, 'ball1');
						ballgroup15.scale.set(.2);}
						
					
				}	
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
