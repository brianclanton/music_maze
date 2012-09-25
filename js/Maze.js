// Maze Object

function Maze(length, width) {
	// Store length and width
	this.length = length;
	this.width = width;

	// Create 2D array of maze cells
	this.cells = new Array();

	for (var i = 0; i < length; i++) {
		var tempArray = new Array();
		for (var j = 0; j < width; j++) {
			var m = new MazeCell();
			tempArray.push(new MazeCell());
			console.log(tempArray);
		}

		this.cells.push(tempArray);
		console.log(tempArray);
	}

	// Generate random maze
	//this.generateMaze();
};

Maze.prototype.generateMaze = function(currentLocation) {
	console.log("i've been called");
	this.markVisited(currentLocation);
	// Get a list of neigbors
	var neighbors = this.getNeighbors(currentLocation);

	// Check if we actually have neighbors
	if (neighbors.length != 0) {
		for (var i = 0; i < neighbors.length; i++) {
			this.removeWall(currentLocation, neighbors[i]);
			this.generateMaze(neighbors[i]);
		}

		// Push current location to stack
		//moves.push(currentLocation);

		// Remove wall between current location and chosen neighbor
		

		// Update current location
		
	}

	return;
};

Maze.prototype.removeWall = function(a, b) {
	// Checks for which wall is shared and removes that wall

	console.log("before", this.cells[a.x][a.y], this.cells[b.x][b.y]);

	// Left wall check
	if (b.x - 1 == a.x)
		this.cells[a.x][a.y].leftWall = this.cells[b.x][b.y].rightWall = false;
	// Right wall check
	else if (b.x + 1 == a.x)
		this.cells[a.x][a.y].rightWall = this.cells[b.x][b.y].leftWall = false;
	// Top wall check
	else if (b.y - 1 == a.y)
		this.cells[a.x][a.y].topWall = this.cells[b.x][b.y].bottomWall = false;
	// Bottom wall check
	else if (b.y + 1 == a.y)
		this.cells[a.x][a.y].bottomWall = this.cells[b.x][b.y].topWall = false;

	console.log("removing wall between", a, b, this.cells[a.x][a.y], this.cells[b.x][b.y]);
};

Maze.prototype.markVisited = function(loc) {
	// console.log(loc, this.cells);
	this.cells[loc.x][loc.y].visited = true;
};

Maze.prototype.checkUnvisitedCells = function() {
	for (var i = 0; i < this.length; i++)
		for (var j = 0; j < this.width; j++)
			if (this.cells[i][j].visited == false)
				return true;

	return false;
};

Maze.prototype.getNeighbors = function(loc) {
	var neighbors = new Array();
	
	neighbors.push(new Location(loc.x - 1, loc.y));
	neighbors.push(new Location(loc.x + 1, loc.y));
	neighbors.push(new Location(loc.x, loc.y - 1));
	neighbors.push(new Location(loc.x, loc.y + 1));

	var filteredNeighbors = new Array();

	for (var i = 0; i < neighbors.length; i++)
		if (neighbors[i].isValid(this.width, this.length) && !this.cells[neighbors[i].x][neighbors[i].y].visited)
			filteredNeighbors.push(neighbors[i]);

	//console.log("neighbors: ", filteredNeighbors);

	return filteredNeighbors;
};

// Location
function Location(x, y) {
	this.x = x;
	this.y = y;
};

Location.prototype.isValid = function(width, length) {
	return this.x >= 0 && this.x < width && this.y >= 0 && this.y < length;
};

// Stack
function Stack() {
	this.head = new Array();
};

Stack.prototype.push = function(value) {
	this.head.push(value);
	// console.log("I got pushed to the stack", value, this.head);
};

Stack.prototype.pop = function(value) {
	var poppedValue = null;

	if (!this.isEmpty()) {
		poppedValue = this.head[this.head.length - 1];
		this.head = this.head.splice(this.head.length - 1);
	}

	//console.log("I got popped", poppedValue, this.head);

	return poppedValue;
};

Stack.prototype.isEmpty = function(value) {
	return this.head.length == 0;
};

// Maze Cell

function MazeCell() {
	// Used in maze generation algorithm
	this.visited = false;

	// Represents whether or not walls are present on this cell
	this.leftWall = true;
	this.rightWall = true;
	this.topWall = true;
	this.bottomWall = true;

	// For possible use with vertically ascending maze
	this.heightOffset = 0;
};

