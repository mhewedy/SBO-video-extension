function startNew() {

    var techbusBaseUrl = 'https://techbus.safaribooksonline.com/';
    var pathArr = window.location.pathname.split('/');
    var courseId = pathArr[pathArr.length - 2];

    var tocId = $('#toc').length > 0 ? '#toc' : '#container'
	
    var flatTocSelector = tocId + ' ol > li > a'
    var tocSelector = tocId + ' ol > li > ol > li > a'

	var isFlatToC = $(tocSelector).length == 0
	var domList = isFlatToC ? $(flatTocSelector) : $(tocSelector);

    $.get(techbusBaseUrl + courseId).always(function(html) {
        start({
            drawFunction: draw,
            domList: domList
        }, html);
    });
}
