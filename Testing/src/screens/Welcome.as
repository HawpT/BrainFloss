package screens
{
	import flash.events.MouseEvent;
	import flash.text.TextField;
	
	import starling.core.Starling;
	import starling.display.Button;
	import starling.display.Image;
	import starling.display.Sprite;
	import starling.events.Event;

	public class Welcome extends Sprite
	{
		private var bg:Image;
		private var player:Image;
		private var welcome:Image;
		
		private var playButton:Button;
		private var infoButton:Button;
		
		public function Welcome() 
		{
			super();
			this.addEventListener(starling.events.Event.ADDED_TO_STAGE, onAddedToStage);
		}
		
		private function onAddedToStage():void
		{
			trace("welcome screen initialized");
			
			drawScreen();
		}
		
		
		private function drawScreen():void
		{
			bg = new Image(Assets.getTexture("field"));
			this.addChild(bg);
			
			player = new Image(Assets.getTexture("player"));
			player.x = 50;
			player.y = 300;
			this.addChild(player);
			
			welcome = new Image(Assets.getTexture("welcome"));
			welcome.x = 200;
			welcome.y = 20;
			this.addChild(welcome);
			
			playButton = new Button(Assets.getTexture("playButton"));
			playButton.x=400;
			playButton.y=300;
			playButton.addEventListener(starling.events.Event.TRIGGERED, play);
			this.addChild(playButton);
			
		}
		
	
		
		private function play(event:Event):void
		{
				var problem:Problem = new Problem();
				this.removeChildren();
				this.addChild(problem);
		}
	}
}