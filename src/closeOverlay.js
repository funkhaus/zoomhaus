export default ( $, settings ) => {

    // remove body class
    $('body').removeClass('zoomhaus-open').addClass('zoomhaus-transitioning')

    // get rectangle for image as it sits in the page
    var imgRect = $('.zoomhaus-target.active').get(0).getBoundingClientRect()

    let css = {
        'left': imgRect.left,
        'top': imgRect.top,
        '-webkit-transform': 'none',
        'transform': 'none'
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

    // remove transform styles, fire callback
    $('#zoomhaus-overlay img').css(css)
    .one($.support.transition.end, function(){

        $('#zoomhaus-overlay').hide().empty()
        $('.zoomhaus-target.active').removeClass('active')
        $('body').removeClass('zoomhaus-transitioning')

    })
    .emulateTransitionEnd(600);

}
