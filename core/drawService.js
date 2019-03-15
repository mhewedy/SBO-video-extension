var sboModule = sboModule || {};

sboModule.drawService = (function () {

    let getTitle = function (flavor) {
        return (flavor.isAudio ? 'Audio file' : 'Video file') + ' with width: ' + flavor.width +
            ', and height: ' + flavor.height + ' and bitrate: ' + flavor.bitrate;
    };

    let downloadHandler = function (flavor, videoUrl, index, title) {
        let http = new XMLHttpRequest();
        http.open('HEAD', videoUrl.replace(/^(.*)\/.*$/, '$1/' + flavor.id));
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
    };

    return {
        draw: function (domList, videoUrl, index, flavors) {

            let element = domList.get(index);

            let dldBtnIcon = $('<i>').attr('class', 'fa fa-download');
            let dldBtn = $('<a>').attr('title', '').attr('style', 'cursor: pointer; margin-left: 7px;').append(dldBtnIcon);
            let title = $(element).attr('title') || $(element).text();
            dldBtn.insertAfter($('.orm-PlaylistsDropdown-playlistsDropdown', $(element)));

            var dialogStyle = 'padding: 6px 14px 5px 12px;' + 
            'margin-left: -240px;' + 
            'box-shadow: rgba(0, 0, 0, 0.2) 2px 2px 2px 2px;' + 
            'background-color: rgb(255, 255, 255);' + 
            'z-index: 99;' + 
            'top: 0px;' + 
            'left: 0px;' + 
            'display: none;';

            let dialog = $('<div>').attr('style', dialogStyle + ';display: none;');

            $(document).click(function (e) {
                if (e.target === dldBtn[0] || e.target === dldBtnIcon[0]) {
                    dialog.attr('style', dialogStyle + ';display: inline;')
                } else {
                    dialog.attr('style', dialogStyle + ';display: none;');
                }
            });

            dialog.insertAfter($(dldBtn));

            let size = 12;
            flavors.forEach(f => {
                let dldBtnIcon = $('<i>').attr('class', f.isAudio ? 'fa fa-headphones' : 'fa fa-video-camera').attr('style', 'font-size: ' + size + 'px;');
                let dldBtn = $('<a>').attr('title', getTitle(f)).attr('style', 'cursor: pointer; margin: 2px 12px 12px 2px;').append(dldBtnIcon);
                dialog.append(dldBtn);
                size += 1;

                dldBtn.click(function () {
                    downloadHandler(f, videoUrl, index, title);
                });
            });
        }
    }
}());