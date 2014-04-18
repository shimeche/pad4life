



var canvas_R;
var context_R;
var particles_R;
var mouseIsDown_R = false;

var offsetX_R=0;
var offsetY_R=0;
function initTrail_R(colorPanel) {

  canvas_R = document.getElementById( colorPanel );
  
  if (canvas_R && canvas_R.getContext) {
		context_R = canvas_R.getContext('2d');
		var blue=["#000080","#342D7E","#15317E","#151B8D","#0000A0",
		          "#0020C2","#0041C2","#2554C7","#1569C7","#2B60DE",
		          "#1F45FC","#6960EC","#736AFF","#357EC7","#368BC1",
		          "#488AC7","#3090C7","#659EC7","#87AFC7","#95B9C7"
		          ];
		// Register event listeners
		canvas_R.addEventListener('mousemove', documentMouseMoveHandler_R, false);
		//window.addEventListener('mousedown', documentMouseDownHandler, false);
		canvas_R.addEventListener('pointerdown', documentMouseDownHandler_R, false);
		//window.addEventListener('mouseup', documentMouseUpHandler, false);
		canvas_R.addEventListener('pointerup', documentMouseUpHandler_R, false);
		canvas_R.addEventListener('touchstart', documentTouchStartHandler_R, false);
		canvas_R.addEventListener('touchmove', documentTouchMoveHandler_R, false);
		//window.addEventListener('resize', windowResizeHandler, false);
		
		createParticles_R(blue);
		
		//windowResizeHandler();
		
		setInterval( loop_R, 1000 / 60 );
	}
}

function createParticles_R(blue) {
	particles_R = [];
	//fillColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
	var pColor;
	for (var i = 0; i < blue.length; i++) {
		//pColor='#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16);
		//console.log(pColor);
		var particle = {
			size: 1,
			position: { x: mouseX, y: mouseY },
			offset: { x: 0, y: 0 },
			shift: { x: mouseX, y: mouseY },
			speed: 0.01+Math.random()*0.3,
			targetSize: 1,
			fillColor: blue[i],
			orbit: RADIUS*.5 + (RADIUS * .5 * Math.random())
		};
		
		particles_R.push( particle );
	}
}

function documentMouseMoveHandler_R(event) {
	//mouseX = event.clientX - (window.innerWidth - SCREEN_WIDTH) * .5;
	//mouseY = event.clientY - (window.innerHeight - SCREEN_HEIGHT) * .5;
	
	//mouseX = event.pageX - (window.innerWidth - SCREEN_WIDTH) * .5;
	//mouseY = event.pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
	if(mouseIsDown_R){
		mouseX = event.clientX;
		mouseY = event.clientY;
	}
	//mouseX = event.pageX ;
	//mouseY = event.pageY ;
}

function documentMouseDownHandler_R(event) {
	mouseIsDown_R = true;
}

function documentMouseUpHandler_R(event) {
	mouseIsDown_R = false;
}

function documentTouchStartHandler_R(event) {
	if(event.touches.length == 1) {
		event.preventDefault();

		//mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;;
		//mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
		mouseX = event.touches[0].pageX ;
		mouseY = event.touches[0].pageY ;
	}
}

function documentTouchMoveHandler_R(event) {
	if(event.touches.length == 1 && mouseIsDown_R==true) {
		event.preventDefault();

		//mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;;
		//mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
		mouseX = event.touches[0].pageX ;
		mouseY = event.touches[0].pageY ;
	}
}
/*
function windowResizeHandler() {
	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;
	
	canvas.width = SCREEN_WIDTH;
	canvas.height = SCREEN_HEIGHT;
}
 */

function loop_R() {
	//$("#status").html(mouseIsDown);
	if( mouseIsDown_R ) {
		//RADIUS_SCALE += ( RADIUS_SCALE_MAX - RADIUS_SCALE ) * (0.02);
		//context.globalAlpha=1;
		context_R.fillStyle = 'rgba(0,0,0,0.05)';
	}
	else {
		//RADIUS_SCALE -= ( RADIUS_SCALE - RADIUS_SCALE_MIN ) * (0.02);
		//context.globalAlpha=0;
		//context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context_R.fillStyle = "#56A5EC";
		//context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	}
	
	RADIUS_SCALE = Math.min( RADIUS_SCALE, RADIUS_SCALE_MAX );
	context_R.fillRect(0, 0, context_R.canvas.width, context_R.canvas.height);
	

	
	for (i = 0, len = particles_R.length; i < len; i++) {
		var particle = particles_R[i];
		
		var lp = { x: particle.position.x, y: particle.position.y };
		
		// Rotation
		particle.offset.x += particle.speed;
		particle.offset.y += particle.speed;
		
		// Follow mouse with some lag
		if(mouseIsDown_R==true){
			particle.shift.x += ( mouseX+offsetX_R - particle.shift.x) * (particle.speed);
			particle.shift.y += ( mouseY+offsetY_R - particle.shift.y) * (particle.speed);
		}
		// Apply position
		particle.position.x = particle.shift.x + Math.cos(i + particle.offset.x) * (particle.orbit*RADIUS_SCALE);
		particle.position.y = particle.shift.y + Math.sin(i + particle.offset.y) * (particle.orbit*RADIUS_SCALE);
		
		// Limit to screen bounds
		particle.position.x = Math.max( Math.min( particle.position.x, SCREEN_WIDTH ), 0 );
		particle.position.y = Math.max( Math.min( particle.position.y, SCREEN_HEIGHT ), 0 );
		
		particle.size += ( particle.targetSize - particle.size ) * 0.05;
		
		if( Math.round( particle.size ) == Math.round( particle.targetSize ) ) {
			particle.targetSize = 1 + Math.random() * 7;
		}
		
		context_R.beginPath();
		context_R.fillStyle = particle.fillColor;
		context_R.strokeStyle = particle.fillColor;
		context_R.lineWidth = particle.size;
		context_R.moveTo(lp.x, lp.y);
		context_R.lineTo(particle.position.x, particle.position.y);
		context_R.stroke();
		context_R.arc(particle.position.x, particle.position.y, particle.size/2, 0, Math.PI*2, true);
		context_R.fill();
	}
}

