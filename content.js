(function() {

    // 1. define the 2 variables to be used in the url to get entryId
    var wid, uiconfId;

    // 2. use jquery to find the 2 variables
    var jsSrc = $('#metadata_flashactive > div > div.sdwBoxContent > div.brightcove_video > script').attr('src');
    console.log('jsSrc: ' + jsSrc);
    var a = jsSrc.match(/\d+/g);
    wid = a[0];
    uiconfId = a[2];

    // 3. for each referenceId
    $('a[data-clip-ref]').each(function() {
        drawDownloadButton(wid, uiconfId, $(this).attr('data-clip-ref'));
    });

})();

function drawDownloadButton(wid, uiconfId, referenceId) {

    var url = 'http://cdnapi.kaltura.com/html5/html5lib/v2.35/mwEmbedFrame.php?&wid=_' + wid +
        '&uiconf_id=' + uiconfId + '&flashvars[referenceId]=' + referenceId + '&callback=o';
    console.log('url: ' + url);

    $.get(url).always(function(o) {
        handle(o, referenceId);
    });
}

function handle(o, referenceId) {
    var frm = o.responseText.indexOf('downloadUrl') + 'downloadUrl'.length + 5;
    var to = o.responseText.indexOf('",', frm);
    var url = o.responseText.substring(frm, to).split('\\').join('');
    console.log('download url: ' + url);

    var element = $('a[data-clip-ref="' + referenceId + '"]')[0];
    var dlBtnStr = '<a download="' + element.title + '" href="' + url + '" title="Download ' + element.title + '">' +
        '<img src="' + chrome.extension.getURL('icon/48.png') + '" style="width: 16px; vertical-align: middle;"/>' +
        '</a>';
    setTimeout(function() {
        $('a[data-clip-ref="' + referenceId + '"]').parent().append(dlBtnStr);
    }, 5000);
}
