;(function(neuralify, synaptic) {
	'use strict';
	if (Object.keys(synaptic).length < 1) {
  		console.warn('Please check your synaptic. Application stopped');
  		return;
	}

	console.log(window.synaptic);
})(
	window.neuralify = window.neuralify || {},
	window.synapcit = window.synaptic || {}
);