

	var lSource, rSource, OtherMusic;
	var lSourceBufferName, rSourceBufferName;
	var lPlaying, rPlaying;
	var lGainValue, rGainValue;
	var lSpeedValue, rSpeedValue;
	var lSourceStartAt, rSourceStartAt, 
	lSourcePauseAt, rSourcePauseAt,
	lSourcePaused, rSourcePaused;
	var lAudio = new Audio(), rAudio = new Audio(), oAudio = new Audio();

	function toggleLOldSource1 (argument) {

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


	function toggleLSource1 (argument) {

		if (argument) {

			lSourceBufferName = argument;

		}else if (!lSourceBufferName) {

			lSourceBufferName = 'a01';

		}

		if (!lPlaying) {
			
			if (!lSource) {
				lAudio.src = "sounds/" + lSourceBufferName + ".wav";
				lSource = createSourceFromAudio(lAudio);
			}


			// 如果有預設的設定值
			if (lGainValue>0)
				lSource.gainNode.gain.value = lGainValue;
			if (lSpeedValue>0)
				lAudio.playbackRate = lSpeedValue;


			lAudio.play();


			lPlaying = true;
		}

	}

	function pauseSource1 (argument) {
		lAudio.pause();

		lPlaying = false;
	}
	function stopSource1 (argument) {

		lAudio.pause();
		lAudio.currentTime = 0;

		lPlaying = false;
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
	
	function toggleLSource2 (argument) {

		if (argument) {

			rSourceBufferName = argument;

		}else if (!rSourceBufferName) {

			rSourceBufferName = 'b01';

		}

		if (!rPlaying) {
			
			if (!rSource) {
				rAudio.src = "sounds/" + rSourceBufferName + ".wav";
				rSource = createSourceFromAudio(rAudio);
			}


			// 如果有預設的設定值
			if (rGainValue>0)
				rSource.gainNode.gain.value = rGainValue;
			if (rSpeedValue>0)
				rAudio.playbackRate = rSpeedValue;


			rAudio.play();


			rPlaying = true;
		}

	}

	function pauseSource2 (argument) {
		rAudio.pause();

		rPlaying = false;
	}
	function stopSource2 (argument) {

		rAudio.pause();
		rAudio.currentTime = 0;

		rPlaying = false;
	}
	function changeSource2Volume (element) {

		rGainValue = changeVolume(element, rSource);

	}
	function changeSource2Speed (element) {

		// lSpeedValue = changeSpeed(element, lSource);
		rSpeedValue = changeAudioSpeed(element, rAudio);

	}
	function changeSource2Frequency (element) {
		changeFrequency(element.value, rSource);
	}
	function changeSource2Quality (element) {
		changeQuality(element.value, rSource);
	}



//control other source

	function toggleLSource3 (argument) {

		oAudio.src = "sounds/" + argument + ".wav";

		if (!OtherMusic) {
			OtherMusic = createSourceFromAudio(oAudio, false);
		}

		// OtherMusic.source.start(0);
		oAudio.play();

	}

//control two source

	function crossFadeTwoSource (element) {
		crossfade(element, lSource, rSource);
	}


	function changeSourceMusic (sid, element) {
	    var ev, a;
	    ev = element.value;

	    if (sid==1) {
	        a = lAudio;
	        lSourceBufferName = ev;

	    }else if(sid==2) {          
	        a = rAudio;
	        rSourceBufferName = ev;
	    }

	    // changeSource(s, ev);
	    changeAudioSource(a, ev);
	}

	function syncLeftRightAudio()
	{

		if ( (!lPlaying) || (!rPlaying) ) return;
		if ( (rAudio == null ) || (lAudio == null) ) return;

		rAudio.currentTime = lAudio.currentTime;


	}

