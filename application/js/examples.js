;(function(namespace) {
  'use strict';

  	var samples = [];
	var examplesBox = document.getElementById('samples');
	var noteSelector = document.getElementById('note-picker');

	var run = function(note) {
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

		drawPianoKeys(note);


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
		if (button.className == undefined && button.className !== 'key') {
			return;
		}
		button.classList.remove('active');
	}

	var drawPianoKeys = function(note) {
		var line = new Note(note).buildHarmony('harmonic', 'minor').harmonyToArray();
		var keys = document.querySelectorAll('.key');

		for (var key in keys) {
			cleanUpPianoKeys(keys[key]);
		}
		line.forEach(function(key){
			var element = document.getElementById(key.note + key.octave);
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

	var fireEventListeners = function() {
		noteSelector.addEventListener('change', function(event){
			var target = document.querySelector('#note-picker option:checked').value;
			run(target);
		});
	}

	fireEventListeners();
	buildNoteSelector();
	run('D#3');
})(window.Note = window.Note || {});