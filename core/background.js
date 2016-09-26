chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    chrome.downloads.download({
        url: message.vedioUrl,
        filename: leftPad(message.index + 1) + ' - ' + message.title.replace(/\W+/g, " ") + '.mp4',
        saveAs: false
    });
});

function leftPad(num) {
    var str = num + "";
    var pad = "000";
    return pad.substring(0, pad.length - str.length) + str;
}
