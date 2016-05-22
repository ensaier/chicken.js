/**
 * Developed by Oleksandr Tryshchenko, 2016
 * MIT
 */
var Pianoboard = (function(){
	'use strict';

	var counter = 0;
	var octave = 1;
	// Notes with halfnotes for iterations
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

	var keys = document.querySelectorAll('.key');

	/**
	 * Keyboard identifier. Adds notes id, halftone data and label
	 * @param  {string} key  Object key
	 * @param  {object} keys Keys object
	 */
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

		labelElement.innerHtml = note.full;
		button.parentNode.appendChild(labelElement);

		button.id = note.full + octave;
		labelElement.innerHTML = note.full + octave;
		counter++;
	}

	var iterateCleanup = function(keys, classname) {
		for (var key in keys) {
			cleanUpPianoKeys(keys[key], classname);
		}
	}

	/**
	 * Remove 'active' class from piano keys
	 * @param  {[type]} button [description]
	 * @return {[type]}        [description]
	 */
	var cleanUpPianoKeys = function(button, className) {
		var blackKey = {};
		if (button.className == undefined && button.className !== 'key') {
			return;
		}
		button.classList.remove(className);

		blackKey = button.parentNode.querySelector('span');
		if (blackKey == null || blackKey.className == undefined) {
			return;
		}
		blackKey.classList.remove(className);
	}

	var markActiveKeys = function(line) {
		iterateCleanup(keys, 'active');
		line.forEach(function(key){
			var element = document.getElementById(key.note + key.octave);
			var classes = {};

			if (element == null) {
				return;
			}

			element.className += ' active';
		});
	}

	var markPressedKey = function(key) {
		var pressedClassName = 'pressed';
		var element = document.getElementById(key);

		iterateCleanup(keys, pressedClassName);
		if (element == null) {
			return false;
		}

		element.className += ' ' + pressedClassName;
	}

	console.log(notes.indexOf('C'));

	// Goes through .key elements add add notes
	for (var key in keys) {
		initialIteration(key, keys);
	}

	return {
		markActiveKeys: markActiveKeys,
		markPressedKey: markPressedKey
	}
})();