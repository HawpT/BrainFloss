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
		private var bg:Image;
		private var player:Image;
		private var infoButton:Button;
		private var inputText:TextField;
		private var problemText:TextField;
		private var textFormat:TextFormat;
		private var starling:Starling;
		private var operandOne:int;
		private var operandTwo:int;
		private var wrong:TextField;
		private var right:TextField;
		private var answer:String;
		
		public function Problem() 
		{
			operandOne = 3;
			operandTwo = 4;
			right = null;
			wrong = null;
			answer = "";
			super();
			this.addEventListener(starling.events.Event.ADDED_TO_STAGE, onAddedToStage);
		}
		
		
		private function onAddedToStage():void
		{
			trace("welcome screen initialized");
			
			drawScreen();
			
			//enter the main loop waiting for input
			getInput();
			
		}
		
		//setup our text input and output boxes
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
			
			
			inputText.addEventListener(SoftKeyboardEvent.SOFT_KEYBOARD_ACTIVATE, onActivateKeyboard);
			inputText.addEventListener(SoftKeyboardEvent.SOFT_KEYBOARD_DEACTIVATE, onDeactivateKeyboard);
			inputText.addEventListener(TextEvent.TEXT_INPUT, updateAnswer);
			inputText.addEventListener(KeyboardEvent.KEY_DOWN, checkKey);
			
			Starling.current.nativeOverlay.addChild(inputText);
			Starling.current.nativeOverlay.addChild(problemText);
			
		}	
		
		//a string equal to what is currently in the input box which updates every time a new character is input
		
		protected function updateAnswer(event:TextEvent):void
		{
			answer = event.text;
		}
		
		//checks to see if the enter key has been pressed, if so, then check the answer
		protected function checkKey(event:KeyboardEvent):void
		{
			if (event.keyCode == 13)
				checkAnswer(answer)
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