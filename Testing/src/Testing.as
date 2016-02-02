package
{
	import flash.display.Sprite;
	
	import starling.core.Starling;
	
	[SWF(height = "600", width = "800", framerate = 60, backgroundColor = "0x333333")]
	
	public class Testing extends Sprite
	{
		public var starling:Starling;
		public function Testing()
		{
			
			starling = new Starling(Main, stage);
			starling.antiAliasing = 1;
			starling.start();
			
			
			
		}
	}
}