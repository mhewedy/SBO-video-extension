(function() {
    if (window.location.hostname.indexOf('techbus') >= 0) {
        startTechbus();
    } else {
        startNew();
    }
})();
