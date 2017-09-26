import { setDefault, q, qa, createAndAppend } from './utils'

export default ( target, settings, winDimensions ) => {

    // add active class to target
    target.classList.add('active')

    // get rectangle for image as it sits in the page
    var imgRect = target.getBoundingClientRect()
    let clipPath = false

    // determine if we need any clipping
    if( settings.grow ){

        // Calculate the aspect ratio of the parent
        var parentHeight = target.parentNode.getBoundingClientRect().height;
        var diff = target.getBoundingClientRect().height - parentHeight;
        clipPath = 'inset(' + (diff / 2) + 'px 0)';

    }

    // clone target image, position it
    const newImg = target.cloneNode()
    newImg.classList.remove('active')
    newImg.classList.remove('zoomhaus-target')
    newImg.style.transform = `translate(${imgRect.left}px, ${imgRect.top}px)`
    newImg.style.position = 'absolute'
    newImg.style.width = `${imgRect.width}px`
    newImg.style.height = 'auto'
    if( clipPath ){
        newImg.style.clipPath = clipPath
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
    // const scale = targetWidth / width;
    // const antiScale = width / targetWidth;

    // add body classes
    document.body.classList.add('zoomhaus-open')
    setTimeout(() => {
        newImg.classList.add('zoomhaus-center')
        newImg.classList.add('zoomhaus-image')
        newImg.style.width = `${ targetWidth }px`
    }, 10)


}
