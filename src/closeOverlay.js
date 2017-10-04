import { setDefault, q, qa, createAndAppend } from './utils'

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

export default ( settings ) => {

    // abort if we're already closed or if we're animating
    if ( ! document.body.classList.contains('zoomhaus-open')
        || document.body.classList.contains('zoomhaus-transitioning') )
        return

    // get rectangle for image as it sits in the page
    const imgRect = q('.zoomhaus-target.active').getBoundingClientRect()
    target = q('.zoomhaus-target.active')

    // start matching scroll
    scrollOffset = 0
    lastScrollY = window.pageYOffset || document.body.scrollTop
    document.getElementById('zoomhaus-overlay').style.top = `${ scrollOffset }px`
    window.addEventListener('scroll', matchScroll)

    // remove body class
    document.body.classList.remove('zoomhaus-open')

    // prep CSS
    let css = {
        'width': `${ imgRect.width }px`,
        '-webkit-transform': `translate(${imgRect.left}px, ${imgRect.top}px)`,
        transform: `translate(${ imgRect.left }px, ${ imgRect.top }px)`
    }

    // shrink clip-path area to match aspect ratio of parent
    if( settings.grow ){

        // Calculate the aspect ratio of the parent
        const parentHeight = target.parentNode.getBoundingClientRect().height
        const parentChildDiff = target.getBoundingClientRect().height - parentHeight

        css['-webkit-clip-path'] = 'inset(' + (parentChildDiff / 2) + 'px 0)'
        css['clip-path'] = 'inset(' + (parentChildDiff / 2) + 'px 0)'

    }

    const img = q('#zoomhaus-overlay .image-slot > *')
    for( let prop in css ){
        img.style[prop] = css[prop]
    }

    setTimeout(function(){
        q('#zoomhaus-overlay .image-slot').innerHTML = ''
        q('#zoomhaus-overlay').style.display = 'none'
        q('.zoomhaus-target.active').classList.remove('active')
        document.body.classList.remove('zoomhaus-transitioning')

        // stop matching scroll
        window.removeEventListener('scroll', matchScroll)
        document.getElementById('zoomhaus-overlay').style.top = 0

    }, 600);
    q('#zoomhaus-overlay img').classList.remove('zoomhaus-center');

}
