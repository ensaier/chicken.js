;(function(neuralify, synaptic) {
	'use strict';

	var entity = neuralify
	var network = {};
	var NoteEntity = Note;
	var notes = [];
	if (Object.keys(synaptic).length < 1) {
  		console.warn('Please check your synaptic. Application stopped');
  		return;
	}

	notes.push(new NoteEntity('C1'));
	notes.push(new NoteEntity('G#3'));
	console.log(notes);
})(
	window.neuralify = window.neuralify || {},
	window.synapcit = window.synaptic || {}
);