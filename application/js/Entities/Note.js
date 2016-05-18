var Note = (function() {
	'use strict';

	var Note = function(composed) {
		this.network = new Architect.Perceptron(40, 25, 3);
		this.network.trainer = function() {}

		if (composed.length !== 2 && composed.length !== 3) {
			console.warn('Something wrong with a note notation');
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
		transponate: function(octave) {
			this.octave += octave;
		},
		isNote: function(char) {
			return this.notes.indexOf(char) > 0;
		},
		setDefaultNote: function() {
			this.note = this.notes[0];
			this.octave = 3;
		}
	};

	return Note;
}());