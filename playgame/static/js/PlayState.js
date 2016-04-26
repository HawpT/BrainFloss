var soccer = soccer || {};

var operand1, operand2, questionType, playTypePair, problemLevel,answer;

var loadPlayState = function (){
 
    var answerOutput, validate, problem;
    var zerobutton,onebutton,twobutton,threebutton,fourbutton,fivebutton,sixbutton,sevenbutton,eightbutton,ninebutton;
    var numbuttons, teachingButton;
    var delbutton, subbutton, button;
    var text = new Text(), winStateChecker;
    var player, opponent, bg, goal1, goal2;
    var anim, walk,opponentWalk, playerDirection,gameplaySpeed,ballRotationSpeed,moveDistance;
    var resetPlayerDirection,winCondition;
   
   
soccer.PlayState = function() {};

//prototype the game state
soccer.PlayState.prototype = {


    create: function () {
        //sounds
        var music = soccer.game.add.audio('backgroundMusic');
        //var firstWon = soccer.game.add.audio('wonFirst');
        //var secondWon = soccer.game.add.audio('wonSecond');
        //var lostFirst = soccer.game.add.audio('lostFirst');
        //var lostSecond = soccer.game.add.audio('lostSecond');
        //var kick = soccer.game.add.audio('kick');
        music.loopFull();
       
        
        //initial variable declarations
	    playerDirection = 0;
        winCondition = 0;
	    gameplaySpeed = 6;
        ballRotationSpeed = 7;
        moveDistance = 175;

        //set problem level here, 1, 2, 3 or 4
        var parameters = window.location.search.substring(1).split('&');
        var sPageURL = parameters[0].split('=');
        //console.log(sPageURL);

        problemLevel = parseInt(sPageURL[1]);
        //console.log(problemLevel);

        playTypePair = parameters[1].split('='); //error
        //console.log(playTypePair[0]);
        //console.log(playTypePair[1]);
	
        questionType = parseInt(playTypePair[1]);
        //set subtraction mode to 2 for subtraction problems, 1 for addition

        //draw the background image
        bg = this.game.add.image(-1575,0,'playfield');
	
       
	
        //draw the play
        player =  this.game.add.sprite(208,350,'player',8);
        player.scale.set(1.2);
        player.anchor.setTo(.5,.5);
        walk = player.animations.add('walk');

		//draw the opponent
        opponent = this.game.add.sprite(592, 350, 'opponent',8);
        opponent.scale.set(1.2);

        opponent.anchor.setTo(.5,.5);
        opponent.scale.x *= -1;
        opponentWalk = opponent.animations.add('opponentWalk');


        //add the number input buttons to the screen
        onebutton = new LabelButton(soccer.game,30,570,'numbutton','1',this.actionOnClicked,this,0,0,0,0);
        twobutton = new LabelButton(soccer.game,90,570,'numbutton','2',this.actionOnClicked,this,0,0,0,0);
        threebutton = new LabelButton(soccer.game,150,570,'numbutton','3',this.actionOnClicked,this,0,0,0,0);
        fourbutton = new LabelButton(soccer.game,210,570,'numbutton','4',this.actionOnClicked,this,0,0,0,0);
        fivebutton = new LabelButton(soccer.game,270,570,'numbutton','5',this.actionOnClicked,this,0,0,0,0);
        sixbutton = new LabelButton(soccer.game,330,570,'numbutton','6',this.actionOnClicked,this,0,0,0,0);
        sevenbutton = new LabelButton(soccer.game,390,570,'numbutton','7',this.actionOnClicked,this,0,0,0,0);
        eightbutton = new LabelButton(soccer.game,450,570,'numbutton','8',this.actionOnClicked,this,0,0,0,0);
        ninebutton = new LabelButton(soccer.game,510,570,'numbutton','9',this.actionOnClicked,this,0,0,0,0);
        zerobutton = new LabelButton(soccer.game,570,570,'numbutton','0',this.actionOnClicked,this,0,0,0,0);
        delbutton = new LabelButton(soccer.game,630,570,'numbutton','Del',this.actionOnClicked,this,0,0,0,0);
        subbutton = new LabelButton(soccer.game,400,400,'ball','SUBMIT',this.actionOnClicked,this,0,0,0,0);

        teachingButton = new LabelButton(soccer.game,85,50,'lgbutton','TEACH ME',this.actionOnClicked,this,0,0,0,0);

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

        teachingButton.onInputUp.add(this.teachingScreen.bind(this));


        //create the first problem and output it to the screen
        answer = "";
        var array = this.randomProblemGenerator(problemLevel);
        operand1 = array[0];
        operand2 = array[1];
        //console.log(questionType);

        if (questionType === 1)
            text = operand1 + ' + ' + operand2 + ' = ';
        else if (questionType === 2)
            text = operand1 + ' - ' + operand2 + ' = ';
        else if (questionType === 3)
            text = "stub for 1's 10's 100's";

        //output the problem
        problem = this.game.add.text(400, subbutton.y - 80, text, {font: '32px Arial', fill: '#000'});
        //set the anchor to the top right corner so it is always placed next to our answer.
        problem.anchor.set(1,0);

        //this is helper text that lets me see whether we are winning or losing
        winStateChecker = this.game.add.text(470,460,'',{font: '32px Arial', fill: '#000'});


        //create a text field for answer validation
        validate = this.game.add.text(400,500,"", {font: '32px Arial', fill: '#000'});

        //output the students answer
        answerOutput = this.game.add.text(problem.x + 5 /*position to the right of the problem text*/
            ,problem.y,answer,{font: '32px Arial', fill: '#000'});

        goal1 = new LabelButton(soccer.game,2200,350,'goal',"",this.actionOnClicked,this,0,0,0,0);
        goal2 = new LabelButton(soccer.game,-1400,350,'goal',"",this.actionOnClicked,this,0,0,0,0);
        goal1.anchor.set(0.5);
        goal2.anchor.set(0.5);

        goal2.scale.x *= -1;
    },

    
    update: function () {
        var kick = soccer.game.add.audio('kick');
        //Make the characters "run"
        if(winCondition <= 9 && winCondition >= -9) {

            //winStateChecker.setText(moveDistance);
            if (walk.isPlaying && playerDirection === 0 && moveDistance >= 0) {
                // kick.play();
                if(moveDistance - gameplaySpeed >= 0) {
                    bg.x -= gameplaySpeed;
                    subbutton.x -= gameplaySpeed;
                    goal1.x -= gameplaySpeed;
                    goal2.x -= gameplaySpeed;
                }
                else{
                    bg.x -= moveDistance;
                    subbutton.x -= moveDistance;
                    goal1.x -= moveDistance;
                    goal2.x -= moveDistance;
                }
                moveDistance -= gameplaySpeed;
            }
            else if (walk.isPlaying && playerDirection === 1 && moveDistance >= 0) { //when answer wrong
                // kick.play();
                if(moveDistance - gameplaySpeed >= 0) {
                    bg.x += gameplaySpeed;
                    subbutton.x += gameplaySpeed;
                    goal1.x += gameplaySpeed;
                    goal2.x += gameplaySpeed;
                }
                else{
                    bg.x += moveDistance;
                    subbutton.x += moveDistance;
                    goal1.x += moveDistance;
                    goal2.x += moveDistance;
                }
                moveDistance -= gameplaySpeed;
            }
            else if (walk.isPlaying && playerDirection === 1 && moveDistance >= 0) {
                //  kick.play();

                if(moveDistance - gameplaySpeed >= 0) {
                    bg.x += gameplaySpeed;
                    subbutton.x += gameplaySpeed;
                    goal1.x += gameplaySpeed;
                    goal2.x += gameplaySpeed;
                }
                else{
                    bg.x += moveDistance;
                    subbutton.x += moveDistance;
                    goal1.x += moveDistance;
                    goal2.x += moveDistance;
                }
                moveDistance -= gameplaySpeed;
            }

            //Reset players to face the ball
            //if player answered wrong
            if (!walk.isPlaying & playerDirection === 1 && resetPlayerDirection === 1) {
                kick.play();  //kick sound
                player.scale.x *= -1;
                resetPlayerDirection = 0;
                playerDirection = 0;
                subbutton.x -= gameplaySpeed;
            }
            //if player answered right
            else if (!walk.isPlaying && resetPlayerDirection === 1) {
                kick.play();   //kick sound
                opponent.scale.x *= -1;
                resetPlayerDirection = 0;
                subbutton.x += gameplaySpeed;

            }

            //BALL animations
            //calc distance between both players and roll the ball until it is inbetween both
            var distance = Math.abs(Math.abs(player.x) - Math.abs(opponent.x)) / 2;
            if (!walk.isPlaying && (player.x + distance) > subbutton.x) {
                if(distance - Math.abs(player.x - subbutton.x) < gameplaySpeed){
                    subbutton.x = player.x + distance;
                    subbutton.angle += ballRotationSpeed;
                }
                else {
                    subbutton.x += gameplaySpeed;
                    subbutton.angle += ballRotationSpeed;
                }
            }
            else if (!walk.isPlaying && (player.x + distance + 1) < subbutton.x) {
                if(distance - Math.abs(opponent.x - subbutton.x) < gameplaySpeed) {
                    subbutton.x = player.x + distance;
                    subbutton.angle += ballRotationSpeed;
                }
                else {
                    subbutton.x -= gameplaySpeed;
                    subbutton.angle -= ballRotationSpeed;
                }

            }
        }
        else{
            //player has won
            if(winCondition > 9) {

                if ( walk.isPlaying && player.x < 350){
                    player.x += gameplaySpeed;
                    opponent.x -= gameplaySpeed;
                }
                else if (subbutton.x < 690) {
                    subbutton.x += gameplaySpeed;
                    subbutton.angle -= ballRotationSpeed;
                }
            }
            //opponent has won
            else {
                if ( opponentWalk.isPlaying && player.x < 350){
                    opponent.x -= gameplaySpeed;
                    player.x += gameplaySpeed;
                }
                else if (subbutton.x > 90) {
                    subbutton.x -= gameplaySpeed;
                    subbutton.angle += ballRotationSpeed;
                }
            }
        }
    },

    //default button handler, not used
    actionOnClicked: function() { },

    teachingScreen: function() {
        validate.setText('Switching to Teaching');
       
        this.game.state.start('Teaching');
    },

    restartPlayState: function(){
        this.game.state.start('PlayState');
    },

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
        //Prevent user from answering if game has been won
        if (winCondition < 10 && winCondition > -10 && answer.length > 0) {
            moveDistance = 175;
            //WRITE TO THE DATABASE

            $.ajax({
                url: "",
                type: "POST",
                data: {
                    op1: operand1,
                    op2: operand2,
                    student_answer: parseInt(answer),
                    problem_type: questionType,
                    problem_level: problemLevel,
                    student_id: 2179
                },
                success: function(json){
                    console.log(json);
                },
                error : function(xhr,errmsg,err) {
                    // Show an error
                    $('#results').html("<div class='alert-box alert radius' data-alert>"+
                    "Oops! We have encountered an error. <a href='#' class='close'>&times;</a></div>"); // add error to the dom
                    console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
                }
            });



            //ADDITION
            if (questionType === 1) {
                if (operand1 + operand2 === parseInt(answer)) {
                    validate.setText(operand1 + " + " + operand2 + " = " + parseInt(answer) + " is right!");

                    //check to see if game has been won
                    this.questionAnsweredRight();
                }


                else {  //player wrong walk back
                    validate.setText(operand1 + " + " + operand2 + " = " + parseInt(answer) + " is wrong!");
                    this.questionAnsweredWrong();
                }

                //output a new problem to the user
                answer = "";
                answerOutput.setText(answer);
                //winStateChecker.setText('winCondition = ' + winCondition);

                array = this.randomProblemGenerator(problemLevel);
                operand1 = Math.max(array[0], array[1]);
                operand2 = Math.min(array[0], array[1]);
                problem.setText(operand1 + ' + ' + operand2 + ' = ');
            }

            //SUBTRACTION
            else if (questionType === 2) {
                if (operand1 - operand2 === parseInt(answer)) {
                    validate.setText(operand1 + " - " + operand2 + " = " + parseInt(answer) + " is right!");
                    this.questionAnsweredRight();
                }


                else {
                    validate.setText(operand1 + " - " + operand2 + " = " + parseInt(answer) + " is wrong!");
                    this.questionAnsweredWrong();
                }

                //output a new problem to the user
                answer = "";
                answerOutput.setText(answer);

                var array = this.randomProblemGenerator(problemLevel);
                operand1 = Math.max(array[0], array[1]);
                operand2 = Math.min(array[0], array[1]);
                problem.setText(operand1 + ' - ' + operand2 + ' = ');
            }

            //1's 10's 100's game type
            else if (questionType === 3){

            }
        }
    },

    //control the animations for a correctly answered question
    questionAnsweredRight: function (){
        //player has won the game
        if (winCondition >= 9) {
            winCondition++;
            player.animations.play('walk', 60, false);
            opponent.animations.play('opponentWalk', 60, false);
            this.playerHasWon();
        }
        else { //player correct walk forward
            resetPlayerDirection = 1;
            player.animations.play('walk', 60, false);
            opponent.scale.x *= -1;
            opponent.animations.play('opponentWalk', 60, false);
            winCondition += 1;
        }
    },

    questionAnsweredWrong: function (){
        //opponent has won the game
        if (winCondition <= -9) {
            winCondition--;
            player.animations.play('walk', 60, false);
            opponent.animations.play('opponentWalk', 60, false);
            this.opponentHasWon();
        }
        else { //player incorrect, walk back
            resetPlayerDirection = 1;
            playerDirection = 1;
            player.scale.x *= -1;
            player.animations.play('walk', 60, false);
            opponent.animations.play('opponentWalk', 60, false);
            winCondition -= 1;
        }
    },

    playerHasWon: function (){
        var restart = new LabelButton(soccer.game,400,250,'numbutton','',this.actionOnClicked,this,0,0,0,0);
        restart.onInputUp.add(this.restartPlayState.bind(this));
        restart.anchor.set(0.5);
        restart.scale.x = 6;
        var firstWon = soccer.game.add.audio('wonFirst');
         var secondWon = soccer.game.add.audio('wonSecond');
         firstWon.play();
         
        var playAgainText = this.game.add.text(restart.x,restart.y, 'You won! Play again?', {font: '32px Arial', fill: '#000'});
        
        playAgainText.anchor.set(0.5);

        problem.setText("");
        secondWon.play();
    },

    opponentHasWon: function(){
        var restart = new LabelButton(soccer.game,400,250,'numbutton','',this.actionOnClicked,this,0,0,0,0);
        restart.onInputUp.add(this.restartPlayState.bind(this));
        restart.anchor.set(0.5);
        restart.scale.x = 6;
        var lostFirst = soccer.game.add.audio('lostFirst');
         var lostSecond = soccer.game.add.audio('lostSecond');
         lostFirst.play();
         
        var playAgainText = this.game.add.text(restart.x,restart.y, 'You lost! Play again?', {font: '32px Arial', fill: '#000'});
        
        playAgainText.anchor.set(0.5);

        problem.setText("");
        lostSecond.play();
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
        else if(level ===4)
            array = this.levelFour();
        else{
            //debugging case, 0,0 will be a flag for something going wrong
            array = [0,0];
        }

        //return the two operands as an array [operand1,operand2]
        return array;
    },

    //helper method for level 1
    levelOne: function(){
        //generate two random numbers
        var r = Math.floor(Math.random()*10);// it will round down
        var n = Math.floor(Math.random()*10);

        //based on the first number, ensure the second number does not make their sum exceed 10
        if (questionType === 1) {
            n = n % (10 - r)
        }

        if (r > n)
            return [r, n];
        else
            return [n, r];
    }, // closes levelOne function

    //helper method for level 2
    levelTwo: function() {
        var r = Math.floor(Math.random() * 100);// it will round down

        var n = Math.floor(Math.random() * 100);

        if (questionType === 1) {
            n = n % (100 - r)
        }

        if (r>n)
		    return [r, n];
	    else
		    return [n,r];
    }, //closes levelTwo function

    //helper method for level 3
    levelThree:function() {
        var r = Math.floor(Math.random() * 1000);// it will round down

        var n = Math.floor(Math.random() * 1000);

        if (questionType === 1) {
            n = n % (1000 - r)
        }

        if (r > n)
            return [r, n];
        else
            return [n, r];
    },

    //helper method for level 4
    levelFour:function(){
        var r = Math.floor(Math.random() * 10000);// it will round down

        var n = Math.floor(Math.random() * 10000);

        if (questionType === 1) {
            n = n % (10000 - r)
        }

        if (r>n)
            return [r, n];
        else
            return [n,r];
    }// closes levelFour

};
};






