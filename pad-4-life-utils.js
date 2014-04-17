

function createSource(buffer) {
    var source = context.createBufferSource();
    var gainNode = context.createGain ? context.createGain() : context.createGainNode();
    source.buffer = buffer;
    // Turn on looping
    source.loop = true;

    // source.playbackRate.value = 0.2;

    // Connect source to gain.
    source.connect(gainNode);
    // Connect gain to destination.
    gainNode.connect(context.destination);

    return {
      source: source,
      gainNode: gainNode
    };
}



function changeSpeed (element, souce) {
	
	var volume = element.value;
	var fraction = parseInt(element.value) / parseInt(element.max);
	// Let's use an x*x curve (x-squared) since simple linear (x) does not
	// sound as good.
	var gv;
	gv = fraction * fraction;

	console.log(gv);
	if (souce) {
		souce.gainNode.gain.value = gv;
	}

	return gv;
};