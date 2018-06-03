var sboModule = sboModule || {};

(function () {
    let startNew = function () {

        let techbusBaseUrl = 'https://techbus.safaribooksonline.com/';
        let courseId = window.location.pathname.match('/([0-9]+)/?')[1];

        $.get(techbusBaseUrl + courseId).always(function (html) {
            sboModule.crawlerService.crawl($('.TableOfContents-TOCPart-Rl-Yx > ol > li'), html);
        });
    };

    let startTechbus = function () {
        setTimeout(function () {
            sboModule.crawlerService.crawl($('a[data-clip-ref]'));
        }, 5000);
    };

    if (window.location.hostname.indexOf('www.safaribooksonline.com') >= 0) {
        startNew();
    } else {
        startTechbus();
    }
})();
