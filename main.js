var sboModule = sboModule || {};

(function () {
    let startNew = function () {

        let techbusBaseUrl = 'https://techbus.safaribooksonline.com/';
        let pathArr = window.location.pathname.split('/');
        let courseId = pathArr[pathArr.length - 2];

        // TODO
        // The dom list is a changing part, alwasy safaribooksonline keeps changing it
        // we need to implement more dynamic function
        let getDomList = function () {
            const defaultTocId = '#container';
            const altTocId = '#toc';

            let tocId = $(defaultTocId).length > 0 ? defaultTocId : altTocId;

            let flatTocSelector = tocId + ' ol > li > a';
            let tocSelector = tocId + ' ol > li > ol > li > a';

            let isFlatToC = $(tocSelector).length === 0;
            return isFlatToC ? $(flatTocSelector) : $(tocSelector);
        };

        $.get(techbusBaseUrl + courseId).always(function (html) {
            sboModule.crawlerService.crawl(getDomList(), html);
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
