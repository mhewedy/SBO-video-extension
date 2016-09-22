function start(drawParams, html) {
    if (html) {
        html = '<div>' + html + '</div>';
    } else {
        html = window.document;
    }

    var jsSrc = $('#metadata_flashactive > div > div.sdwBoxContent > div.brightcove_video > script', html).attr('src');
    if (!jsSrc) {
        console.error("js source is undefined!, exiting...");
        return;
    }

    var a = jsSrc.match(/\d+/g);
    var apiParams = {
        wid: a[0],
        uiconfId: a[2],
        refList: []
    };

    $('a[data-clip-ref]', html).each(function() {
        apiParams.refList.push($(this).attr('data-clip-ref'));
    });

    _getVedioForRefList(apiParams, drawParams);
}

function _getVedioForRefList(apiParams, drawParams) {
    apiParams.refList.forEach(function(e, i) {
        _getVedioForRefId(apiParams, drawParams, e, i);
    });
}

function _getVedioForRefId(apiParams, drawParams, referenceId, index) {
    var url = 'http://cdnapi.kaltura.com/html5/html5lib/v2.35/mwEmbedFrame.php?&wid=_' + apiParams.wid +
        '&uiconf_id=' + apiParams.uiconfId + '&flashvars[referenceId]=' + referenceId + '&callback=o';

    $.get(url).always(function(o) {
        var frm = o.responseText.indexOf('downloadUrl') + 'downloadUrl'.length + 5;
        var to = o.responseText.indexOf('",', frm);
        var url = o.responseText.substring(frm, to).split('\\').join('');

        drawParams.drawFunction(drawParams.domList, url, index);
    });
}
