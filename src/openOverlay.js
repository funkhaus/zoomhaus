import { setDefault, q, qa, createAndAppend } from './utils'

export default ( target, settings, winDimensions ) => {

    // add active class to target
    target.classList.add('active')

    // get rectangle for image as it sits in the page
    var imgRect = target.getBoundingClientRect()

    // build styling
    let css = {
        '-webkit-transform': `-webkit-translate(${imgRect.left}px, ${imgRect.top}px)`,
        transform: `translate(${imgRect.left}px, ${imgRect.top}px)`,
        position: 'absolute',
        width: `${imgRect.width}px`,
        height: 'auto',
    }

    // determine if we need any clipping
    if( settings.grow ){
        // Calculate the height difference between this and parent container
        var parentHeight = target.parentNode.getBoundingClientRect().height;
        var diff = target.getBoundingClientRect().height - parentHeight;
        css['-webkit-clip-path'] = '-webkit-inset(' + (diff / 2) + 'px 0)';
        css['clip-path'] = 'inset(' + (diff / 2) + 'px 0)';
    }

    // clone target image, position it
    const newImg = target.cloneNode()
    newImg.classList.remove('active')
    newImg.classList.remove('zoomhaus-target')

    for( let [key, value] of Object.entries(css) ){
        newImg.style[key] = value
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

    // get target dimensions
    let targetHeight = Math.min( (window.innerHeight - settings.marginY * 2), height )
    let targetWidth = Math.min( (window.innerWidth - settings.marginX * 2), width )

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
    const scale = targetWidth / width;
    const antiScale = width / targetWidth;

    // add body classes
    document.body.classList.add('zoomhaus-open')
    // wait a few ms to add image classes so that animation applies
    setTimeout(() => {
        console.log(targetWidth)
        newImg.style.width = `${ targetWidth }px`
        newImg.classList.add('zoomhaus-center')
        newImg.classList.add('zoomhaus-image')
    }, 25)


}
