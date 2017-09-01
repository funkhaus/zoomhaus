import setupWindow from './setupWindow'
import styles from './styles'
import closeOverlay from './closeOverlay'
import openOverlay from './openOverlay'

(function($){

    $.fn.zoomhaus = function(options, cb) {

        let cache = {}

        // Defaults
        const settings = $.extend({
            container: window,
            grow: true,                 // Will the image need to grow and shrink when moving to and from its container?
            arrows: true,               // Can we page through images with left/right arrow keys?
            esc: true,                  // Can we use 'esc' to close an open gallery?,
            marginX: 50,                // Margins for expanded image
            marginY: 50,
            template: false,            // Selector for <template> to place inside the overlay
            clickToExit: true,          // Does a click anywhere close the overlay when it's open?
            closeOnScroll: true,        // Does a scroll close the open overlay?
            goto: false                 // Callback for zoomhaus.goto event
        }, options)

        // Setup window dimension shortcuts and onResize listeners
        const win = setupWindow($)

        // add the main overlay if it does not exist
        if ( ! $('body > #zoomhaus-overlay').length ){
            $('body').append('<div id="zoomhaus-overlay"><div class="image-slot"></div><div class="template-slot"></div></div>')

            // add template if we've defined one
            if( settings.template && $(settings.template).length ){
                $('#zoomhaus-overlay .template-slot').append( $(settings.template) )
            }
        }

        // add css styling to head
        $('head').append('<style>' + styles + '</style>')

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
        this.each(function(index){

            const el = $(this).get(0)

            // abort if this is not an image
            if ( ! $(this).is('img') && !el.hasAttribute('width') && !el.hasAttribute('height') ) return

            // add class
            $(this).addClass('zoomhaus-target')

            // cache source
            const cacheId = `zhCache${index}`
            $(this).data('zoomhaus-cache-id', cacheId)
            if( $(this).is('img') ){
                const img = new Image($(this).attr('width'), $(this).attr('height'))
                img.src = $(this).attr('src')
                cache[cacheId] = img
            } else if( $(this).is('video') ){
                const src = $(this).find('source').attr('src')
                console.log(src)

                const videoRequest = fetch('').then(response => response.blob());
                videoRequest.then(blob => {
                    cache[cacheId] = window.URL.createObjectURL(blob)
                });
            }

            // wait for click
            $(this).click(function(e){

                // abort if there is already an instance open or if we're animating
                if ( $('body.zoomhaus-open').length || $('body.zoomhaus-transitioning').length ) return

                // open overlay for this image
                openOverlay( this, settings, $, win, cache )

            })
        })

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

}(jQuery))
