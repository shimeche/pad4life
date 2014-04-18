

	var lSource, rSource, OtherMusic;
	var lSourceBufferName, rSourceBufferName;
	var lPlaying, rPlaying;
	var lGainValue, rGainValue;
	var lSpeedValue, rSpeedValue;
	var lSourceStartAt, rSourceStartAt, 
	lSourcePauseAt, rSourcePauseAt,
	lSourcePaused, rSourcePaused;
	var lAudio = new Audio(), rAudio = new Audio(), oAudio = new Audio();

	function toggleLSource1 (argument) {

		if (argument) {

			lSourceBufferName = argument;

		}else if (!lSourceBufferName) {

			lSourceBufferName = 'techno';

		}

		if (!lPlaying) {
			lSource = createSource(BUFFERS[lSourceBufferName]);

			// 如果有預設的設定值
			if (lGainValue>0)
				lSource.gainNode.gain.value = lGainValue;
			if (lSpeedValue>0)
				lSource.source.playbackRate.value = lSpeedValue;

			lSourcePaused = false;

		    if (lSourcePauseAt) {
				lSourceStartAt = Date.now() - lSourcePauseAt;
				lSource.source.start(0, lSourcePauseAt / 1000);
		    }
		    else {
				lSourceStartAt = Date.now();
				lSource.source.start(0);
		    }

			lPlaying = true;
		}

	}


	function pauseSource1 (argument) {
		lSource.source.stop(0);
		lSourcePauseAt = Date.now() - lSourceStartAt;
		lSourcePaused = true;
		lPlaying = false;

	}
	function stopSource1 (argument) {

		if (lSource) {
  			lSource.source.stop(0);
  			lSourcePauseAt = 0;
  			lPlaying = false;
  		}
	}
	function changeSource1Volume (element) {

		lGainValue = changeVolume(element, lSource);

	}
	function changeSource1Speed (element) {

		lSpeedValue = changeSpeed(element, lSource);
		//lSpeedValue = changeAudioSpeed(element, lAudio);

	}
	function changeSource1Frequency (element) {
		changeFrequency(element.value, lSource);
	}
	function changeSource1Quality (element) {
		changeQuality(element.value, lSource);
	}


//control source 2
	function toggleSource2 (argument) {

		if (argument) {

			rSourceBufferName = argument;

		}else if (!rSourceBufferName) {

			rSourceBufferName = 'techno';

		}

		if (!rPlaying) {
			rSource = createSource(BUFFERS[rSourceBufferName]);

			// 如果有預設的設定值
			if (rGainValue>0)
				rSource.gainNode.gain.value = rGainValue;
			if (rSpeedValue>0)
				rSource.source.playbackRate.value = rSpeedValue;

			rSourcePaused = false;

		    if (rSourcePauseAt) {
				rSourceStartAt = Date.now() - rSourcePauseAt;
				rSource.source.start(0, rSourcePauseAt / 1000);
		    }
		    else {
				rSourceStartAt = Date.now();
				rSource.source.start(0);
		    }

			rPlaying = true;
		}

	}


	function pauseSource2 (argument) {
		rSource.source.stop(0);
		rSourcePauseAt = Date.now() - rSourceStartAt;
		rSourcePaused = true;
		rPlaying = false;

	}
	function stopSource2 (argument) {

		if (rSource) {
  			rSource.source.stop(0);
  			rSourcePauseAt = 0;
  			rPlaying = false;
  		}
	}
	function changeSource2Volume (element) {

		rGainValue = changeVolume(element, rSource);

	}
	function changeSource2Speed (element) {

		rSpeedValue = changeSpeed(element, rSource);
		//lSpeedValue = changeAudioSpeed(element, lAudio);

	}
	function changeSource2Frequency (element) {
		changeFrequency(element.value, rSource);
	}
	function changeSource2Quality (element) {
		changeQuality(element.value, rSource);
	}




//control other source

	function toggleLSource3 (argument) {

		OtherMusic = createSource(BUFFERS[argument], false);

		OtherMusic.source.start(0);

	}

//control two source

	function crossFadeTwoSource (element) {
		crossfade(element, lSource, rSource);
	}


	function changeSourceMusic (sid, element) {
	    var s, ev;
	    ev = element.value;

	    if (sid==1) {
	        s = lSource;
	        lSourceBufferName = ev;
	    }else if(sid==2) {          
	        s = rSource;
	        rSourceBufferName = ev;
	    }

	    changeSource(s, ev);
	}

	// function syncLeftRightAudio()
	// {

	// 	if ( (!lPlaying) || (!rPlaying) ) return;
	// 	if ( (rAudio == null ) || (lAudio == null) ) return;

	// 	rAudio.currentTime = lAudio.currentTime;


	// }

