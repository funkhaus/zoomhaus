let scrollOffset = 0,
    target = false,
    lastScrollY = 0

function matchScroll(evt){
    const latestScrollY = window.pageYOffset || document.body.scrollTop
    const overlay = document.getElementById('zoomhaus-overlay')
    scrollOffset += lastScrollY - latestScrollY
    lastScrollY = latestScrollY
    overlay.style.top = scrollOffset + 'px'
}

export default ( $, settings ) => {

    // remove body class
    $('body').removeClass('zoomhaus-open')

    // get rectangle for image as it sits in the page
    const imgRect = $('.zoomhaus-target.active').get(0).getBoundingClientRect()
    const $target = $('.zoomhaus-target.active')

    let css = {
        'width': imgRect.width,
        'webkit-transform': `translate(${imgRect.left}px, ${imgRect.top}px)`,
        transform: `translate(${imgRect.left}px, ${imgRect.top}px)`
    }

    // shrink clip-path area to match aspect ratio of parent
    if( settings.grow ){

        const $target = $('.zoomhaus-target.active')

        // Calculate the aspect ratio of the parent
        var parentHeight = $target.parent().innerHeight()
        var diff = $target.innerHeight() - parentHeight

        css['-webkit-clip-path'] = 'inset(' + (diff / 2) + 'px 0)'
        css['clip-path'] = 'inset(' + (diff / 2) + 'px 0)'

    }

    $('#zoomhaus-overlay img').css(css)

    // start matching scroll
    scrollOffset = 0
    lastScrollY = window.pageYOffset || document.body.scrollTop
    document.getElementById('zoomhaus-overlay').style.top = `${ scrollOffset }px`
    window.addEventListener('scroll', matchScroll)

    setTimeout(function(){
        $('#zoomhaus-overlay .image-slot').empty();
        $('#zoomhaus-overlay').hide()
        $('#zoomhaus-overlay .image-slot').empty()
        $('.zoomhaus-target.active').removeClass('active')
        $('body').removeClass('zoomhaus-transitioning')
        window.removeEventListener('scroll', matchScroll)
        document.getElementById('zoomhaus-overlay').style.top = 0

    }, 600);
    $('#zoomhaus-overlay img').removeClass('zoomhaus-center');

}
