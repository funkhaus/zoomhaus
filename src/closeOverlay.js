export default ( $, settings ) => {

    // remove body class
    $('body').removeClass('zoomhaus-open').addClass('zoomhaus-transitioning')

    // get rectangle for image as it sits in the page
    const imgRect = $('.zoomhaus-target.active').get(0).getBoundingClientRect()
    const $target = $('.zoomhaus-target.active')

    let css = {
        'left': imgRect.left,
        'top': imgRect.top,
        'width': imgRect.width,
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

    let updatingRect = true

    // update ending position to prevent ugly snapping on scroll
    const updateRect = function(){
        // get rectangle for active image
        const $active = $('.zoomhaus-target.active')

        if( $active && $active.length ){
            const rect = $active.get(0).getBoundingClientRect()

            // set top property on overlay image
            $('#zoomhaus-overlay img').eq(0).css({
                top: rect.top
            })
        }

        if( updatingRect ){
            requestAnimationFrame(updateRect)
        }
    }
    requestAnimationFrame(updateRect)

    // remove transform styles, fire callback
    $('#zoomhaus-overlay img').css(css)
    .one($.support.transition.end, function(){

        $('#zoomhaus-overlay').hide().empty()
        $('.zoomhaus-target.active').removeClass('active')
        $('body').removeClass('zoomhaus-transitioning')

        updatingRect = false

    })
    .emulateTransitionEnd(600);

}
