
// 建立音訊來源
function createSource(buffer, _loop) {

    var _loop = _loop==undefined ? true : false;

    var source = context.createBufferSource();
    var gainNode = context.createGain ? context.createGain() : context.createGainNode();
    source.buffer = buffer;
    // Turn on looping
    source.loop = _loop;

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


// 調整音量
function changeVolume (element, souce) {
	
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

//調整速度
function changeSpeed (element, souce) {

    var volume = element.value;
    // var fraction = parseInt(element.value) / parseInt(element.max);
    // Let's use an x*x curve (x-squared) since simple linear (x) does not
    // sound as good.
    var sv;
    // sv = fraction * fraction;
    sv = volume;
    console.log(sv);
    if (souce) {
        souce.source.playbackRate.value = sv;
    }

    return sv;
};

//
function changeSource (s, elementValue) {

    if (s) {
        s.source.buffer = BUFFERS[elementValue];
    }
}


function crossfade(element, s1, s2) {
    var x = parseInt(element.value) / parseInt(element.max);
    // Use an equal-power crossfading curve:
    var gain1 = Math.cos(x * 0.5*Math.PI);
    var gain2 = Math.cos((1.0 - x) * 0.5*Math.PI);
    s1.gainNode.gain.value = gain1;
    s2.gainNode.gain.value = gain2;
};