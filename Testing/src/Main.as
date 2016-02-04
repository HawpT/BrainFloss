package
{
	import screens.Welcome;
	
	import starling.display.Sprite;
	import starling.events.Event;
	import screens.Problem;
	
	public class Main extends Sprite
	{
		private var screenWelcome:Welcome;

		public function Main()
		{
			/*
			* A Listener is the core mechanic which drives the input -> ouput process
			* when the user plays the game. Things that the user does will generate
			* Events. In order to react to these Events, you need to tell an object
			* to "listen" for a specific type of Event. In this case, the object 
			* listening is 'this', which is the Welcome class. When Main is added
			* to the stage, it triggers the event ADDED_TO_STAGE, which I am telling
			* this class to listen for in the constructor. When this event is triggered
			* it will then be caught by the listener, and calls the onAddedToStage() 
			* method.
			*/
			this.addEventListener(starling.events.Event.ADDED_TO_STAGE, onAddedToStage);
			
		}
		
		//This method will be called when the Main Object is added to the stage
		private function onAddedToStage(event:Event):void
		{
			//create a Welcome object. This is a screen we will use to welcome the user
			screenWelcome = new Welcome();
			
			//In order to 'draw' this screen, we need to add it to the stage
			//Main now has a child, screenWelcome of type Welcome
			this.addChild(screenWelcome);
			
		}
	}
}