var sboModule = sboModule || {};

sboModule.crawlerService = function () {

    let getVideoForRefList = function (apiParams, domList) {
        apiParams.refList.forEach(function (e, i) {
            getVideoForRefId(apiParams, domList, e, i);
        });
    };

    let getVideoForRefId = function (apiParams, domList, referenceId, index) {
        let url = 'https://cdnapisec.kaltura.com/html5/html5lib/v2.35/mwEmbedFrame.php?&wid=_' + apiParams.wid +
            '&uiconf_id=' + apiParams.uiconfId + '&flashvars[referenceId]=' + referenceId + '&callback=o';

        $.get(url).always(function (o) {
            let frm = o.responseText.indexOf('downloadUrl') + 'downloadUrl'.length + 5;
            let to = o.responseText.indexOf('",', frm);
            let url = o.responseText.substring(frm, to).split('\\').join('');

            sboModule.drawService.draw(domList, url, index, extractFlavors(o.responseText));
        });
    };

    let extractFlavors = function (responseText) {
        let frm = responseText.indexOf('flavorAssets') + 'flavorAssets'.length + 3;
        let to = responseText.indexOf('}],\\"', frm) + 2;
        let flavorAssets = JSON.parse(responseText.substring(frm, to).split('\\').join(''));

        return flavorAssets.map(it => ({
            id: it.flavorParamsId,
            isAudio: it.width === 0 && it.height === 0,
            width: it.width,
            height: it.height,
            bitrate: it.bitrate
        })).sort((a, b) => (a.width * a.height * a.bitrate) >
            (b.width * b.height * b.bitrate));
    };

    return {
        crawl: function (domList, html) {

            let isNew = !!html;
            html = isNew ? '<div>' + html + '</div>' : window.document;

            let jsSrc = $('#metadata_flashactive > div > div.sdwBoxContent > div.brightcove_video > script', html).attr('src');
            if (!jsSrc) {
                console.error('SBO Downloader is unable to download the course, it is out of control issue.');
                return;
            }

            let a = jsSrc.match(/\d+/g);
            let apiParams = {
                wid: a[0],
                uiconfId: a[2],
                refList: []
            };

            domList.each(function () {
                let attr = isNew ?
                    $(this).attr('href').match(/^.*\/([0-9]*\/.*).html$/)[1] :
                    $(this).attr('data-clip-xmlid');
                apiParams.refList.push(attr.replace('/', '-'));
            });

            getVideoForRefList(apiParams, domList);
        }
    }
}();