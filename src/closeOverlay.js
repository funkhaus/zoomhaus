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

    $('#zoomhaus-overlay .image-slot > *:last-child').css(css)

    setTimeout(function(){
        $('#zoomhaus-overlay .image-slot').empty();
        $('#zoomhaus-overlay').hide()
        $('#zoomhaus-overlay .image-slot').empty()
        $('.zoomhaus-target.active').removeClass('active')
        $('body').removeClass('zoomhaus-transitioning')

    }, 600);
    $('#zoomhaus-overlay .image-slot > *:last-child').removeClass('zoomhaus-center');

}
