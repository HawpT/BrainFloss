package screens
{
	
	import starling.display.Button;
	import starling.display.Image;
	import starling.display.Sprite;
	import starling.events.Event;
	

	public class Welcome extends Sprite
	{
		//class variables
		private var bg:Image;
		private var player:Image;
		private var welcome:Image;
		private var playButton:Button;
		private var infoButton:Button;
		
		/*
		* The Welcome Object listens for when it is added to the stage, and will then
		* draw images on the screen for the user.
		*/
		public function Welcome() 
		{
			super();
			this.addEventListener(starling.events.Event.ADDED_TO_STAGE, onAddedToStage);
		}
		
		/*
		* This method seems like it doesn't do much, but we don't know if there are
		* other processes which we will want to start here later. Right now, drawScreen
		* is the only thing we need to do when this screen is initialized, but we may
		* want input from the database, or something else in the future.
		*/
		private function onAddedToStage():void
		{
			//Trace is console output. This won't display in the FB console if you run this in a browser
			trace("welcome screen initialized");
			
			drawScreen();
		}
		
		//drawScreen will display our image assets on the screen
		private function drawScreen():void
		{
			bg = new Image(Assets.getTexture("field"));
			this.addChild(bg);
			
			player = new Image(Assets.getTexture("player"));
			
			/*
			* The X and Y coordinates are the location of the top left corner
			* of a DisplayObject. Above, the bg Image does not need to be placed
			* because it will default to (0,0), which is the top left corner of 
			* the screen. The Image is already 800x600 resolution, so it doesn't
			* need to be resized either. However, the player Image may need to be 
			* moved to put it where we want it on the screen. It is easily possible
			* to place an Image completely off the screen, AS3 will not stop you,
			* and it will only render the area of the object that lies within the
			* stage boundaries.
			*/
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
			
			/*
			* The Button class already implements a TRIGGERED Event. You can find
			* what events are already implemented by a class in the Starling or Flash API
			*/
			playButton.addEventListener(starling.events.Event.TRIGGERED, play);
			this.addChild(playButton);
			
		}
		
	
		/*
		* This is the handler for the Event triggered by Pressing the playButton
		* We will now move to a new screen to play the game! 
		*/
		private function play(event:Event):void
		{
				var problem:Problem = new Problem();
				
				/*
				* If we added the the new Problem Object to the screen now, it
				* would not remove anything currently on the screen, but instead
				* it would draw on top of it! This means that we would be spending
				* system resources to render layers and layers of stuff that we 
				* do not need. So, we want to remove all the children created by
				* this screen before we draw another, to ensure we start with
				* a blank canvas each time, and we will make the next screen
				* responsible for everything that it needs to display.
				*/
				this.removeChildren();
				
				//switch to the Problem screen
				this.addChild(problem);
				
		}
	}
}