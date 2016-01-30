require.config({
    paths: {
        handlebarsCore: "lib/handlebars",
        handlebars: "lib/helpers",
        text: "lib/text",
        hbs: "lib/hbs"
    },
    shim: {
        // Handlebars, (precompiled) templates and helpers
        handlebarsCore: {
            exports: 'Handlebars'
        },
        handlebars: {
            deps: ['handlebarsCore'],
            exports: 'Handlebars'
        }
    }
});

define('app', ['js/router', 'js/utils'], function(Router, Utils) {

	Router.init();
        
	var f7 = new Framework7({
		modalTitle: 'MyBillings',
		swipePanel: 'left',
        animateNavBackIcon: true,
        material: true,
        materialPageLoadDelay: 200
	});
    var mainView = f7.addView('.view-main', {
        dynamicNavbar: true
    });

    
    return {
		f7: f7,
		mainView: mainView,
		router: Router,
		utils: Utils,
        pickerDate: window.PickerDate
	};
});
