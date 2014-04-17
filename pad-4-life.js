

	var lSource, rSource, gainNode1, OtherMusic;
	var lPlaying, rPlaying;
	var lGainValue, rGainValue;
	var lSpeedValue, rSpeedValue;


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

	};


	function changeSource1Speed (element) {

		lSpeedValue = changeSpeed(element, lSource);

	};



	function changeSourceMusic (sid, element) {
		var s;
		if (sid==1) {
			s = lSource;
		}else if(sid==2) {			
			s = rSource;
		}
		if (s) {
			s.source.buffer = BUFFERS[element.value];
		}
	}



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

		rGainValue = changeVolume(element, rSource);
		
	};


	function changeSource2Speed (element) {

		rSpeedValue = changeSpeed(element, rSource);

	};


