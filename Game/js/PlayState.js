var soccer = soccer || {};
var answer = "";
var button;
var zerobutton,onebutton,twobutton,threebutton,fourbutton,fivebutton,sixbutton,sevenbutton,eightbutton,ninebutton;
var numbuttons;
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
        onebutton.onInputUpHandler(this.clicked(onebutton),this);




        text = num1 + ' + ' + num2 + ' = ';
        this.game.add.text(300, 284, text, {font: '32px Arial', fill: '#000'});

        answer = "";
    },

    update: function () {


    },

    actionOnClicked: function() {

    },

    clicked: function(b) {
        switch(b) {
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

        }
        this.game.add.text(0,0,answer,{font: '32px Arial', fill: '#000'});

    },

    backspaceAnswer: function(){
        if (answer.length > 0)
            answer = answer.substring(0,answer.length);
    }

};


