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
        var subtext =
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
            validate.setText("RIGHT!");
        }
        else {
            validate.setText("WRONG!");
        }

        answer = "";
        answerOutput.setText(answer);
    }


};


