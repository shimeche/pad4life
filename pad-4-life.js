

	var lSource, rSource, gainNode1, OtherMusic;
	var lPlaying, rPlaying;
	var lGainValue, rGainValue;


	function toggleLSource1 (argument) {

		if (!lPlaying) {
			lSource = createSource(BUFFERS[argument]);

			if (lGainValue>0)
				lSource.gainNode.gain.value = lGainValue;
			lSource.source.start(0);
			lPlaying = true;
		}

	}

	function stopSource1 (argument) {
		if (lSource) {
  			lSource.source.stop(0);
  			lPlaying = false;
  		}
	}

	function changeSource1Volume (element) {

		lGainValue = changeSpeed(element, lSource);

	};


	


	function toggleLSource2 (argument) {
		if (!rPlaying) {
			rSource = createSource(BUFFERS[argument]);

			if (rGainValue>0)
				rSource.gainNode.gain.value = rGainValue;
			rSource.source.start(0);
			rPlaying = true;
		}
	}

	function stopSource2 (argument) {
		if (rSource) {
  			rSource.source.stop(0);
  			rPlaying = false;
  		};
	}


	function changeSource2Volume (element) {

		rGainValue = changeSpeed(element, rSource);
		
	};

