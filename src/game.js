var screenWidth = 800;
var screenHeight = 600;

Game = {
	start: function() {
		Crafty.init(800,600, document.getElementById('game'));

		Crafty.background('#e0fbfd')

		Crafty.defineScene('HomeScreen', function() {
			Crafty.e('2D, DOM, Text')
				.attr({x: 0, y: 300, w: 800, h: 600})
				.text('Press Enter to begin')
				.textFont({ family: 'Trebuchet MS',
							size: '30px',
							weight: 'bold'})
				.textColor('#373854')
				.textAlign('center');
			Crafty.e('Start, 2D, Canvas, Color, Solid')
				.attr({x: 200, y: 200, w: 100, h: 40})
				.bind('KeyDown', function(e) {
					if(e.key == Crafty.keys.ENTER) {
						Crafty.enterScene('World');
					}
				});
		});

		Crafty.defineScene('World', function() {
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
	      		// TODO: investigate why this only works once
	      		.bind('KeyDown', function(e) {
	      			if(e.key == Crafty.keys.DOWN_ARROW) {
	      				this.gravity = this.gravity('');
	      			}})
	      		.bind('KeyUp', function(e) {
	      			if(e.key == Crafty.keys.DOWN_ARROW) {
	      				this.gravity = this.gravity('Platform');
	      			}});

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

	      	Crafty.e('Platform, 2D, Canvas, Color')  // Floor
	      		.attr({x: -4000, y: 590, w: 8000, h: 10})
	      		.color('green');

	       	// Have camera follow player sprite
	       	Crafty.viewport.follow(player, 0, 50);

      	});

      	Crafty.enterScene('HomeScreen');
	}
}