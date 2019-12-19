var sboModule = sboModule || {};

(function () {
    let startNew = function () {

        let techbusBaseUrl = 'https://techbus.safaribooksonline.com/';
        let courseId = window.location.pathname.split('/')[3];

        $.get(techbusBaseUrl + courseId).always(function (html) {
            sboModule.crawlerService.crawl($('.tab-group-content ol > li').children('div.content-ContentSummary').parent(), html);
        });
    };

    let startTechbus = function () {
        setTimeout(function () {
            sboModule.crawlerService.crawl($('a[data-clip-ref]'));
        }, 5000);
    };

    if (window.location.hostname.indexOf('learning.oreilly.com') >= 0) {
        startNew();
    } else {
        startTechbus();
    }
})();
