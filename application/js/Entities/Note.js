var Note = (function() {
	'use strict';

	var Note = function(composed) {
		this.network = new Architect.Perceptron(40, 25, 3);

		if (composed.length !== 2) {
			console.warn('Something wrong with a note notation');
			this.setDefaultNote();
		} else {
			this.note = composed[0];
			this.octave = composed[1];
		}

		if (!this.isNote(this.note)) {
			console.warn('Something wrong with a note notation');
			this.setDefaultNote();
		}
	}

	Note.prototype = {
		notes: ['C','D','E','F','G','A', 'B'],
		transponate: function(octave) {
			this.octave += octave;
		},
		isNote: function(char) {
			return this.notes.indexOf(char) == 1;
		},
		setDefaultNote: function() {
			this.note = this.notes[0];
			this.octave = 3;
		}
	};

	return Note;
}());