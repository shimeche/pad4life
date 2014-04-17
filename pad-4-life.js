

	var lSource, rSource, OtherMusic;
	var lPlaying, rPlaying;
	var lGainValue, rGainValue;
	var lSpeedValue, rSpeedValue;

//control source 2


	function toggleLSource1 (argument) {

		if (!lPlaying) {
			lSource = createSource(BUFFERS[argument]);

			// 如果有預設的設定值
			if (lGainValue>0)
				lSource.gainNode.gain.value = lGainValue;
			if (lSpeedValue>0)
				lSource.source.playbackRate.value = lSpeedValue;

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

		lGainValue = changeVolume(element, lSource);

	}
	function changeSource1Speed (element) {

		lSpeedValue = changeSpeed(element, lSource);

	}


//control source 2
	
	function toggleLSource2 (argument) {
		if (!rPlaying) {
			rSource = createSource(BUFFERS[argument]);

			if (rGainValue>0)
				rSource.gainNode.gain.value = rGainValue;
			if (rSpeedValue>0)	
				rSource.source.playbackRate.value = rSpeedValue;
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

		rGainValue = changeVolume(element, rSource);
		
	};


	function changeSource2Speed (element) {

		rSpeedValue = changeSpeed(element, rSource);

	};


//control other source

	function toggleLSource3 (argument) {

		OtherMusic = createSource(BUFFERS[argument], false);

		OtherMusic.source.start(0);

	}

//control two source

	function crossFadeTwoSource (element) {
		crossfade(element, lSource, rSource);
	}