var sboModule = sboModule || {};

sboModule.drawService = (function () {

    return {
        draw: function (domList, videoUrl, index) {
            let element = domList.get(index);

            let dldBtnIcon = $('<i>').attr('class', 'fa fa-download');
            let dldBtn = $('<a>').attr('title', 'Click to Download').attr('style', 'cursor: pointer; margin-left: 7px;').append(dldBtnIcon);
            let title = $(element).attr('title') || $(element).text();

            dldBtn.click(function () {
                let http = new XMLHttpRequest();
                http.open('HEAD', videoUrl);
                http.onreadystatechange = function () {
                    if (this.readyState === this.DONE) {
                        let finalUrl = this.responseURL.slice(0, -1 * '/clipTo/60000/name/a.mp4'.length);
                        chrome.runtime.sendMessage({
                            videoUrl: finalUrl,
                            index: index,
                            title: title
                        }, function (response) {
                        });
                    }
                };
                http.send();
            });
            dldBtn.insertAfter($(element));
        }
    }
}());