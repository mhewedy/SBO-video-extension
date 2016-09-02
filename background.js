chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	sendResponse({farewell:message.urls});
  
	message.urls.forEach(function(url, i){
		chrome.downloads.download({url: url, filename: i + '.mp4', saveAs: false});
	});
});
