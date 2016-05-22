var midiPlayer = (function(){
	var playHarmony = function(harmony) {
		MIDI.loadPlugin({
			soundfontUrl: "../vendor/soundfont/",
			instrument: "acoustic_grand_piano",
			onprogress: function(state, progress) {
				console.log(state, progress);
			},
			onsuccess: function() {
				var delay = 0; 
				var note = 50; 
				var velocity = 127;
				var inverse = false;
				// TODO: Create some ES6 iterator here
				var i = 0;
				var interval = setInterval(function(){
					var target;
					var localNote;
					if (i == harmony.length) {
						inverse = true;
						i--;
					}

					if (harmony[i] == undefined || i < 0) {
						clearInterval(interval);
						return;
					}

					target = harmony[i].note + harmony[i].octave;
					localNote = new Note(target).toMIDI();
					
					if (inverse) {
						i--;
					} else {
						i++;
					}
					MIDI.setVolume(0, 127);
					MIDI.noteOn(0, localNote, velocity, delay);
				}, 100);

			}
		});
	}

	return {
		playHarmony: playHarmony
	}
})();