function draw(domList, vedioUrl, index) {
    var element = domList.get(index);
    var dldBtnImg = $('<img>').attr('src', chrome.extension.getURL('icon/48.png')).attr('style', 'width: 16px; vertical-align: middle;');
    var dldBtn = $('<a>').attr('title', 'Click to Download').attr('style', 'cursor: pointer; margin-left: 7px;').append(dldBtnImg);
    dldBtn.click(function() {
        chrome.runtime.sendMessage({
            vedioUrl: vedioUrl,
            index: index,
            title: $(element).attr('title')
        }, function(response) {});
    });
    dldBtn.insertAfter($(element));
}
