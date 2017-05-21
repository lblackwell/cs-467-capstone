var tileWidth = 600;
var tileHeight = 350;
var canvasEdge = 50;
var screenWidth = tileWidth + (2 * canvasEdge);
var screenHeight = tileHeight + (2 * canvasEdge);
var currentCenterX = 0;
var currentCenterY = 0;
var spriteWidth = 10;
var spriteHeight = 50;
var defaultTextColor = '#373854'

Game =
{
	start: function()
	{
		Crafty.init(screenWidth, screenHeight, document.getElementById('game'));

		Crafty.background('#e0fbfd')

		// Start screen scene
		Crafty.defineScene('HomeScreen', function()
		{
			// Title
			Crafty.e('2D, DOM, Text')
				.attr({x: 0, y: screenHeight / 3,
					   w: screenWidth, h: screenHeight})
				.text('&lt;TITLE&gt;')
				.textFont({family: 'Trebuchet MS',
						   size: '50px',
						   weight: 'bold'})
				.textColor(defaultTextColor)
				.textAlign('center');

			// Instructions
			Crafty.e('2D, DOM, Text')
				.attr({x: 0, y: (screenHeight / 3) * 2,
					   w: screenWidth, h: screenHeight})
				.text('Press Enter to begin')
				.textFont({family: 'Trebuchet MS',
						   size: '30px',
						   weight: 'bold'})
				.textColor(defaultTextColor)
				.textAlign('center');

			// Enter key loads avatar selection screen
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
			// Select avatar
			// Left arrow
			Crafty.e('2D, DOM, Color, Mouse')
				.attr({x: screenWidth / 6, y: screenHeight / 3, w: 40, h: 40})
				.color('red');

			// Right arrow
			Crafty.e('2D, DOM, Color, Mouse')
				.attr({x: (screenWidth / 6) * 5 - 40, y: screenHeight / 3,
					   w: 40, h: 40})
				.color('red');

			// Selected avatar

			// Ready/enter world button
			Crafty.e('2D, DOM, Color, Mouse, Text',)
				.attr({x: (screenWidth / 2) - 100,
					   y: screenHeight - (canvasEdge * 2),
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
	      		.attr({x: 0, y: 0, w: 10, h: 50})
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

	       		// TODO: Use viewport scroll event to load new assets
	       		// When viewport x or y coords change, assets will be loaded
	       		.bind('ViewportScroll', function()
	       		{
	       			// Load current tile

	       			// Load top-left tile

	       			// Load top-center tile

	       			// Load top-right tile

	       			// Load middle-left tile

	       			// Load middle-right tile

	       			// Load bottom-left tile

	       			// Load bottom-center tile

	       			// Load bottom-right tile

	       			// TODO: Use for-loop for the above?
	       			// TODO: Need equation to match coordinates to tiles

	       			// For i in 0-8:
	       				// Find coordinates (use helper fn?)
	       				// Query DB for assets in tile
	       				// Create CraftyJS objects from platforms (current/center tile only)
	       		})
	      		;

	      	// Floor
	      	Crafty.e('Platform, 2D, Canvas, Color')
	      		.attr({x: -4000, y: 590, w: 8000, h: 10})
	      		.color('green');

	       	// Have camera follow player sprite
	       	// FIXME: This will be replaced with scroll-by-tile
	       	Crafty.viewport.follow(player, 0, 50);
      	});

		// Start game on home screen
      	Crafty.enterScene('HomeScreen');
	}
}

function loadFromJson(jsonString)
{
	// Create object from JSON string
	var result = JSON.parse(jsonString)

	// Loop through object to get each platform
	for(var i = 0; i < result.platforms.length; i++)
	{
		// Create a platform
		Crafty.e('Platform, 2D, DOM, Image')
			.attr({x: result.platforms[i].x, y: result.platforms[i].y,
				   w: result.platforms[i].width, h: result.platforms[i].height})
			.image(result.platforms[i].image);
	}
}