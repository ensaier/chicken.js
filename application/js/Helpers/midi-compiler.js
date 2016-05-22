(function(){
		MIDI.loadPlugin({
		soundfontUrl: "../vendor/soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			console.log(state, progress);
		},
		onsuccess: function() {
			var delay = 0; // play one note every quarter second
			var note = 50; // the MIDI note
			var velocity = 127; // how hard the note hits
			// play the note
			// MIDI.setVolume(0, 127);
			// MIDI.noteOn(0, note, velocity, delay);
			// MIDI.noteOff(0, note, delay + 0.75);

			var harmony = new Note('B3').buildHarmony('harmonic', 'minor').harmonyToArray();

			// TODO: Create some ES6 iterator here
			var i = 0;
			var interval = setInterval(function(){
				var target;
				var localNote;
				if (harmony[i] == undefined) {
					clearInterval(interval);
					return;
				}

				target = harmony[i].note + harmony[i].octave;
				// console.log(harmony);
				localNote = new Note(target).toMIDI();
				i++;
				console.log('loccy', target, localNote);
				MIDI.setVolume(0, 127);
				MIDI.noteOn(0, localNote, velocity, delay);
				// MIDI.noteOff(0, localNote, delay + 0.75);
			}, 200);

		}
	});
})();