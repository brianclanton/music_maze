var musicmaze = {
	settings : {
		length : 3,
		width : 3
	}
};

// start loading when main document is loaded
window.addEventListener("load", function() {
	Modernizr.load([{
		load : [
			"js/maze.js"
		],

		complete : function() {
			console.log("All files have been loaded.");
			musicmaze.maze.initialize();
		}
	}]);
}, false);