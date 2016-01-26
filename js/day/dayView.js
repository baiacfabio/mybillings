define([
	'hbs!js/day/dayObservations', 
	'hbs!js/day/dayChart'], function(dayObservationsTemplate, dayChartTemplate) {
	var $ = Dom7;

	function render(params) {	
		$('.js-observations-container').html(dayObservationsTemplate(params.model));		
		bindEvents(params.bindings);
	}

	function reRender(params) {
		//console.log(params);
		//console.log(dayObservationsTemplate(params.model));
		$('.js-observations-container').html(dayObservationsTemplate(params.model));		
		$('.js-chart-container').html(dayChartTemplate(params.model));
	}

	function bindEvents(bindings) {
		for (var i in bindings) {
			$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
		}
	}

	return {
		render: render,
		reRender: reRender
	}
});