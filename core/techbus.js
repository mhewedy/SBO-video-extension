function startTechbus() {
    setTimeout(function() {
        start({
            drawFunction: draw,
            domList: $('a[data-clip-ref]')
        });

    }, 5000);
}

function draw(domList, vedioUrl, index) {
    var element = domList.get(index);
    var dldBtnImg = $('<img>').attr('src', chrome.extension.getURL('icon/48.png')).attr('style', 'width: 16px; vertical-align: middle;');
    var dldBtn = $('<a>').attr('href', vedioUrl).attr('title', 'click to download').append(dldBtnImg);
    $(element).parent().append(dldBtn);
}
