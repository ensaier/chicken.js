var MidiCompiler = (function(){

	var defaultPianoBoard = {
		markPressedKey: function() {}
	}

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
				this.currentPlayback = setInterval(function(){
					var target;
					var localNote;
					if (i == harmony.length) {
						inverse = true;
						i -= 2;
					}

					if (harmony[i] == undefined || i < 0) {
						clearInterval(this.currentPlayback);
						return;
					}

					target = harmony[i].note + harmony[i].octave;
					localNote = new Note(target).toMIDI();

					// TODO pass it throught callback
					this.pianoboard.markPressedKey(target);

					if (inverse) {
						if (Math.random() > 0.3 || i > (harmony.length - 3)) {
							i--;
						} else {
							i++;
						}
					} else {
						if (Math.random() > 0.3 || i < 2) {
							i++;
						} else {
							i--;
						}
					}
					MIDI.setVolume(0, 127);
					MIDI.noteOn(0, localNote, velocity, delay);
				}.bind(this), 100);
			}.bind(this)
		});
	}

	// Constructor
	var Construct = function(options) {
		this.pianoboard = options.pianoboard || defaultPianoBoard;
		this.playHarmony = playHarmony.bind(this);
		this.currentPlayback = {};
	}

	return Construct;
})();