function startNew() {

    var techbusBaseUrl = 'https://techbus.safaribooksonline.com/';
    var pathArr = window.location.pathname.split('/');
    var courseId = pathArr[pathArr.length - 2];
	
	var isFlatToC = $('#container  ol > li > ol > li > a').length == 0
	var domList = isFlatToC ? $('#container  ol > li > a') : $('#container  ol > li > ol > li > a');

    $.get(techbusBaseUrl + courseId).always(function(html) {
        start({
            drawFunction: draw,
            domList: domList
        }, html);
    });
}
