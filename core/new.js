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

function draw(domList, vedioUrl, index) {
    var element = domList.get(index);
    var dldBtnImg = $('<img>').attr('src', chrome.extension.getURL('icon/48.png')).attr('style', 'width: 16px; vertical-align: middle;');
    var dldBtn = $('<a>').attr('href', vedioUrl).attr('title', 'click to download').append(dldBtnImg).attr('style', 'margin-left: 7px;');
    dldBtn.insertAfter($(element));
}
