const sboModule = sboModule || {};

sboModule.crawlerService = (function () {

    let getVideoForRefList = function (apiParams, drawParams) {
        apiParams.refList.forEach(function (e, i) {
            getVideoForRefId(apiParams, drawParams, e, i);
        });
    };

    let getVideoForRefId = function (apiParams, drawParams, referenceId, index) {
        let url = 'https://cdnapisec.kaltura.com/html5/html5lib/v2.35/mwEmbedFrame.php?&wid=_' + apiParams.wid +
            '&uiconf_id=' + apiParams.uiconfId + '&flashvars[referenceId]=' + referenceId + '&callback=o';

        $.get(url).always(function (o) {
            let frm = o.responseText.indexOf('downloadUrl') + 'downloadUrl'.length + 5;
            let to = o.responseText.indexOf('",', frm);
            let url = o.responseText.substring(frm, to).split('\\').join('');

            drawParams.drawFunction(drawParams.domList, url, index);
        });
    };

    return {
        crawl: function (drawParams, html) {
            if (html) {
                html = '<div>' + html + '</div>';
            } else {
                html = window.document;
            }

            let jsSrc = $('#metadata_flashactive > div > div.sdwBoxContent > div.brightcove_video > script', html).attr('src');
            if (!jsSrc) {
                console.error('SBO Downloader is unable to download the course, it is out of control issue.');
                console.error("js source is undefined!, exiting...");
                return;
            }

            let a = jsSrc.match(/\d+/g);
            let apiParams = {
                wid: a[0],
                uiconfId: a[2],
                refList: []
            };

            $('a[data-clip-ref]', html).each(function () {
                apiParams.refList.push($(this).attr('data-clip-ref'));
            });

            getVideoForRefList(apiParams, drawParams);
        }
    }
}());