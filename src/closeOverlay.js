import { setDefault, q, qa, createAndAppend } from './utils'

function matchScroll(evt){
    const overlay = document.getElementById('zoomhaus-overlay')
    const currentOffset = parseInt(overlay.style.top.replace('px', '')) || 0
    console.log(evt)
    overlay.style.top = currentOffset - evt.movementY + 'px'
}

export default ( settings, wheelEvent ) => {

    // abort if we're already closed or if we're animating
    if ( ! document.body.classList.contains('zoomhaus-open')
        || document.body.classList.contains('zoomhaus-transitioning') )
        return

    // get rectangle for image as it sits in the page
    const imgRect = q('.zoomhaus-target.active').getBoundingClientRect()
    const target = q('.zoomhaus-target.active')

    // start matching scroll
    document.getElementById('zoomhaus-overlay').style.top = `${ -wheelEvent.deltaY }px`
    window.addEventListener('mousewheel', matchScroll)

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

        // start matching scroll
        window.removeEventListener('mousewheel', matchScroll)
        document.getElementById('zoomhaus-overlay').style.top = 0

    }, 600);
    q('#zoomhaus-overlay img').classList.remove('zoomhaus-center');

}
