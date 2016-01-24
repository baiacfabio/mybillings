define([
	'hbs!js/day/dayObservations', 
	'hbs!js/day/dayChart', 
	'hbs!js/day/dayNotes'], function(dayObservationsTemplate, dayChartTemplate, dayNotesTemplate) {
	var $ = Dom7;

	function render(params) {		
		$('.js-observations-container').html(dayObservationsTemplate(params.model));
		$('.js-notes-container').html(dayNotesTemplate(params.model));
		$('.js-chart-container').html(dayChartTemplate(params.model));
		bindEvents(params.bindings);
	}

	function reRender(params) {
		$('.js-observations-container').html(dayObservationsTemplate({ model: params.model }));
		$('.js-notes-container').html(dayNotesTemplate({ model: params.model }));
		$('.js-chart-container').html(dayNotesTemplate({ model: params.model }));
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