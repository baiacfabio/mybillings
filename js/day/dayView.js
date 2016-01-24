define(['app', 'js/billingsModel', 'hbs!js/day/day'], function(app, Billings, viewTemplate) {
	var $ = Dom7;

	function render(params) {
		console.log("render");
		$('.js-observations-container').html(viewTemplate({ model: params.model.observation }));
		$('.js-notes-container').html(viewTemplate({ model: params.model.notes }));
		$('.js-chart-container').html(viewTemplate({ model: params.model.chart }));
		bindEvents(params.bindings);
	}

	function reRender(params) {
		$('.js-observations-container').html(viewTemplate({ model: params.model.observation }));
		$('.js-notes-container').html(viewTemplate({ model: params.model.notes }));
		$('.js-chart-container').html(viewTemplate({ model: params.model.chart }));
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