

	var lSource, rSource, OtherMusic;
	var lSourceBufferName, rSourceBufferName;
	var lPlaying, rPlaying;
	var lGainValue, rGainValue;
	var lSpeedValue, rSpeedValue;
	var lSourceStartAt, rSourceStartAt, 
	lSourcePauseAt, rSourcePauseAt,
	lSourcePaused, rSourcePaused;


//control source 2


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

	}


//control source 2
	
	function toggleLSource2 (argument) {

		if (argument) {

			rSourceBufferName = argument;

		}else if (!rSourceBufferName) {

			rSourceBufferName = 'drums';

		}

		if (!rPlaying) {
			rSource = createSource(BUFFERS[rSourceBufferName]);

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