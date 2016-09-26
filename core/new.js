function startNew() {

    var techbusBaseUrl = 'https://techbus.safaribooksonline.com/';
    var pathArr = window.location.pathname.split('/');
    var courseId = pathArr[pathArr.length - 2];

    $.get(techbusBaseUrl + courseId).always(function(html) {
        start({
            drawFunction: draw,
            domList: $('#container  ol > li > ol > li > a')
        }, html);
    });
}
