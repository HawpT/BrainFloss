package screens
{
	import flash.events.KeyboardEvent;
	import flash.events.SoftKeyboardEvent;
	import flash.events.TextEvent;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	import flash.text.TextFieldType;
	import flash.text.TextFormat;
	import flash.text.TextFormatAlign;
	
	import starling.core.Starling;
	import starling.display.Button;
	import starling.display.Image;
	import starling.display.Sprite;
	import starling.events.Event;
	
	public class Problem extends Sprite
	{
		//class variables
		private var bg:Image;
		private var player:Image;
		private var infoButton:Button;
		private var inputText:TextField;
		private var problemText:TextField;
		private var textFormat:TextFormat;
		private var starling:Starling;
		private var operandOne:Number;
		private var operandTwo:Number;
		private var wrong:TextField;
		private var right:TextField;
		private var update:TextField;
		private var answer:String;
		
		//default constructor
		public function Problem() 
		{
			update = new TextField();
			update.x = 600;
			update.y = 400;
			/*
			* operand One and Two make up the two parts of our math problem
			* They are obtained from the static method in RandomProblemGen
			*/
			var array:Array = new Array();
			array = RandomProblemGen.getOperands();
			operandOne = array[0];
			operandTwo = array[1];
			
			/*
			* Right and wrong are output messages, but it is necessary to keep
			* track which ones are on a screen at any given time. If "WRONG!"
			* is already on the screen, then we don't want to re-draw it.
			*/
			right = null;
			wrong = null;
			
			//answer is a string we will use to save stuff form the input box
			answer = "";
			super();
			this.addEventListener(starling.events.Event.ADDED_TO_STAGE, onAddedToStage);
		}
		
		
		//You should be used to this default handler by now!
		private function onAddedToStage():void
		{
			trace("welcome screen initialized");
			
			//draw the assets for the problem screen
			drawScreen();
			
			//get Input sets up our input listeners
			getInput();
			
		}
		
		/*
		* This method does two things:
		* First, it creates an output text field and an input textfield
		* Second, it creates listeners for the input field so that we
		* read what the user types into the box, and then submit it
		* when the user hits the enter key
		*/
		private function getInput():void
		{
			inputText = new TextField();
			textFormat = new TextFormat("Arial",24, 0x111111);
			textFormat.align = TextFormatAlign.LEFT;
			inputText.defaultTextFormat = textFormat;
			inputText.type = TextFieldType.INPUT;
			inputText.autoSize = TextFieldAutoSize.LEFT;
			inputText.x = 600;
			inputText.y = 300;
			inputText.background = true;
			inputText.backgroundColor = 0xcccccc;
			inputText.text = "    ";
			
			problemText = new TextField();
			problemText.defaultTextFormat = textFormat;
			problemText.autoSize = TextFieldAutoSize.LEFT;
			problemText.x = 500;
			problemText.y = 300;
			problemText.background = true;
			problemText.backgroundColor = 0xcccccc;
			problemText.text = operandOne + " + " + operandTwo + " = ";
			
			/*
			* The SoftKeyboard is meant for mobile devices. This is the pop-up that happens
			* when you touch an input box on a mobile device. These handlers and their methods
			* below basically make sure that your input box is moved out of the way if a 
			* soft keyboard would cover it.
			*/
			inputText.addEventListener(SoftKeyboardEvent.SOFT_KEYBOARD_ACTIVATE, onActivateKeyboard);
			inputText.addEventListener(SoftKeyboardEvent.SOFT_KEYBOARD_DEACTIVATE, onDeactivateKeyboard);
			
			/*
			* The TEXT_INPUT even is attached to the inputText object. This will trigger
			* whenever a character is ADDED to the input box, but not when characters are
			* subtracted. This means if the correct answer is '7', but you input '7a', then
			* hit backspace, only '7' will be in the input box, but the class variable 
			* answer = "7a". The Event is not triggered by Enter or Backspace. This is fixed
			* by checking the input box again when submit by pressing enter.
			*/
			inputText.addEventListener(TextEvent.TEXT_INPUT, updateAnswer);
			
			//The event triggers any time that ANY key is pressed on the keyboard
			inputText.addEventListener(KeyboardEvent.KEY_DOWN, checkKey);
			
			/*
			* NOTICE: we didn't use a this.addChild() call here. This is because 
			* the inherited method from the starling Srite class does not have 
			* support for text input, so we need to use the Flash Framework to
			* accomplish that. the nativeOverlay what Starling uses to draw
			* Flash API diplay objects. 
			*/
			Starling.current.nativeOverlay.addChild(inputText);
			Starling.current.nativeOverlay.addChild(problemText);
			
		}	
		
		//save text currently in the input box
		protected function updateAnswer(event:TextEvent):void
		{
			answer += event.text;
			update.text = answer;
			Starling.current.nativeOverlay.addChild(update);
			
		}
		
		/*
		* Checks to see if the enter key has been pressed, if so, then check the answer
		* For different keys, the keyCodes can be found here:
		*
		* http://www.dakmm.com/?p=272
		*/
		protected function checkKey(event:KeyboardEvent):void
		{
			//create an event so that the answer is always saved before reading
			
			
			if (event.keyCode == 13)
				checkAnswer(answer)
				
			else if (event.keyCode == 8)
				answer = answer.substr(0,answer.length - 1);
			
			update.text = answer;
			Starling.current.nativeOverlay.addChild(update);
		}
		
		//check the answer
		private function checkAnswer(currentAnswer:String):void
		{
			var num:Number = parseInt(currentAnswer,10);
			
			if (num == operandOne + operandTwo)
				drawTrue();
			else
				drawFalse();
		}
		
		//initial screen setup
		private function drawScreen():void
		{
			
			bg = new Image(Assets.getTexture("field"));
			this.addChild(bg);
			
			player = new Image(Assets.getTexture("player"));
			this.addChild(player);

			infoButton = new Button(Assets.getTexture("infoButton"));
			infoButton.x = 700;
			infoButton.y = 500;
			infoButton.addEventListener(starling.events.Event.TRIGGERED, menu);
			this.addChild(infoButton);

		}
		
		private function menu():void
		{
			var welcome:Welcome = new Welcome();
			this.removeChildren();
			Starling.current.nativeOverlay.removeChildren();
			this.addChild(welcome);
		}		
		
		private function drawFalse():void
		{
			if (right != null)
			{
				Starling.current.nativeOverlay.removeChild(right);
				right = null;
			}
			if (wrong == null)
			{
				wrong = new TextField();	
				wrong.text = "WRONG!";
				wrong.x = 370;
				wrong.y = 288;
				wrong.defaultTextFormat = textFormat;
				
				Starling.current.nativeOverlay.addChild(wrong);
			}
			
		}
		
		private function drawTrue():void
		{
			if (wrong != null)
			{
				Starling.current.nativeOverlay.removeChild(wrong);
				wrong = null;
			}
			if (right == null)
			{
				right = new TextField();	
				right.text = "RIGHT!";
				right.x = 370;
				right.y = 288;
				right.defaultTextFormat = textFormat;
			
				Starling.current.nativeOverlay.addChild(right);
			}
		}
		
		private function onActivateKeyboard(event:SoftKeyboardEvent):void
		{
			var offset:int = 0; 
			//if the softkeyboard is open and the field is at least partially covered 
			if( (Starling.current.nativeStage.softKeyboardRect.y != 0) && (inputText.y + inputText.height > Starling.current.nativeStage.softKeyboardRect.y) ) 
				offset = inputText.y + inputText.height - Starling.current.nativeStage.softKeyboardRect.y; 
			//but don't push the top of the field above the top of the screen 
			if( inputText.y - offset < 0 ) offset += inputText.y - offset;
			// Move text field and container
			inputText.y -= offset; 
			this.y -= offset;
		}
		
		private function onDeactivateKeyboard(event:SoftKeyboardEvent):void
		{
			// Move back text field and container
			inputText.y = 10;
			this.y = 0;
		}
	}
}