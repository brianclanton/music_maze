musicmaze.maze = (function() {
	// Variable initialization (for my own sanity)
	var settings = musicmaze.settings;
	var length, width, cells;

	// Move stack
	var moves = {
		head : [],
		push : function(value) {
			this.head.push(value);
		},
		pop : function() {
			var poppedValue = null;

			if (!isEmpty()) {
				poppedValue = this.head[this.head.length - 1];
				this.head = this.head.splice(this.head.length - 1);
			}

			return poppedValue;
		},
		isEmpty : function() {
			return this.head.length == 0;
		}
	};

	// Functions
	function initialize() {
		length = settings.length;
		width = settings.width;

		cells = [];

		for (var i = 0; i < length; i++) {
			cells[i] = [];
			for (var j = 0; j < width; j++)
				cells[i][j] = createCell();
		}

		generateMaze(createLocation(0, 0));
		console.log(cells);
	}

	function generateMaze() {
		var totalCells = length * width;
		var currentLocation = createLocation(0, 0);
		var numCellsVisited = 1;

		while (numCellsVisited < totalCells) {
			var neighbors = getNeighbors(currentLocation);

			// Check if we have neighbors
			if (neighbors.length != 0) {
				// Choose a random neighbor
				var randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
				
				// Remove wall between current cell and neighbor
				removeWall(currentLocation, randomNeighbor);

				// Push current cell to stack
				moves.push(currentLocation);

				// Update current cell
				currentLocation = randomNeighbor;

				// Increment number of visited cells
				numCellsVisited++;
			} else {
				// Pop stack and make current cell
				currentLocation = moves.pop();
				numCellsVisited--;
			}
		}
	}

	// function getNumberVisited() {
	// 	var count = 0;

	// 	for (var i = 0; i < length; i++)
	// 		for (var j = 0; j < width; j++)
	// 			if (cells[i][j].visited)
	// 				count++;

	// 	return count;
	// }

	function markVisited(loc) {
		getCellAt(loc).visited = true;
	}

	function getNeighbors(loc) {
		var neighbors = [];
	
		neighbors.push(createLocation(loc.x - 1, loc.y));
		neighbors.push(createLocation(loc.x + 1, loc.y));
		neighbors.push(createLocation(loc.x, loc.y - 1));
		neighbors.push(createLocation(loc.x, loc.y + 1));

		return neighbors.filter(function(n) {
			return isValid(n) && !getCellAt(n).visited;
		});
	}

	function removeWall(a, b) {
		// Left wall check
		if (b.x - 1 == a.x) {
			getCellAt(a).leftWall = false;
			getCellAt(b).rightWall = false;
		}
		// Right wall check
		else if (b.x + 1 == a.x) {
			getCellAt(a).rightWall = false;
			getCellAt(b).leftWall = false;
		}
		// Top wall check
		else if (b.y - 1 == a.y) {
			getCellAt(a).topWall = false;
			getCellAt(b).bottomWall = false;
		}
		// Bottom wall check
		else if (b.y + 1 == a.y) {
			getCellAt(a).bottomWall = false;
			getCellAt(b).topWall = false;
		}
	}

	function getCellAt(loc) {
		return cells[loc.x][loc.y];
	}

	function createCell() {
		return {
			visited : false,
			rightWall : true,
			leftWall : true,
			bottomWall : true,
			topWall : true,
			heightOffset : 0
		}
	}

	function createLocation(x, y) {
		return {
			x : x,
			y : y
		};
	}

	function isValid(loc) {
		return loc.x >= 0 && loc.x < width && loc.y >= 0 && loc.y < length;
	}

	// Make selected functions public
	return {
		initialize : initialize
	};
})();