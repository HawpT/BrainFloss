package
{
	import screens.Welcome;
	
	import starling.display.Sprite;
	import starling.events.Event;
	import screens.Problem;
	
	public class Main extends Sprite
	{
		private var screenWelcome:Welcome;
		private var screenProblem:Problem;
		public function Main()
		{
			this.addEventListener(starling.events.Event.ADDED_TO_STAGE, onAddedToStage);
			
		}
		
		private function onAddedToStage(event:Event):void
		{
			screenWelcome = new Welcome();
			
			this.addChild(screenWelcome);
			
		}
	}
}