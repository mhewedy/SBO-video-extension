(function() {

    $('a[data-clip-ref]').each(function() {
        var referenceId = $(this).attr('data-clip-ref');
        drawDownloadButton(referenceId);
    });

})();

function drawDownloadButton(referenceId) {
    console.log('referenceId: ' + referenceId);

    // 1. define the 3 variables to be used in the url to get entryId
    var wid, uiconfId;

    // 2. use jquery to find 3 variables
    var jsSrc = $('#metadata_flashactive > div > div.sdwBoxContent > div.brightcove_video > script').attr('src');
    console.log('jsSrc: ' + jsSrc);
    var a = jsSrc.match(/\d+/g);
    wid = a[0];
    uiconfId = a[2];

    // 3. compose the url to get entryId
    var url = 'http://cdnapi.kaltura.com/html5/html5lib/v2.35/mwEmbedFrame.php?&wid=_' + wid +
        '&uiconf_id=' + uiconfId + '&flashvars[referenceId]=' + referenceId + '&callback=o';
    console.log('url: ' + url);

    // 4. call the url to get json object and parse it to get downloadUrl

    $.get(url)
        .done(function(o) {
            handle(o, referenceId);
        })
        .fail(function(o) {
            handle(o, referenceId);
        });
}

function handle(o, referenceId) {
    var from = o.responseText.indexOf('downloadUrl') + 'downloadUrl'.length + 5;
    var to = o.responseText.indexOf('",', from);
    var url = o.responseText.substring(from, to).split('\\').join('');
    console.log('download url: ' + url);

    var element = $('a[data-clip-ref="' + referenceId + '"]')[0];
    var dlBtnStr = '<a download="' + element.title + '" href="' + url + '" title="Download ' + element.title + '">' +
        '<img src="' + chrome.extension.getURL('icon/48.png') + '" style="width: 16px; vertical-align: middle;"/>' +
        '</a>';
    setTimeout(function() {
        $('a[data-clip-ref="' + referenceId + '"]').parent().append(dlBtnStr);
    }, 5000);
}
