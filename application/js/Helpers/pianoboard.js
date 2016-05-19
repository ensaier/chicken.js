/**
 * Developed by Oleksandr Tryshchenko, 2016
 * MIT
 */


var Pianoboard = (function(){
	'use strict';

	var counter = 3;
	var octave = 1;
	var notes = [
		{
			full: 'C',
			half: 'C#'
		},
		{
			full: 'D',
			half: 'D#',
		},
		{
			full: 'E',
			half: null
		},
		{
			full: 'F',
			half: 'F#'
		},
		{
			full: 'G',
			half: 'G#'
		},
		{
			full: 'A',
			half: 'A#'
		},
		{
			full: 'B',
			half: null
		}
	];
	var initialIteration = function(key, keys) {
		var labelElement = document.createElement('b');
		var halftone = null;
		var note = {};
		var button = keys[key];

		if (button.className == undefined && button.className !== 'key') {
			return;
		}
		// TODO: Write an ES6 iterator here
		if (counter == notes.length) {
			counter = 0;
			octave++;
		}

		note = notes[counter];

		if (note.half !== null) {
			halftone = note.half + octave;
			button.parentNode.querySelector('span').id = halftone;
		}

		button.id = note.full + octave;
		labelElement.innerHTML = note.full + octave;
		counter++;
	}

	var keys = document.querySelectorAll('.key');

	for (var key in keys) {
		initialIteration(key, keys);
	}
})();