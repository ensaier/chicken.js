var Note = (function() {
	'use strict';

	var midiMultiplier = 12;

	/**
	 * Note entity
	 * @param {string} composed Note string like (C#2)
	 */
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
		/**
		 * Simple array with notes consequence
		 * @type {Array}
		 */
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
				major: [2, 2, 1, 2, 2, 2, 1]
			}
		},
		/**
		 * Harmony array
		 * @type {Array}
		 */
		harmony: [],
		/**
		 * Transponate octave
		 * @param  {integer} octave Octave
		 */
		transponate: function(octave) {
			this.octave += octave;
		},
		/**
		 * Check is note
		 * @param  {string}  char Note char
		 * @return {Boolean}
		 */
		isNote: function(char) {
			return this.notes.indexOf(char) > -1;
		},
		/**
		 * Fallback for case where note is incorrect
		 */
		setDefaultNote: function() {
			this.note = this.notes[0];
			this.octave = 3;
		},
		/**
		 * Harmony builder
		 * @param  {string} type    harmony type
		 * @param  {string} harmony harmony
		 * @return {object}         self for chaining
		 */
		buildHarmony: function(type, harmony, options) {
			var line = [];
			var position = this.notes.indexOf(this.note);
			var haystack = [];

			options = options || {};

			haystack = this.harmonies[type][harmony];
			if (options.pentatonic !== undefined && options.pentatonic) {
				haystack = haystack.map(this.buildPentatonic);
			}

			for (var i = 0; i < 7; i) {
				haystack.forEach(function(halftones){
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

		buildPentatonic: function(value) {
			if (value > 1) {
				return value;
			}
		},
		/**
		 * Export harmony to the string concatenated with an underscore symbol
		 * @return {string} Harmony
		 */
		harmonyToString: function() {
			var line = '';
			this.harmony.map(function(note){
				line += note.note + note.octave + ' ';
			});

			return line;
		},
		/**
		 * Getter for harmony
		 * @return {array} Harmony
		 */
		harmonyToArray: function() {
			return this.harmony;
		},
		/**
		 * Export note to midi note
		 * @return {integer} note integer
		 */
		toMIDI: function() {
			// Type conversion
			var octaveCalc = +this.octave + 1;
			var localMultiplier = octaveCalc * midiMultiplier;
			var noteOffset = this.notes.indexOf(this.note);

			if (noteOffset < 0) {
				return noteOffset;
			}

			// Type conversion
			return (localMultiplier + 0) + (noteOffset + 0);
		},

	};

	return Note;
}());