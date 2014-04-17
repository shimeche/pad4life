
// 建立音訊來源 for audio
function createSourceFromAudio(audio, _loop) {

    var _loop = _loop==undefined ? true : false;

    audio.loop = _loop;
    var source = context.createMediaElementSource(audio);

    var gainNode = context.createGain ? context.createGain() : context.createGainNode();

    source.connect(gainNode);

    var filter = context.createBiquadFilter();
    filter.type = 0; // LOWPASS
    filter.frequency.value = 5000;
    // Connect source to filter, filter to destination.
    gainNode.connect(filter);
    filter.connect(context.destination);

    return {
      source: source,
      gainNode: gainNode,
      filter:filter
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

function changeAudioSpeed (element, audio) {

    var volume = element.value;
    // var fraction = parseInt(element.value) / parseInt(element.max);
    // Let's use an x*x curve (x-squared) since simple linear (x) does not
    // sound as good.
    var sv;
    // sv = fraction * fraction;
    sv = volume;
    console.log(sv);
    // if (audio) {
        audio.playbackRate = sv;
    // }

    return sv;
};



function changeAudioSource (a, elementValue) {

    if (a) {
        a.src = "sounds/" + elementValue + ".wav";
        a.play();
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


function changeFrequency(element, s) {
  // Clamp the frequency between the minimum value (40 Hz) and half of the
  // sampling rate.
  var minValue = 40;
  var maxValue = context.sampleRate / 2;
  // Logarithm (base 2) to compute how many octaves fall in the range.
  var numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
  // Compute a multiplier from 0 to 1 based on an exponential scale.
  var multiplier = Math.pow(2, numberOfOctaves * (element.value - 1.0));
  // Get back to the frequency value between min and max.
  s.filter.frequency.value = maxValue * multiplier;
};


function changeQuality(element,s) {
  s.filter.Q.value = element.value * 30;
};