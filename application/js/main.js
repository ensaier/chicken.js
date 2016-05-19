;(function(neuralify, synaptic) {
	'use strict';

	var entity = neuralify
	var samples = [];
	var selector = document.getElementById('samples');
	if (Object.keys(synaptic).length < 1) {
  		console.warn('Please check your synaptic. Application stopped');
  		return;
	}

	samples.push({
		result: new Note('A1').buildHarmony('melodic', 'minor').harmonyToString(),
		title: 'Melodic minor'
	});

	samples.push({
		result: new Note('A1').buildHarmony('harmonic', 'major').harmonyToString(),
		title: 'Harmonic major'
	});

	samples.push({
		result: new Note('A1').buildHarmony('harmonic', 'minor').harmonyToString(),
		title: 'Harmonic minor'
	});

	samples.forEach(function(sample){
		var title = document.createElement('h3');
		var line = document.createElement('p');
		title.innerHTML = sample.title;
		line.innerHTML = sample.result;

		selector.appendChild(title);
		selector.appendChild(line);
	})


})(
	window.neuralify = window.neuralify || {},
	window.synapcit = window.synaptic || {}
);