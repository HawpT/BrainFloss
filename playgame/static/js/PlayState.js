var soccer = soccer || {};

var loadPlayState = function (){

    var answerOutput, validate, problem, answer;
    var zerobutton,onebutton,twobutton,threebutton,fourbutton,fivebutton,sixbutton,sevenbutton,eightbutton,ninebutton;
    var numbuttons;
    var delbutton, subbutton, button;
    var text = new Text();
    var player, opponent, bg;
    var anim, walk, playerDirection;
    var resetPlayerDirection,winCondition,subtractionMode,problemLevel;

soccer.PlayState = function() {};

//prototype the game state
soccer.PlayState.prototype = {


    create: function () {
        //initial variable declarations
		playerDirection = 0;
        winCondition = 0;

        //set problem level here, 1, 2 or 3
        problemLevel = 1;

        //set subtraction mode to 1 for subtraction problems, 2 for addition
        subtractionMode = 0;

        //draw the background image
        bg = this.game.add.image(-1575,0,'playfield');
	
       
	
        //draw the play
        player =  this.game.add.sprite(278,350,'player',8);
        player.scale.set(1.2);
		player.anchor.setTo(.5,.5);
		walk = player.animations.add('walk');

		//draw the opponent
		opponent = this.game.add.sprite(522, 350, 'opponent',8);
		opponent.scale.set(1.2);
		
		opponent.anchor.setTo(.5,.5);
		opponent.scale.x *= -1;
		var opponentWalk = opponent.animations.add('opponentWalk');
	

        //add the number input buttons to the screen
        onebutton = new LabelButton(soccer.game,30,30,'numbutton','1',this.actionOnClicked,this,0,0,0,0);
        twobutton = new LabelButton(soccer.game,90,30,'numbutton','2',this.actionOnClicked,this,0,0,0,0);
        threebutton = new LabelButton(soccer.game,150,30,'numbutton','3',this.actionOnClicked,this,0,0,0,0);
        fourbutton = new LabelButton(soccer.game,210,30,'numbutton','4',this.actionOnClicked,this,0,0,0,0);
        fivebutton = new LabelButton(soccer.game,270,30,'numbutton','5',this.actionOnClicked,this,0,0,0,0);
        sixbutton = new LabelButton(soccer.game,330,30,'numbutton','6',this.actionOnClicked,this,0,0,0,0);
        sevenbutton = new LabelButton(soccer.game,390,30,'numbutton','7',this.actionOnClicked,this,0,0,0,0);
        eightbutton = new LabelButton(soccer.game,450,30,'numbutton','8',this.actionOnClicked,this,0,0,0,0);
        ninebutton = new LabelButton(soccer.game,510,30,'numbutton','9',this.actionOnClicked,this,0,0,0,0);
        zerobutton = new LabelButton(soccer.game,570,30,'numbutton','0',this.actionOnClicked,this,0,0,0,0);
        delbutton = new LabelButton(soccer.game,630,30,'numbutton','Del',this.actionOnClicked,this,0,0,0,0);
        subbutton = new LabelButton(soccer.game,400,400,'ball','SUBMIT',this.actionOnClicked,this,0,0,0,0);

        //The submit button
        subbutton.anchor.set(0.5,0.5);
        subbutton.scale.setTo(0.15,0.15);
        subbutton.style = {font: '90px Arial', fill: '#000'};
        subbutton.setLabel('');
        subbutton.onInputUp.add(this.checkAnswer.bind(this),this);
       
	
	    
        //create a group for all the buttons
        numbuttons = this.game.add.group();
        numbuttons.add(onebutton);
        numbuttons.add(twobutton);
        numbuttons.add(threebutton);
        numbuttons.add(fourbutton);
        numbuttons.add(fivebutton);
        numbuttons.add(sixbutton);
        numbuttons.add(sevenbutton);
        numbuttons.add(eightbutton);
        numbuttons.add(ninebutton);
        numbuttons.add(zerobutton);
        numbuttons.add(subbutton);

        //define what happens when the buttons are pressed
        onebutton.onInputUp.add(this.clicked.bind(this, onebutton),this);
        twobutton.onInputUp.add(this.clicked.bind(this, twobutton),this);
        threebutton.onInputUp.add(this.clicked.bind(this, threebutton),this);
        fourbutton.onInputUp.add(this.clicked.bind(this, fourbutton),this);
        fivebutton.onInputUp.add(this.clicked.bind(this, fivebutton),this);
        sixbutton.onInputUp.add(this.clicked.bind(this, sixbutton),this);
        sevenbutton.onInputUp.add(this.clicked.bind(this, sevenbutton),this);
        eightbutton.onInputUp.add(this.clicked.bind(this, eightbutton),this);
        ninebutton.onInputUp.add(this.clicked.bind(this, ninebutton),this);
        zerobutton.onInputUp.add(this.clicked.bind(this, zerobutton),this);
        delbutton.onInputUp.add(this.clicked.bind(this, delbutton),this);


        //create the first problem and output it to the screen
        answer = "";
        var array = this.randomProblemGenerator(1);
        num1 = array[0];
        num2 = array[1];
        text = num1 + ' + ' + num2 + ' = ';

        //output the problem
        problem = this.game.add.text(550, 520, text, {font: '32px Arial', fill: '#000'});
        //set the anchor to the top right corner so it is always placed next to our answer.
        problem.anchor.set(1,0);

        //create a text field for answer validation
        validate = this.game.add.text(400,560,answer, {font: '32px Arial', fill: '#000'});

        //output the students answer
        answerOutput = this.game.add.text(problem.x + 5 /*position to the right of the problem text*/
            ,problem.y,answer,{font: '32px Arial', fill: '#000'});
    },

    
    update: function () {

        //Make the characters "run"
		if(walk.isPlaying && playerDirection === 0){
				bg.x -=3;
				subbutton.x -=3;
        }
		else if(walk.isPlaying && playerDirection === 1){
			bg.x +=3;
			subbutton.x +=3;
				bg.x -=2;
				subbutton.x -=2;
        }
		else if(walk.isPlaying && playerDirection === 1){
			bg.x +=2;
			subbutton.x +=2;
        }

        //Reset players to face the ball
		//if player answered wrong
		if(!walk.isPlaying & playerDirection ===1 && resetPlayerDirection === 1){
			player.scale.x *= -1;
			resetPlayerDirection = 0;
			playerDirection = 0;
		 	subbutton.x -= 1;
		}
		//if played answered right
		else if (!walk.isPlaying && resetPlayerDirection === 1){
			opponent.scale.x *= -1;
			resetPlayerDirection = 0;
			subbutton.x += 1;
		}
		


        //BALL animations
        //calc distance between both players and roll the ball until it is inbetween both
        if(winCondition != 10 || winCondition != -10) {
            var distance = Math.abs(Math.abs(player.x) - Math.abs(opponent.x)) / 2;
            if (!walk.isPlaying && (player.x + distance) > subbutton.x) {
                subbutton.x += 2;

            }
            else if (!walk.isPlaying && (player.x + distance + 1) < subbutton.x) {
                subbutton.x -= 2;
            }
        }
        else{
            //player has won
            if(winCondition === 10) {
                subbutton.x += 2;
            }
            //opponent has won
            else{
                subbutton.x -= 2;
            }
        }
    },

    //default button handler, not used
    actionOnClicked: function() { },

    //the primary handler for button clicks
    clicked: function(b) {

            switch (b) {
                case onebutton:
                    answer += '1';
                    break;
                case twobutton:
                    answer += '2';
                    break;
                case threebutton:
                    answer += '3';
                    break;
                case fourbutton:
                    answer += '4';
                    break;
                case fivebutton:
                    answer += '5';
                    break;
                case sixbutton:
                    answer += '6';
                    break;
                case sevenbutton:
                    answer += '7';
                    break;
                case eightbutton:
                    answer += '8';
                    break;
                case ninebutton:
                    answer += '9';
                    break;
                case zerobutton:
                    answer += '0';
                    break;
                case delbutton:
                    answer = answer.substring(0, answer.length - 1);
                    break;
                default:
                    throw "clicked() did not receive a button in the parameter";
                    answer += '';

            }
            answerOutput.setText(answer);


    },

    //helper method to check whether the answer is right or wrong and provide feedback
    checkAnswer: function() {

        //ADDITION
        if(subtractionMode === 0) {
            if (num1 + num2 == parseInt(answer)) {
                validate.setText(num1 + " + " + num2 + " = " + parseInt(answer) + " is right!");

                //check to see if game has been won
                if(winCondition === 10){
                    player.animations.play('walk', 60, false);
                    this.playerHasWon();
                }
                else {
                    resetPlayerDirection = 1;
                    player.animations.play('walk', 60, false);
                    opponent.scale.x *= -1;
                    opponent.animations.play('opponentWalk', 60, false);
                    winCondition += 1;
                }
            }


            else {
                validate.setText(num1 + " + " + num2 + " = " + parseInt(answer) + " is wrong!");
                player.scale.x *= -1;
                player.animations.play('walk', 60, false);
                opponent.animations.play('opponentWalk', 60, false);
                playerDirection = 1;
                resetPlayerDirection = 1;
                winCondition -= 1;
            }

            //output a new problem to the user
            answer = "";
            answerOutput.setText(answer);

            var array = this.randomProblemGenerator(problemLevel);
            num1 = Math.max(array[0],array[1]);
            num2 = Math.min(array[0],array[1]);
            problem.setText(num1 + ' + ' + num2 + ' = ');
        }
            //SUBTRACTION
        else if (subtractionMode === 1){
            if (num1 - num2 == parseInt(answer)) {
                validate.setText(num1 + " - " + num2 + " = " + parseInt(answer) + " is right!");
                resetPlayerDirection = 1;
                player.animations.play('walk', 60, false);
                opponent.scale.x *= -1;
                opponent.animations.play('opponentWalk', 60, false);
                winCondition += 1;
            }


            else {
                validate.setText(num1 + " - " + num2 + " = " + parseInt(answer) + " is wrong!");
                player.scale.x *= -1;
                player.animations.play('walk', 60, false);
                opponent.animations.play('opponentWalk', 60, false);
                playerDirection = 1;
                resetPlayerDirection = 1;
                winCondition -= 1;
            }

            //output a new problem to the user
            answer = "";
            answerOutput.setText(answer);

            var array = this.randomProblemGenerator(problemLevel);
            num1 = Math.max(array[0],array[1]);
            num2 = Math.min(array[0],array[1]);
            problem.setText(num1 + ' - ' + num2 + ' = ');
        }
    },

    playerHasWon: function (){
        //called when the player wins the game
    },


    //Random problem generator
    randomProblemGenerator: function (level){ //level is in int
        var array;
        if (level === 1)
            array = this.levelOne();
        else if(level === 2)
            array = this.levelTwo();
        else if(level === 3)
            array = this.levelThree();
        else{
            //debugging case, 0,0 will be a flag for something going wrong
            array = [0,0];
        }

        //return the two operands as an array [num1,num2]
        return array;
    },

    //helper method for level 1
    levelOne: function(){
        //generate two random numbers
        var r = Math.floor(Math.random()*10);// it will round down
        var n = Math.floor(Math.random()*10);

        //based on the first number, ensure the second number does not make their sum exceed 10
        if(r === 9)
            n = n%2;
        else if(r === 8)
            n = n%3;
        else if(r === 7)
            n = n%4;
        else if(r === 6)
            n = n%5;
        else if(r === 5)
            n = n%6;
        else if(r === 4)
            n = n%7;
        else if(r === 3)
            n = n%8;
        else if(r === 2)
            n = n%9;
        else
            n = n%10;


        return [r, n];

    }, // closes levelOne function


    //helper method for level 2
    levelTwo: function(){
        var r = Math.floor(Math.random()*10);// it will round down
        r = r*10; // makes variable a tens
        var n = Math.floor(Math.random()*10);
        var final;
        if(r === 90){
            n = (n%2)*10;
            final = this.levelTwoUnique(n);
        }
        else if(r === 80){
            n = (n%3)*10;
            final = this.levelTwoUnique(n);
        }
        else if(r === 70){
            n = (n%4)*10;
            final = this.levelTwoUnique(n);
        }
        else if(r === 60){
            n = (n%5)*10;
            final = this.levelTwoUnique(n);
        }
        else if(r === 50){
            n = (n%6)*10;
            final = this.levelTwoUnique(n);
        }
        else if(r === 30){
            n = (n%8)*10;
            final = this.levelTwoUnique(n);
        }
        else if(r === 20){
            n = (n%9)*10;
            final = this.levelTwoUnique(n);
        }
        else if(r === 10){
            n = (n%10)*10;
            final = this.levelTwoUnique(n);
        }
        else {
            n = n*10;
            final = this.levelTwoUnique(n);
        }
        var rinal = this.levelTwoUnique(r);

        return [rinal, final];
    }, //closes levelTwo function


    //helper method for level 3
    levelThree:function(){
        var r = Math.floor(Math.random()*10);// it will round down
        r = r*100;
        var n = Math.floor(Math.random()*10);
        var final;
        if(r === 900){
            n = (n%2)*100;
            final = this.levelThreeUnique(n);
        }
        else if(r === 800){
            n = (n%3)*100;
            final = this.levelThreeUnique(n);
        }
        else if(r === 700){
            n = (n%4)*100;
            final = this.levelThreeUnique(n);
        }
        else if(r === 600){
            n = (n%5)*100;
            final = this.levelThreeUnique(n);
        }
        else if(r === 500){
            n = (n%6)*100;
            final = this.levelThreeUnique(n);
        }
        else if(r === 300){
            n = (n%8)*100;
            final =this. levelThreeUnique(n);
        }
        else if(r === 200){
            n = (n%9)*100;
            final = this.levelThreeUnique(n);
        }
        else if(r === 100){
            n = (n%10)*100;
            final = this.levelThreeUnique(n);

        }
        else {
            n = n*100;
            final = this.levelThreeUnique(n);
        }
        var rinal = this.levelThreeUnique(r);
        return [rinal, final];
    },// closes levelThree

    /*
     *The following functions (2) create a different, more complex variable for var's returned
     */
     /*
     *The following functions (2) create a different, more complex variable for var's returned
     */
    levelTwoUnique:function(initial) { //initial is int
        var i = Math.floor(Math.random() * 10); 

	i = initial - i; //added something to the ones position
	if (i>=0)	
		return i;
	else
		return (i*-1);
        
    },


    levelThreeUnique:function(initial){
        var i = Math.floor(Math.random()*10)*10; //creates num in tens place
        var is = Math.floor(Math.random()*10); //creates num in ones
	
	if ((initial - i)>=0)
		return initial - i + is;
	else
		return intitial + i - is;
    }


};
};



