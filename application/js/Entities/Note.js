var Note = (function() {
	'use strict';

	var midiMultiplier = 12;

	var Note = function(composed) {
		this.network = new Architect.Perceptron(40, 25, 3);

		if ([2,3].indexOf(composed.length) == -1) {
			console.warn('Something wrong with a note notation', [2,3].indexOf(composed.length));
			this.setDefaultNote();
		} else {
			if (composed.length == 3) {
				this.note = composed[0] + composed[1];
				this.octave = composed[2];
			} else {
				this.note = composed[0];
				this.octave = composed[1];
			}
		}

		if (!this.isNote(this.note)) {
			console.warn('Something wrong with a note notation');
			this.setDefaultNote();
		}
	}

	Note.prototype = {
		notes: ['C', 'C#','D', 'D#','E','F', 'F#','G', 'G#', 'A', 'A#', 'B'],
		// Halftones line
		harmonies: {
			melodic: {
				minor: [2, 1, 2, 2, 2, 2, 1]
			},
			harmonic: {
				major: [2, 2, 1, 2, 1, 2, 3],
				minor: [2, 1, 2, 2, 1, 3, 1]
			},
			natural: {
				minor: [2, 1, 2, 2, 1, 2, 2],
				ionical: [2, 2, 1, 2, 2, 2, 1]
			}
		},
		harmony: [],
		transponate: function(octave) {
			this.octave += octave;
		},
		isNote: function(char) {
			return this.notes.indexOf(char) > -1;
		},
		setDefaultNote: function() {
			this.note = this.notes[0];
			this.octave = 3;
		},
		buildHarmony: function(type, harmony) {
			var line = [];
			var position = this.notes.indexOf(this.note);

			for (var i = 0; i < 7; i) {
				this.harmonies[type][harmony].forEach(function(halftones){
					if (position > (this.notes.length - 1)) {
						i++;
						position = 0;
					}
					line.push({
						note: this.notes[position],
						octave: i
					});

					position += halftones;
				}.bind(this));
			}

			// Instead of erasing
			this.harmony = line;
			return this;
		},
		harmonyToString: function() {
			var line = '';
			this.harmony.map(function(note){
				line += note.note + note.octave + ' ';
			});

			return line;
		},
		harmonyToArray: function() {
			return this.harmony;
		},
		toMIDI: function() {
			// Type conversion
			var octaveCalc = +this.octave + 1;
			console.log('Octave', octaveCalc);
			var localMultiplier = octaveCalc * midiMultiplier;
			var noteOffset = this.notes.indexOf(this.note);
			if (noteOffset < 0) {
				return noteOffset;
			}

			console.log('localMultiplier', localMultiplier, noteOffset);

			return (localMultiplier + 0) + (noteOffset + 0);
		},

	};

	return Note;
}());