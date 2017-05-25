export default ( target, $, winDimensions ) => {

    const $target = $(target)

    // add active class to target
    $target.addClass('active')

    // get rectangle for image as it sits in the page
    var imgRect = $target.get(0).getBoundingClientRect()

    let css = {
        transform: 'none',
        position: 'absolute',
        width: imgRect.width,
        left: imgRect.left,
        top: imgRect.top,
        height: 'auto',
    }

    // clone target image, position it
    const $newImg = $(target).clone()
        .css( css )
        .removeClass('active zoomhaus-target')

    // add image into overlay
    $('#zoomhaus-overlay').show().html( $newImg.addClass('zoomhaus-image') )

    // calculate natural aspect ratio for image
    // aspect ratio > 1: image is portrait
    // aspect ratio < 1: image is landscape
    var naturalRatio = Math.max( $(this).attr('height'), $(this).height() ) / Math.max( $(this).attr('width'), $(this).width() )

    // get target dimensions
    var targetWidth = Math.min( (winDimensions.width - 100), $target.attr('width') )
    var targetHeight = Math.min( (winDimensions.height - 100), $target.attr('height') )

    // if fitting to width is too tall...
    if ( targetWidth * naturalRatio > targetHeight ){
        // fit to height
        targetWidth = targetHeight / naturalRatio;
    // fitting to width was NOT too small...
    } else {
        // fit to width
        targetHeight = targetWidth * naturalRatio;
    }

    // calculate transform properties
    var scale = targetWidth / imgRect.width;
    var antiScale = imgRect.width / targetWidth;

    // wait for animation frame so the browser can handle transitions
    window.requestAnimationFrame(function(){

        // add body classes
        $('body').addClass('zoomhaus-open zoomhaus-transitioning')

        // when transition complete...
        $newImg.one($.support.transition.end, function(){

            // remove transition class
            $('body').removeClass('zoomhaus-transitioning')

        })
        .emulateTransitionEnd(600)

        // add transform styling
        $newImg.css({
            '-webkit-clip-path': 'inset(0)',
            'clip-path': 'inset(0)',
            'top': '50%',
            'left': '50%',
            'transform': 'scale(' + scale + ') translate(-50%, -50%)'
        })

    })

}
