;(function(namespace) {
  'use strict';

  	var samples = [];
	var examplesBox = document.getElementById('samples');
	var noteSelector = document.getElementById('note-picker');
	var harmonySelector = document.getElementById('harmony-picker');

	var run = function(note, harmony) {
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

		drawPianoKeys(note, harmony);


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

	var cleanUpPianoKeys = function(button) {
		var blackKey = {};
		if (button.className == undefined && button.className !== 'key') {
			return;
		}
		button.classList.remove('active');

		blackKey = button.parentNode.querySelector('span');
		if (blackKey == null || blackKey.className == undefined) {
			return;
		}
		blackKey.classList.remove('active');
	}

	var drawPianoKeys = function(note, harmony) {
		harmony = harmony.split('_');
		if (harmony.length !== 2) {
			return false;
		}
		var line = new Note(note).buildHarmony(harmony[0], harmony[1]).harmonyToArray();
		var keys = document.querySelectorAll('.key');

		for (var key in keys) {
			cleanUpPianoKeys(keys[key]);
		}
		line.forEach(function(key){
			var element = document.getElementById(key.note + key.octave);
			if (element == null) {
				return;
			}
			var classes = element.className;
			element.className = classes + ' active';
		});
	}

	var buildNoteSelector = function() {
		Note.prototype.notes.forEach(function(single){
			var option = document.createElement('option');
			option.value = single + '2';
			option.innerHTML = single + '2';
			noteSelector.appendChild(option);
		})
	}

	var refreshPiano = function() {
		var target = document.querySelector('#note-picker option:checked').value;
		var harmonyElement = document.querySelector('#harmony-picker option:checked');

		document.getElementById('selected-harmony').innerHTML = harmonyElement.innerHTML;
		console.log(harmonyElement.value);
		run(target, harmonyElement.value);
	}

	var fireEventListeners = function() {
		noteSelector.addEventListener('change', function(event){
			refreshPiano();
		});

		harmonySelector.addEventListener('change', function(event){
			refreshPiano();
		});
	}

	fireEventListeners();
	buildNoteSelector();
	run('C2', 'harmonic_major');
})(window.Note = window.Note || {});