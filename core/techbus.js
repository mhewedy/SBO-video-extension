function startTechbus() {
    setTimeout(function() {
        start({
            drawFunction: draw,
            domList: $('a[data-clip-ref]')
        });

    }, 5000);
}
