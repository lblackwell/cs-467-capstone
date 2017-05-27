var tileWidth = 600;
var tileHeight = 350;
var canvasEdge = 50;
var screenWidth = tileWidth + (2 * canvasEdge);
var screenHeight = tileHeight + (2 * canvasEdge);
var currentCenterX = 0;
var currentCenterY = 0;
var currentUpperLeftX = 0;
var currentUpperLeftY = 0;
var spriteWidth = 10;
var spriteHeight = 50;
var panTime = 500; // ms

Game =
{
	start: function()
	{
		Crafty.init(800,600, document.getElementById('game'));

		Crafty.background('#e0fbfd')

		// Start screen scene
		Crafty.defineScene('HomeScreen', function()
		{
			Crafty.e('2D, DOM, Text')
				.attr({x: currentCenterX + (tileWidth / 2),
					   y: currentCenterY + tileHeight,
					   w: screenWidth, h: screenHeight})
				.text('Press Enter to begin')
				.textFont({family: 'Trebuchet MS',
						   size: '30px',
						   weight: 'bold'})
				.textColor('#373854')
				.textAlign('center');
			Crafty.e('Start, 2D, Canvas, Color, Solid')
				.attr({x: 200, y: 200, w: 100, h: 40})
				.bind('KeyDown', function(e)
				{
					if(e.key == Crafty.keys.ENTER)
					{
						Crafty.enterScene('SetupScreen');
					}
				});
		});

		// Player setup screen scene
		Crafty.defineScene('SetupScreen', function()
		{
			// Enter username
			Crafty.e('2D, DOM, Text')
				.attr({x: 20, y: 20, w: 800, h: 100})
				.text('Username: ')
				.textFont({family: 'Trebuchet MS',
						   size: '20px'})
				.textColor('#373854');

			// Select avatar
			// TODO

			// Ready/enter world button
			Crafty.e('2D, DOM, Color, Mouse, Text',)
				.attr({x: screenWidth / 2, y: 500,
					   w: 200, h: 40})
				.color('#FFFFFF')
				.text('Start!')
				.textAlign('center')
				.textFont({family: 'Trebuchet MS',
						   size: '20px'})
				.bind('Click', function(MouseEvent)
				{
					Crafty.enterScene('World');
				});
		});

		// Main game world scene
		Crafty.defineScene('World', function()
		{
			// Player sprite
	        var player = Crafty.e('2D, DOM, Color, Twoway, Gravity')
	        	// Initial position and size
	      		.attr({x: 0, y: 0, w: spriteWidth, h: spriteHeight})
	      		// Color of sprite (to be replaced)
	      		.color('#F00')
	      		// Enable 2D movement
	      		.twoway(200)
	      		// Set platforms to stop falling player
	      		.gravity('Platform')
	      		.gravityConst(600)
	      		// Bind spacebar to jump action
	      		.jumper(300, [Crafty.keys.SPACE])
	      		// Allow player to drop through platforms
	      		.bind('KeyDown', function(e)
	      		{
	      			if(e.key == Crafty.keys.DOWN_ARROW)
	      			{
	      				this.antigravity();
	      				this.gravity('Platform');
	      			}})
	      		.bind('KeyUp', function(e)
	      		{
	      			if(e.key == Crafty.keys.DOWN_ARROW)
	      			{
	      				this.gravity('Platform');
	      			}})
	      		// Move camera when player leaves current tile
	      		.bind('Moved', function()
	      			{
	      				if (this.x > currentUpperLeftX + tileWidth)
	      				{
	      					currentUpperLeftX = currentUpperLeftX + tileWidth;
	      					Crafty.viewport.pan(tileWidth, 0, panTime);
	      				}
	      				else if (this.x < currentUpperLeftX)
	      				{
	      					currentUpperLeftX = currentUpperLeftX - tileWidth;
      						Crafty.viewport.pan(tileWidth * -1, 0, panTime);
	      				}

	      				if (this.y > currentUpperLeftY + tileHeight)
	      				{
	      					currentUpperLeftY = currentUpperLeftY + tileHeight;
	      					Crafty.viewport.pan(0, tileHeight, panTime);
	      				}
	      				else if (this.y < currentUpperLeftY)
	      				{
	      					currentUpperLeftY = currentUpperLeftY - tileHeight;
	      					Crafty.viewport.pan(0, tileHeight * -1, panTime);
	      				}
	      			});

	      	// Platforms
	      	Crafty.e('Platform, 2D, Canvas, Color')
	      		.attr({x: 0, y: 250, w: 250, h: 10})
	      		.color('green');

	      	Crafty.e('Platform, 2D, Canvas, Color')
	      		.attr({x: 400, y: 300, w: 250, h: 10})
	      		.color('green');

	      	Crafty.e('Platform, 2D, Canvas, Color')
	      		.attr({x: 130, y: 450, w: 100, h: 10})
	      		.color('green');

	      	Crafty.e('Platform, 2D, Canvas, Color')
	      		.attr({x: 170, y: 540, w: 100, h: 10})
	      		.color('green');

	      	// Floor
	      	Crafty.e('Platform, 2D, Canvas, Color')
	      		.attr({x: -4000, y: 590, w: 8000, h: 10})
	      		.color('green');
	      	Crafty.e('Platform, 2D, Canvas, Color')
	      		.attr({x: -4000, y: 1590, w: 8000, h: 10})
	      		.color('green');
	      	});

		// Start game on home screen
      	Crafty.enterScene('HomeScreen');
	}
}