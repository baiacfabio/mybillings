require.config({
    paths: {
        handlebars: "lib/handlebars",
        text: "lib/text",
        hbs: "lib/hbs"
    },
    shim: {
        handlebars: {
            exports: "Handlebars"
        }
    }
});

define('app', ['js/router', 'js/utils'], function(Router, Utils) {

	Router.init();
    var today = new Date();
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

    // Render calendar
    // var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    //     dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
     
    // var calendarInline = f7.calendar({
    //     container: '#calendar-inline-container',
    //     value: [new Date()],
    //     toolbar: true,
    //     weekHeader: true,
    //     dateFormat: 'dd M yyyy',
    //     dayNamesShort: dayNames,
    //     monthNames: monthNames,
    //     monthPicker: false,
    //     yearPicker: false
    // });

    // Inline date-time
    var pickerInline = f7.picker({
        input: '#mb-picker-date',
        container: '#mb-picker-date-container',
        toolbar: false,
        rotateEffect: true,
        value: [today.getMonth(), today.getDate(), today.getFullYear(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
        onChange: function (picker, values, displayValues) {
            var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
            if (values[1] > daysInMonth) {
                picker.cols[1].setValue(daysInMonth);
            }
        },
        formatValue: function (p, values, displayValues) {
            return displayValues[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
        },
        cols: [
            // Months
            {
                values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                displayValues: ('January February March April May June July August September October November December').split(' '),
                textAlign: 'left'
            },
            // Days
            {
                values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            },
            // Years
            {
                values: (function () {
                    var arr = [];
                    for (var i = 1950; i <= 2030; i++) { arr.push(i); }
                    return arr;
                })(),
            },
            // Space divider
            {
                divider: true,
                content: '&nbsp;&nbsp;'
            },
            // Hours
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 23; i++) { arr.push(i); }
                    return arr;
                })(),
            },
            // Divider
            {
                divider: true,
                content: ':'
            },
            // Minutes
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                    return arr;
                })(),
            }
        ]
    });

	return {
		f7: f7,
		mainView: mainView,
		router: Router,
		utils: Utils
	};
});
