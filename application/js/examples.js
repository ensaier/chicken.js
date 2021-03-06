;(function(namespace) {
  'use strict';

  	var midiPlayer = new MidiCompiler({pianoboard: Pianoboard});
  	var samples = [];
	var examplesBox = document.getElementById('samples');
	var noteSelector = document.getElementById('note-picker');
	var harmonySelector = document.getElementById('harmony-picker');
	var pentatonicSelector = document.getElementById('pentatonic-picker');
	var playButton = document.getElementById('play-button');
	var stopButton = document.getElementById('stop-button');
	var speedInput = document.getElementById('speed-input');
	var sizeSelector = document.getElementById('size-picker');
	var show;

	/**
	 * Clean 'Active classes' and add actual 'Active' classes
	 * @param  {string} note    Note
	 * @param  {string} harmony Harmony
	 */
	var drawPianoKeys = function(note, harmony, options) {
		var line = {};
		var keys = {};
		var prebuilt;
		var stringified;

		harmony = harmony.split('_');
		if (harmony.length !== 2) {
			return false;
		}

		prebuilt = new Note(note).buildHarmony(harmony[0], harmony[1], options);
		line = prebuilt.harmonyToArray();
		stringified = prebuilt.harmonyToString();

		document.getElementById('sample-title').innerHTML = harmony[0] + ' ' + harmony[1];
		document.getElementById('sample-text').innerHTML = stringified;

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
		clearInterval(midiPlayer.currentPlayback);

		var target = document.querySelector('#note-picker option:checked').value;
		var harmonyElement = document.querySelector('#harmony-picker option:checked');
		var pentatonic = document.querySelector('#pentatonic-picker option:checked').value == 1;
		var speed = speedInput.value;
		var size = sizeSelector.querySelector('option:checked').value;

		midiPlayer.setSpeed(speed);
		speedInput.value = midiPlayer.getSpeed();

		midiPlayer.setSize(size);

		var options = {
			pentatonic: pentatonic
		}

		document.getElementById('selected-harmony').innerHTML = harmonyElement.innerHTML;

		drawPianoKeys(target, harmonyElement.value, options);
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

		sizeSelector.addEventListener('change', refreshPiano);

		playButton.addEventListener('click', refreshPiano);

		stopButton.addEventListener('click', function(event){
			clearInterval(midiPlayer.currentPlayback);
		});

		speedInput.addEventListener('input', refreshPiano);
		speedInput.addEventListener('change', refreshPiano);
	}

	fireEventListeners();
	buildNoteSelector();
	refreshPiano();
})(window.Note = window.Note || {});