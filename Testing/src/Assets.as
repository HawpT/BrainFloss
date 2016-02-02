package
{
	
	import flash.utils.Dictionary;
	import flash.display.Bitmap;
	import starling.textures.Texture;

	public class Assets
	{
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