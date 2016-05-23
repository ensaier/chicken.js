;(function(namespace) {
  'use strict';

  	var samples = [];
	var examplesBox = document.getElementById('samples');

	var noteSelector = document.getElementById('note-picker');
	var harmonySelector = document.getElementById('harmony-picker');
	var pentatonicSelector = document.getElementById('pentatonic-picker');
	var playButton = document.getElementById('play-button');
	var stopButton = document.getElementById('stop-button');

	/**
	 * Make all logic about harmony preparation and representation
	 * @param  {string} note    Note string
	 * @param  {string} harmony Harmony string
	 */
	var run = function(note, harmony, options) {
		samples = [];
		samples.push({
			result: new Note(note).buildHarmony('melodic', 'minor').harmonyToString(),
			title: 'Melodic minor'
		});

		samples.push({
			result: new Note(note).buildHarmony('harmonic', 'major').harmonyToString(),
			title: 'Harmonic major'
		});

		samples.push({
			result: new Note(note).buildHarmony('harmonic', 'minor').harmonyToString(),
			title: 'Harmonic minor'
		});

		// Cleanup and draw. Causes child request to cleanUpPianoKeys function
		drawPianoKeys(note, harmony, options);

		examplesBox.innerHTML = '';

		samples.forEach(function(sample){
			var title = document.createElement('h3');
			var line = document.createElement('p');

			title.innerHTML = sample.title;
			line.innerHTML = sample.result;
			line.className = 'alert alert-info';
			examplesBox.appendChild(title);
			examplesBox.appendChild(line);
		});
	}

	/**
	 * Clean 'Active classes' and add actual 'Active' classes
	 * @param  {string} note    Note
	 * @param  {string} harmony Harmony
	 */
	var drawPianoKeys = function(note, harmony, options) {
		var line = {};
		var keys = {};

		harmony = harmony.split('_');
		if (harmony.length !== 2) {
			return false;
		}

		line = new Note(note).buildHarmony(harmony[0], harmony[1], options).harmonyToArray();
		midiPlayer.playHarmony(line);

		Pianoboard.markActiveKeys(line);
	}

	/**
	 * Build notes dropdown dynamicaly
	 * @return {[type]} [description]
	 */
	var buildNoteSelector = function() {
		Note.prototype.notes.forEach(function(single){
			var option = document.createElement('option');
			option.value = single + '2';
			option.innerHTML = single + '2';
			noteSelector.appendChild(option);
		})
	}

	/**
	 * Encapsulated trigger for event handlers
	 * @return {[type]} [description]
	 */
	var refreshPiano = function() {
		clearInterval(window.currentPlayback);

		var target = document.querySelector('#note-picker option:checked').value;
		var harmonyElement = document.querySelector('#harmony-picker option:checked');
		var pentatonic = document.querySelector('#pentatonic-picker option:checked').value == 1;
		var options = {
			pentatonic: pentatonic
		}

		document.getElementById('selected-harmony').innerHTML = harmonyElement.innerHTML;

		run(target, harmonyElement.value, options);
	}

	/**
	 * Start event listeners
	 */
	var fireEventListeners = function() {
		// Change note listener
		noteSelector.addEventListener('change', refreshPiano);

		// Change harmony listener
		harmonySelector.addEventListener('change', refreshPiano);

		pentatonicSelector.addEventListener('change', refreshPiano);

		playButton.addEventListener('click', refreshPiano);

		stopButton.addEventListener('click', function(event){
			clearInterval(window.currentPlayback);
		});
	}

	// For the test purposes
	console.log('Midi',(new Note('C3')).toMIDI());

	fireEventListeners();
	buildNoteSelector();
	refreshPiano();
})(window.Note = window.Note || {});