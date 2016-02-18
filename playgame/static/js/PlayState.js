//clas variables
var soccer = soccer || {};
var answer;
var answerOutput, validate, problem;
var zerobutton,onebutton,twobutton,threebutton,fourbutton,fivebutton,sixbutton,sevenbutton,eightbutton,ninebutton;
var numbuttons;
var delbutton, subbutton, button;
var text = new Text();


soccer.PlayState = function() {};


soccer.PlayState.prototype = {



    create: function () {

        this.game.add.image(0,0,'field');
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
        delbutton = new LabelButton(soccer.game,630,570,'numbutton','Delete',this.actionOnClicked,this,0,0,0,0);
        subbutton = new LabelButton(soccer.game,400,300,'ball','SUBMIT',this.actionOnClicked,this,0,0,0,0);
        subbutton.anchor.set(0.5);
        subbutton.scale.setTo(0.5,0.5);
        subbutton.style = {font: '70px Arial', fill: '#000'};

        subbutton.setLabel('SUBMIT');
        subbutton.onInputUp.add(this.checkAnswer.bind(this),this);

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



        answer = "";
        var array = this.randomProblemGenerator(1);
        num1 = array[0];
        num2 = array[1];
        text = num1 + ' + ' + num2 + ' = ';
        problem = this.game.add.text(290, 420, text, {font: '32px Arial', fill: '#000'});

        validate = this.game.add.text(300,480,answer, {font: '32px Arial', fill: '#000'});

        answerOutput = this.game.add.text(410,420,answer,{font: '32px Arial', fill: '#000'});
    },

    update: function () {


    },

    actionOnClicked: function() {

    },

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

    checkAnswer: function() {
        if (num1 + num2 == parseInt(answer)) {
            validate.setText(num1 + " + " + num2 + " = " + parseInt(answer) + " is right!");
        }
        else {
            validate.setText(num1 + " + " + num2 + " = " + parseInt(answer) + " is wrong!");
        }

        answer = "";
        answerOutput.setText(answer);

        var array = this.randomProblemGenerator(1);
        num1 = array[0];
        num2 = array[1];
    },


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

        return array;
    },


    levelOne: function(){

        var r = Math.floor(Math.random()*10);// it will round down
        var n = Math.floor(Math.random()*10);

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

        if (this.boolCreator()) { //true/false to determine if subtract or add of random value
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


        /*
         Creates a boolean determiner for if the random number should be subtracted or added to the
         new number
         */
    boolCreator:function(){
        var t = Math.random();
        return (t>0.5);
    }
};



