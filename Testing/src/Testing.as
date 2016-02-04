package
{
	import flash.display.Sprite;
	import starling.core.Starling;
	
	/*
	* This SWF definition contains meta data about the size of our stage.
	*/
	[SWF(height = "600", width = "800", framerate = 60, backgroundColor = "0x333333")]
	
	public class Testing extends Sprite
	{
		public var starling:Starling;
		public function Testing()
		{
			/*
			* The Starling object is the core of the game engine, and the class 
			* which will manage the 'stage'. The stage is the box in which we
			* will draw things in order to display them to the user. 'Main' is
			* just the first method which we will execute, and it is added
			* to stage automatically by the call below.
			*/
			starling = new Starling(Main, stage);
			
			/*
			* Anti-aliasing is a graphical tool that defines the accuracy 
			* of lines drawn on the screen, or how "smooth" things appear.
			* this tech is mostly used in 3D animation, and is set by a value
			* between 1 and 16, 1 being the lowest. Higher values may improve
			* the way the game looks, but will impact performance.
			*/
			starling.antiAliasing = 1;
			
			//Start your engines!!!
			starling.start();
			
			
			
		}
	}
}