
var soccer = soccer || {};

//local class variables
var answer;
var answerOutput, validate, problem;
var zerobutton,onebutton,twobutton,threebutton,fourbutton,fivebutton,sixbutton,sevenbutton,eightbutton,ninebutton;
var numbuttons;
var delbutton, subbutton, button;
var text = new Text();
var player, bg;


soccer.PlayState = function() {};

//prototype the game state
soccer.PlayState.prototype = {

    create: function () {

        //draw the background image
        bg = this.game.add.image(0,0,'playfield');

        //draw the player
        player =  this.game.add.image(100,100,'soccerplayer');
        player.scale.setTo(0.5,0.5);


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
        zerobutton = new LabelButton(soccer.game,30,30,'numbutton','0',this.actionOnClicked,this,0,0,0,0);
        delbutton = new LabelButton(soccer.game,630,30,'numbutton','Delete',this.actionOnClicked,this,0,0,0,0);
        subbutton = new LabelButton(soccer.game,400,300,'ball','SUBMIT',this.actionOnClicked,this,0,0,0,0);

        //The submit button
        subbutton.anchor.set(0.5);
        subbutton.scale.setTo(0.25,0.25);
        subbutton.style = {font: '48px Arial', fill: '#000'};
        subbutton.setLabel('SUBMIT');
        subbutton.onInputUp.add(this.checkAnswer.bind(this),this);


        //creat a group for all the buttons
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
        problem = this.game.add.text(290, 420, text, {font: '32px Arial', fill: '#000'});

        //create a text field for answer validation
        validate = this.game.add.text(300,480,answer, {font: '32px Arial', fill: '#000'});

        //output the students answer
        answerOutput = this.game.add.text(410,420,answer,{font: '32px Arial', fill: '#000'});
    },

    //not used yet
    update: function () {


    },

    //default button handler, not used
    actionOnClicked: function() {

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
        if (num1 + num2 == parseInt(answer)) {
            validate.setText(num1 + " + " + num2 + " = " + parseInt(answer) + " is right!");
        }
        else {
            validate.setText(num1 + " + " + num2 + " = " + parseInt(answer) + " is wrong!");
        }

        //output a new problem to the user
        answer = "";
        answerOutput.setText(answer);

        var array = this.randomProblemGenerator(1);
        num1 = array[0];
        num2 = array[1];
	    problem.setText(num1 + ' + ' + num2 + ' = ');
    },


    /*
     * Initial random problem generator
     *
     * Usage: input 1, 2, or 3
     *
     * Calls helper methods.
     */
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
    levelTwoUnique:function(initial) {
        var i = Math.floor(Math.random() * 10);
        var sub = initial;

        //different comparison values between 1 and 10 will yield greater or fewer numbers of subtraction problems
        if (i >= 5) {
            while (sub < initial) {
                sub = sub + i;
            }
        }
        else {
            sub = sub - i;

            return sub;
        }
    },


    levelThreeUnique:function(initial){
        var i = Math.floor(Math.random()*10)*10; //creates num in tens place
        var is = Math.floor(Math.random()*10); //creates num in ones

        return initial - i - is;
    },


};



