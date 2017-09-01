export default ( target, settings, $, winDimensions, cache ) => {

    const $target = $(target)

    // add active class to target
    $target.addClass('active')

    // get rectangle for image as it sits in the page
    var imgRect = $target.get(0).getBoundingClientRect()

    let css = {
        'webkit-transform': `translate(${imgRect.left}px, ${imgRect.top}px)`,
        transform: `translate(${imgRect.left}px, ${imgRect.top}px)`,
        position: 'absolute',
        width: imgRect.width,
        height: 'auto'
    }

    // determine if we need any clipping
    if( settings.grow ){

        // Calculate the aspect ratio of the parent
        var parentHeight = $target.parent().innerHeight();
        var diff = $target.innerHeight() - parentHeight;
        css['-webkit-clip-path'] = 'inset(' + (diff / 2) + 'px 0)';
        css['clip-path'] = 'inset(' + (diff / 2) + 'px 0)';

    }

    // clone target image, position it
    const $newImg = $(target).clone()
        .css( css )
        .removeClass('active zoomhaus-target')

    if( $newImg.is('video') ){
        // const cachedBlob = cache[$target.data('zoomhaus-cache-id')]
        // console.log(cachedBlob)
        // const srcUrl = window.URL.createObjectURL(cachedBlob)
        $newImg.attr('src', $(target).find('source').attr('src'));//cache[$target.data('zoomhaus-cache-id')])
    }

    const currentTime = $(target).get(0).currentTime
    if( currentTime !== undefined ){
        $newImg.get(0).currentTime = currentTime
    }



    // add image into overlay
    $('#zoomhaus-overlay').show()
    $('#zoomhaus-overlay .image-slot').html( $newImg.addClass('zoomhaus-image') )

    // calculate natural aspect ratio for image
    // aspect ratio > 1: image is portrait
    // aspect ratio < 1: image is landscape
    var naturalRatio = Math.max( $(target).attr('height'), $(target).height() ) / Math.max( $(target).attr('width'), $(target).width() )

    // get target dimensions
    var targetWidth = Math.min( (winDimensions.width - settings.marginX * 2), $target.attr('width') )
    var targetHeight = Math.min( (winDimensions.height - settings.marginY * 2), $target.attr('height') )

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

    // add body classes
    $('body').addClass('zoomhaus-open')
    $newImg.addClass('zoomhaus-center').css({
        width: targetWidth
    })

}
