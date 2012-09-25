var GRID_LENGTH = 1;
var GRID_WIDTH = 1;
var WALL_HEIGHT = 1;

var scene, camera, renderer;
var container;

var controls;

function init(maze) {

	container = document.createElement('div');
	document.body.appendChild(container);

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100000);
	camera.position.y = 20;
	camera.position.z = 20;
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(camera);

	//scene.add(new THREE.AxisHelper());

	controls = new THREE.TrackballControls( camera );
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;
	controls.noZoom = false;
	controls.noPan = true;

	renderer = new THREE.WebGLRenderer({
		antialias : true
	});
	renderer.setSize(window.innerWidth, window.innerHeight);

	// var testMesh = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), new THREE.MeshBasicMaterial());
	// scene.add(testMesh);

	// console.log(scene, testMesh);

	// Draw ground
	var ground = new THREE.Mesh(new THREE.PlaneGeometry(GRID_WIDTH * maze.width, GRID_LENGTH * maze.length), new THREE.MeshBasicMaterial({ color : 0x0000ff, side : THREE.DoubleSide }));
	ground.position = new THREE.Vector3(-maze.width * GRID_WIDTH / 2, maze.length * GRID_LENGTH / 2, 0);
	scene.add(ground);

	console.log(ground);

	var c = 0x0ff00;
	// var inc = (0x00ff00 - 0x006600) / (maze.width * maze.length);

	var totalWidth = GRID_WIDTH * maze.width;

	for (var i = 0; i < maze.width; i++)
		for (var j = 0; j < maze.length; j++) {
			var cell = maze.cells[i][j];
			if (cell.topWall) {
				var topWall = new THREE.Mesh(new THREE.PlaneGeometry(GRID_WIDTH, WALL_HEIGHT), new THREE.MeshBasicMaterial({ color : c, side : THREE.DoubleSide}));
				topWall.rotation.x = Math.PI / 2;
				topWall.position.z += WALL_HEIGHT / 2;
				topWall.position.x = -GRID_WIDTH * (i + .5);
				topWall.position.y = GRID_LENGTH * j;
				scene.add(topWall);
			}
			if (cell.bottomWall) {
				var bottomWall = new THREE.Mesh(new THREE.PlaneGeometry(GRID_WIDTH, WALL_HEIGHT), new THREE.MeshBasicMaterial({ color : c, side : THREE.DoubleSide}));
				bottomWall.rotation.x = Math.PI / 2;
				bottomWall.position.z += WALL_HEIGHT / 2;
				bottomWall.position.x = -GRID_WIDTH * (i + .5);
				bottomWall.position.y = GRID_LENGTH * (j + 1);
				scene.add(bottomWall);
			}
			if (cell.rightWall) {
				var rightWall = new THREE.Mesh(new THREE.PlaneGeometry(GRID_LENGTH, WALL_HEIGHT), new THREE.MeshBasicMaterial({ color : c, side : THREE.DoubleSide}));
				rightWall.rotation.x = Math.PI / 2;
				rightWall.rotation.y = Math.PI / 2;
				rightWall.position.z += WALL_HEIGHT / 2;
				rightWall.position.x = -GRID_WIDTH * (i + 1);
				rightWall.position.y = GRID_LENGTH * (j + .5);
				scene.add(rightWall);
			}
			if (cell.leftWall) {
				var leftWall = new THREE.Mesh(new THREE.PlaneGeometry(GRID_LENGTH, WALL_HEIGHT), new THREE.MeshBasicMaterial({ color : c, side : THREE.DoubleSide}));
				leftWall.rotation.x = Math.PI / 2;
				leftWall.rotation.y = Math.PI / 2;
				leftWall.position.z += WALL_HEIGHT / 2;
				leftWall.position.x = -GRID_WIDTH * i;
				leftWall.position.y = GRID_LENGTH * (j + .5);
				scene.add(leftWall);
			}

			// c += inc;
		}	

	var startMarker = new THREE.Mesh(new THREE.SphereGeometry(.5), new THREE.MeshBasicMaterial({ color : 0xff0000 }));
	// startMarker.position = new THREE.Vector3(-maze.width / 2, -maze.length / 2, WALL_HEIGHT / 2);
	scene.add(startMarker);

	container.appendChild(renderer.domElement);

	animate();
}

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}