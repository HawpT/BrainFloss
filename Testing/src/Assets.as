package
{
	
	import flash.utils.Dictionary;
	import flash.display.Bitmap;
	import starling.textures.Texture;

	public class Assets
	{
		/*
		* These are local files which we will draw on the screen. 
		* All of the methods in this Class are static, because
		* no Assets Object needs to be created. This Class just
		* reads in local files if they exist, and turns them in
		* to an Image or some other Object, so that flash and
		* starling know how to draw them onto our stage.
		*/
		[Embed("../Assets/soccer.jpg")]
		public static const field:Class;
		
		[Embed("../Assets/soccerPlayer.png")]
		public static const player:Class;
		
		[Embed("../Assets/welcome.png")]
		public static const welcome:Class;
		
		[Embed("../Assets/play.png")]
		public static const playButton:Class;
		
		[Embed("../Assets/info.png")]
		public static const infoButton:Class;
		
		private static var gameTextures:Dictionary = new Dictionary();
		
		
		/*
		* We use a dictionary so that we don't have to create multiple 
		* copies of each image every time we want to use them.
		*/
		public static function getTexture(name:String):Texture
		{
			if (gameTextures[name] == undefined)
			{
				var bitmap:Bitmap = new Assets[name]();
				gameTextures[name] = Texture.fromBitmap(bitmap);
			}
			
			return gameTextures[name];
		}
		
	}
	
	
}