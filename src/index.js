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
            goto: setDefault(options, 'goto', false),                    // Callback for zoomhaus.goto event
            close: setDefault(options, 'close', false)                   // Selectors that close the overlay when clicked
        }

        // add the main overlay if it does not exist
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

        }

        // Save a list of matched elements
        this.elements = []

        // Iterate over desired objects
        qa(selector).forEach( el => {

            this.elements.push(el)

            // // abort if this is not an image
            // if ( ! $(this).is('img') ) return
            //
            // // add class
            el.classList.add('zoomhaus-target')

            // wait for click
            el.addEventListener('click', evt => {

                // abort if there is already an instance open or if we're animating
                if ( document.body.classList.contains('zoomhaus-open')
                    || document.body.classList.contains('zoomhaus-transitioning') )
                    return

                // open overlay for this image
                openOverlay( el, this.opts, window )

            })
        })

        if( this.opts.close ){
            qa(this.opts.close).forEach(el => {
                el.addEventListener('click', evt => {
                    this.close()
                })
            })
        }

    }

    close(){
        closeOverlay( this.opts )
    }
}

window.Zoomhaus = Zoomhaus

/*

        // Setup window dimension shortcuts and onResize listeners
        const win = setupWindow($)



        // close overlay when clicking anything
        if( settings.clickToExit ){
            $(document).on('click', '#zoomhaus-overlay', function(){
                if( jQuery('body').hasClass('zoomhaus-open') ){
                    $(document).trigger('zoomhaus.close')
                }
            })
        }

        if( settings.closeOnScroll ){
            $(settings.container).scroll(function(){
                // if overlay is open, close it
                if ( $('body').hasClass('zoomhaus-open') ){
                    $(document).trigger('zoomhaus.close')
                }
            })
        }


        // now loop through elements and set a listener

        // Set up esc key
        if( settings.esc && $('body').data('zoomhaus.esc') === undefined ){
            $(document).keydown(function(evt){
                if( evt.which == 27 && $('.zoomhaus-open').length ){
                    $(document).trigger('zoomhaus.close')
                }
            })

            $('body').data('zoomhaus.esc', true)
        }

        // Remove event so we don't get duplicates
        $(document).off('zoomhaus.goto')
        $(document).off('zoomhaus.next')
        $(document).off('zoomhaus.previous')
        $(document).off('zoomhaus.close')

        // Change the displayed image without zooming out and in
        $(document).on('zoomhaus.goto', function(evt, index){

            // Make sure a zoomhaus image is active and we have more than one zoomhaus target
            if( ! $('.zoomhaus-target.active').length || $('.zoomhaus-target').length <= 1 ) return

            // Save outgoing and incoming targets
            const $outgoingReference = $('.zoomhaus-target.active')
            const $incomingReference = $('.zoomhaus-target').eq(index)

            // Set appropriate classes
            $outgoingReference.removeClass('active')
            $incomingReference.addClass('active')

            if( settings.goto ){

                const outgoingIndex = $('.zoomhaus-target').index($outgoingReference)
                const lastIndex = $('.zoomhaus-target').length - 1

                let toNext = index > outgoingIndex || (outgoingIndex === lastIndex && index === 0)
                if( outgoingIndex === 0 && index === lastIndex ) toNext = false

                settings.goto(evt, index, $outgoingReference, $incomingReference, toNext)

            } else {
                // Built-in transition - replaces current image with desired one

                // Set displayed image src and srcset to target
                $('.zoomhaus-image').attr( 'src', $incomingReference.attr('src') )
                $('.zoomhaus-image').attr( 'srcset', $incomingReference.attr('srcset') )

                // Center the image
                const width = Math.min( win.width - 100, $incomingReference.attr('width') );
                $('.zoomhaus-image').css('width', width)

                evt.preventDefault()
            }
        })

        $(document).on('zoomhaus.next', function(evt){
            var index = $('.zoomhaus-target.active').index( '.zoomhaus-target' )
            index += 1
            if( index >= $('.zoomhaus-target').length ){
                index = 0
            }
            jQuery(document).trigger('zoomhaus.goto', [ index ])
        });

        $(document).on('zoomhaus.previous', function(evt){
            var index = $('.zoomhaus-target.active').index( '.zoomhaus-target' )
            index -= 1
            if( index < 0 ){
                index = $('.zoomhaus-target').length - 1
            }
            jQuery(document).trigger('zoomhaus.goto', [ index ])
        });

        $(document).on('zoomhaus.close', function(evt){
            closeOverlay( $, settings );
        });

        // Set up arrow key nav if desired
        if( jQuery('body').data('zoomhaus.arrow-nav') === undefined ){

            jQuery(document).keydown(function(evt){

                switch( evt.which ){
                    case 37 : // left
                        $(document).trigger('zoomhaus.previous')
                        break

                    case 39 : // right
                        $(document).trigger('zoomhaus.next')
                        break

                    default: return
                }
            })

            jQuery('body').data('zoomhaus.arrow-nav', true)
        }

        // return $elems
        return this

    }

}(jQuery))*/
