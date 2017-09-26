import { setDefault, q, qa, createAndAppend } from './utils'

export default ( settings ) => {

    // remove body class
    document.body.classList.remove('zoomhaus-open')

    // get rectangle for image as it sits in the page
    const imgRect = q('.zoomhaus-target.active').getBoundingClientRect()
    const target = q('.zoomhaus-target.active')

    let css = {
        'width': `${ imgRect.width }px`,
        // 'webkit-transform': `translate(${imgRect.left}px, ${imgRect.top}px)`,
        transform: `translate(${ imgRect.left }px, ${ imgRect.top }px)`
    }

    // shrink clip-path area to match aspect ratio of parent
    if( settings.grow ){

        // Calculate the aspect ratio of the parent
        var parentHeight = target.parentNode.getBoundingClientRect().height
        var diff = target.getBoundingClientRect().height - parentHeight

        css['-webkit-clip-path'] = 'inset(' + (diff / 2) + 'px 0)'
        css['clip-path'] = 'inset(' + (diff / 2) + 'px 0)'

    }

    const img = q('#zoomhaus-overlay .image-slot > *')
    for( let [key, value] of Object.entries(css) ){
        img.style[key] = value
    }
    //$('#zoomhaus-overlay img').css(css)

    setTimeout(function(){
        q('#zoomhaus-overlay .image-slot').innerHTML = ''
        q('#zoomhaus-overlay').style.display = 'none'
        q('.zoomhaus-target.active').classList.remove('active')
        document.body.classList.remove('zoomhaus-transitioning')

    }, 600);
    q('#zoomhaus-overlay img').classList.remove('zoomhaus-center');

}
