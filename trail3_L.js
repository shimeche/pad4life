



var canvas_L;
var context_L;
var particles_L;
var mouseIsDown_L = false;
var offsetX_L=-500;
var offsetY_L=0;

function initTrail_L(colorPanel) {

  canvas_L = document.getElementById( colorPanel );
  
  if (canvas_L && canvas_L.getContext) {
		context_L = canvas_L.getContext('2d');
		var orange=["#C47451","#C36241","#C35817","#C35817","#CC6600",
		          "#E56717","#E66C2C","#F87217","#F87431","#E67451",
		          "#FF8040","#F88017","#FF7F50","#F88158",",#F9966B",
		          "#F2BB66","#FBB917","#FBB117","#FFA62F","#E9AB17"
		          ];
		// Register event listeners
		canvas_L.addEventListener('mousemove', documentMouseMoveHandler_L, false);
		//window.addEventListener('mousedown', documentMouseDownHandler, false);
		canvas_L.addEventListener('pointerdown', documentMouseDownHandler_L, false);
		//window.addEventListener('mouseup', documentMouseUpHandler, false);
		canvas_L.addEventListener('pointerup', documentMouseUpHandler_L, false);
		canvas_L.addEventListener('touchstart', documentTouchStartHandler_L, false);
		canvas_L.addEventListener('touchmove', documentTouchMoveHandler_L, false);
		//window.addEventListener('resize', windowResizeHandler, false);
		
		createParticles_L(orange);
		
		//windowResizeHandler();
		
		setInterval( loop_L, 1000 / 60 );
	}
}

function createParticles_L(orange) {
	particles_L = [];
	//fillColor: '#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16),
	var pColor;
	for (var i = 0; i < orange.length; i++) {
		//pColor='#' + (Math.random() * 0x404040 + 0xaaaaaa | 0).toString(16);
		//console.log(pColor);
		var particle = {
			size: 1,
			position: { x: mouseX, y: mouseY },
			offset: { x: 0, y: 0 },
			shift: { x: mouseX, y: mouseY },
			speed: 0.01+Math.random()*0.3,
			targetSize: 1,
			fillColor: orange[i],
			orbit: RADIUS*.5 + (RADIUS * .5 * Math.random())
		};
		
		particles_L.push( particle );
	}
}

function documentMouseMoveHandler_L(event) {
	//mouseX = event.clientX - (window.innerWidth - SCREEN_WIDTH) * .5;
	//mouseY = event.clientY - (window.innerHeight - SCREEN_HEIGHT) * .5;
	
	//mouseX = event.pageX - (window.innerWidth - SCREEN_WIDTH) * .5;
	//mouseY = event.pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
	if(mouseIsDown_L==true){
		mouseX = event.clientX;
		mouseY = event.clientY;
	}
	//mouseX = event.pageX ;
	//mouseY = event.pageY ;
}

function documentMouseDownHandler_L(event) {
	mouseIsDown_L = true;
}

function documentMouseUpHandler_L(event) {
	mouseIsDown_L = false;
}

function documentTouchStartHandler_L(event) {
	if(event.touches.length == 1) {
		event.preventDefault();

		//mouseX = event.touches[0].pageX - (window.innerWidth - SCREEN_WIDTH) * .5;;
		//mouseY = event.touches[0].pageY - (window.innerHeight - SCREEN_HEIGHT) * .5;
		mouseX = event.touches[0].pageX ;
		mouseY = event.touches[0].pageY ;
	}
}

function documentTouchMoveHandler_L(event) {
	if(event.touches.length == 1 && mouseIsDown_L==true) {
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

function loop_L() {
	//$("#status").html(mouseIsDown);
	if( mouseIsDown_L ) {
		//RADIUS_SCALE += ( RADIUS_SCALE_MAX - RADIUS_SCALE ) * (0.02);
		//context.globalAlpha=1;
		context_L.fillStyle = 'rgba(0,0,0,0.05)';
	}
	else {
		//RADIUS_SCALE -= ( RADIUS_SCALE - RADIUS_SCALE_MIN ) * (0.02);
		//context.globalAlpha=0;
		//context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context_L.fillStyle = "#F3E5AB";
		//context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	}
	
	RADIUS_SCALE = Math.min( RADIUS_SCALE, RADIUS_SCALE_MAX );
	context_L.fillRect(0, 0, context_L.canvas.width, context_L.canvas.height);
	

	
	for (i = 0, len = particles_L.length; i < len; i++) {
		var particle = particles_L[i];
		
		var lp = { x: particle.position.x, y: particle.position.y };
		
		// Rotation
		particle.offset.x += particle.speed;
		particle.offset.y += particle.speed;
		
		// Follow mouse with some lag
		if(mouseIsDown_L==true){
			particle.shift.x += ( mouseX+offsetX_L - particle.shift.x) * (particle.speed);
			particle.shift.y += ( mouseY+offsetY_L- particle.shift.y) * (particle.speed);
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
		
		context_L.beginPath();
		context_L.fillStyle = particle.fillColor;
		context_L.strokeStyle = particle.fillColor;
		context_L.lineWidth = particle.size;
		context_L.moveTo(lp.x, lp.y);
		context_L.lineTo(particle.position.x, particle.position.y);
		context_L.stroke();
		context_L.arc(particle.position.x, particle.position.y, particle.size/2, 0, Math.PI*2, true);
		context_L.fill();
	}
}

