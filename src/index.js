// import setupWindow from './setupWindow'
import closeOverlay from './closeOverlay'
import openOverlay from './openOverlay'
import { setDefault, q, qa, createAndAppend } from './utils'

class Zoomhaus {
    constructor(selector, options, callback) {
        options = options || {}

        this.opts = {
            container: options.container || window,
            grow: setDefault(options, 'grow', true),                     // Will the image need to grow and shrink when moving to and from its container?
            arrows: setDefault(options, 'arrows', true),                 // Can we page through images with left/right arrow keys?
            esc: setDefault(options, 'esc', true),                       // Can we use 'esc' to close an open gallery?,
            marginX: setDefault(options, 'marginX', 50),                 // Margins for expanded image
            marginY: setDefault(options, 'marginY', 50),
            template: setDefault(options, 'template', false),            // Selector for <template> to place inside the overlay
            clickToExit: setDefault(options, 'clickToExit', true),       // Does a click anywhere close the overlay when it's open?
            closeOnScroll: setDefault(options, 'closeOnScroll', true),   // Does a scroll close the open overlay?
            onGoTo: setDefault(options, 'goto', false),                  // Callback for zoomhaus.goto event. Accepts 3 params: Zoomhaus instance, outgoing element, and incoming element.
            close: setDefault(options, 'close', false)                   // Selectors that close the overlay when clicked
        }

        // add the main overlay if it doesn't exist
        if ( ! q('body > #zoomhaus-overlay') ){

            // look for the template if we have one
            let template = ''
            if( this.opts.template ){
                // copy the template
                template = q(this.opts.template).innerHTML
                // delete the original
                q(this.opts.template).outerHTML = ''
            }

            // construct overlay HTML
            const str = `
                <div id="zoomhaus-overlay">
                    <div class="image-slot"></div>
                    <div class="template-slot">${ template }</div>
                </div>
            `.trim()

            // append overlay to body
            createAndAppend(str, document.body)

            // add scroll exit if desired
            if( this.opts.closeOnScroll ){
                window.addEventListener('mousewheel', evt => {
                    this.close(evt)
                })
            }
        }

        // prep a list of matched elements
        this.elements = []
        // save our current index
        this.index = -1

        // iterate over desired objects
        qa(selector).forEach( el => {

            this.elements.push(el)

            // // abort if this is not an image
            // if ( ! $(this).is('img') ) return
            //
            // // add class
            el.classList.add('zoomhaus-target')

            // wait for click
            el.addEventListener('click', evt => {
                // open overlay for this image
                openOverlay( el, this.opts, window )

                // save index
                this.index = this.elements.indexOf(el)

                // prevent propagation so that we don't trigger a false document.body.click event
                if( this.opts.clickToExit ){
                    evt.stopPropagation()
                }
            })
        })

        // add click listeners to 'close' buttons
        if( this.opts.close ){
            qa(this.opts.close).forEach(el => {
                el.addEventListener('click', evt => {
                    this.close()
                })
            })
        }

        // close on click
        if( this.opts.clickToExit ){
            document.body.addEventListener('click', evt => {
                this.close()
            })
        }

        if( this.opts.esc ){
            document.body.addEventListener('keydown', evt => {
                if( evt.which == 27 ){ // Esc key
                    this.close()
                }
            })
        }

        if( this.opts.arrows ){
            document.body.addEventListener('keydown', evt => {
                if( evt.which == 37 ){ // left
                    this.previous()
                }
                if( evt.which == 39 ){ // right
                    this.next()
                }
            })
        }
    }

    close(evt){
        closeOverlay( this.opts, evt )
    }

    goto(index){
        if( ! q('.zoomhaus-target.active') || qa('.zoomhaus-target').length <= 1 ) return

        // keep index within bounds
        index = Math.max(0, Math.min(this.elements.length - 1, index))

        // save references
        const outgoing = q('.zoomhaus-target.active')
        const incoming = this.elements[index]

        // set classes
        outgoing.classList.remove('active')
        incoming.classList.add('active')

        // set index
        this.index = index

        // run callback
        if( this.opts.onGoTo ){
            this.opts.onGoTo(this, outgoing, incoming)
        } else {
            // Built-in transition - replaces current image with desired one

            // Set displayed image src and srcset to target
            const zhImage = q('.zoomhaus-image')
            zhImage.setAttribute( 'src', incoming.getAttribute('src') )
            if( incoming.hasAttribute('srcset') ){
                zhImage.setAttribute( 'srcset', incoming.getAttribute('srcset') )
            }

            // Center the image
            const width = Math.min( window.innerWidth - this.opts.marginX * 2, (parseInt(incoming.getAttribute('width')) || incoming.getBoundingClientRect().width) );
            zhImage.style.width = `${ width }px`
        }
    }

    next(){
        this.goto(this.index + 1)
    }

    previous(){
        this.goto(this.index - 1)
    }
}

window.Zoomhaus = Zoomhaus
