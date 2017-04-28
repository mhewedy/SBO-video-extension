function draw(domList, vedioUrl, index) {
    var element = domList.get(index);
    var dldBtnImg = $('<img>').attr('src', chrome.extension.getURL('icon/48.png')).attr('style', 'width: 16px; vertical-align: middle;');
    var dldBtn = $('<a>').attr('title', 'Click to Download').attr('style', 'cursor: pointer; margin-left: 7px;').append(dldBtnImg);

    var title = $(element).attr('title') || $(element).text();
    
    dldBtn.click(function() {
        var http = new XMLHttpRequest();
        http.open('HEAD', vedioUrl);
        http.onreadystatechange = function() {
            if (this.readyState === this.DONE) {
                var finalUrl = this.responseURL.slice(0, -1 * '/clipTo/60000/name/a.mp4'.length);
                chrome.runtime.sendMessage({
                    vedioUrl: finalUrl,
                    index: index,
                    title: title
                }, function(response) {});
            }
        };
        http.send();
    });
    dldBtn.insertAfter($(element));
}
