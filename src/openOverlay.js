import { setDefault, q, qa, createAndAppend } from './utils'

export default ( target, settings, winDimensions ) => {

    // User has clicked on "target", an element that they expect to zoom in and take over the screen.
    // We're going to clone the target, place it directly above the original, and animate that clone to the center of the screen
    // while expanding its width/height to the maximum allowed sizes.

    // abort if there is already an instance open or if we're animating
    if ( document.body.classList.contains('zoomhaus-open')
        || document.body.classList.contains('zoomhaus-transitioning') )
        return

    // add active class to target
    target.classList.add('active')

    // get rectangle for image as it sits in the page
    var targetRect = target.getBoundingClientRect()

    // build styling
    let css = {
        '-webkit-transform': `-webkit-translate(${targetRect.left}px, ${targetRect.top}px)`,
        transform: `translate(${targetRect.left}px, ${targetRect.top}px)`,
        position: 'absolute',
        width: `${targetRect.width}px`,
        height: 'auto',
    }

    // determine if we need any clipping
    if( settings.grow ){
        // Calculate the height difference between the target and parent container
        var parentHeight = target.parentNode.getBoundingClientRect().height;
        var diff = target.getBoundingClientRect().height - parentHeight;
        css['-webkit-clip-path'] = '-webkit-inset(' + (diff / 2) + 'px 0)';
        css['clip-path'] = 'inset(' + (diff / 2) + 'px 0)';
    }

    // clone target image and remove unnecessary classes
    const newImg = target.cloneNode()
    newImg.classList.remove('active')
    newImg.classList.remove('zoomhaus-target')

    // apply styling
    for( let prop in css ){
        newImg.style[prop] = css[prop]
    }

    // add image to overlay
    q('#zoomhaus-overlay').style.display = 'block'
    q('#zoomhaus-overlay').classList.add('displayed')
    q('#zoomhaus-overlay .image-slot').appendChild(newImg)

    // calculate natural aspect ratio for image
    // aspect ratio > 1: image is portrait
    // aspect ratio < 1: image is landscape
    const height = target.getAttribute('height') || target.getBoundingClientRect().height
    const width = target.getAttribute('width') || target.getBoundingClientRect().width
    const naturalRatio = height / width

    // get optimal dimensions
    let targetHeight = Math.min( (window.innerHeight - settings.marginY * 2), height )
    let targetWidth = Math.min( (window.innerWidth - settings.marginX * 2), width )

    // if fitting to width makes the clone too tall...
    if ( targetWidth * naturalRatio > targetHeight ){
        // fit to height
        targetWidth = targetHeight / naturalRatio
    } else {
        // fit to width
        targetHeight = targetWidth * naturalRatio
    }

    // calculate transform properties
    // const scale = targetWidth / width
    // const antiScale = width / targetWidth

    // add body classes
    document.body.classList.add('zoomhaus-open')
    // wait a few ms to add image classes so that animation applies
    setTimeout(() => {
        newImg.style.width = `${ targetWidth }px`
        newImg.classList.add('zoomhaus-center')
        newImg.classList.add('zoomhaus-image')
    }, 25)


}
