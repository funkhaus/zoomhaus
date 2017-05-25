import bootstrap from './bootstrap'
import setupWindow from './setupWindow'
import styles from './styles'
import closeOverlay from './closeOverlay'
import openOverlay from './openOverlay'

// bootstraps transitions - bootstrap() throws an error for some reason
bootstrap

(function($){

    $.fn.zoomhaus = function(options, cb) {

        // Defaults
        const settings = $.extend({
            container: window,
            grow: true,    // Will the image need to grow and shrink when moving to and from its container?
            arrows: true,   // Can we page through images with left/right arrow keys?
            esc: true       // Can we use 'esc' to close an open gallery?
        }, options)

        // Setup window dimension shortcuts and onResize listeners
        const win = setupWindow($)

        // add the main overlay if it does not exist
        if ( ! $('body > #zoomhaus-overlay').length ){
            $('body').append('<div id="zoomhaus-overlay"></div>')
        }

        // add css styling to head
        $('head').append('<style>' + styles + '</style>')

        // close overlay when clicking anything
        $(document).on('click', '.zoomhaus-open', function(){
            closeOverlay( $, settings )
        })

        $(settings.container).scroll(function(){

            // if overlay is open, close it
            if ( $('body').hasClass('zoomhaus-open') ) closeOverlay( $, settings )

        })

        // now loop through elements and set a listener
        this.each(function(){

            // abort if this is not an image
            if ( ! $(this).is('img') ) return

            // add class
            $(this).addClass('zoomhaus-target')

            // wait for click
            $(this).click(function(e){

                // abort if there is already an instance open or if we're animating
                if ( $('body.zoomhaus-open').length || $('body.zoomhaus-transitioning').length ) return

                // open overlay for this image
                openOverlay( this, settings, $, win )

            })
        })

        // Set up esc key
        if( settings.esc && $('body').data('zoomhaus.esc') === undefined ){
            $(document).keydown(function(evt){
                if( evt.which == 27 && $('.zoomhaus-open').length ){
                    closeOverlay($, settings)
                }
            })

            $('body').data('zoomhaus.esc', true)
        }

        // Remove event so we don't get duplicates
        $(document).off('zoomhaus.goto')

        // Change the displayed image without zooming out and in
        $(document).on('zoomhaus.goto', function(evt, index){

            // Make sure a zoomhaus image is active and we have more than one zoomhaus target
            if( ! $('.zoomhaus-target.active').length || $('.zoomhaus-target').length <= 1 ) return

            // Save outgoing and incoming targets
            var $outgoing = $('.zoomhaus-target.active')
            var $incoming = $('.zoomhaus-target').eq(index)

            // Set displayed image src and srcset to target
            $('.zoomhaus-image').attr( 'src', $incoming.attr('src') )
            $('.zoomhaus-image').attr( 'srcset', $incoming.attr('srcset') )

            // Center the image
            const width = Math.min( win.width - 100, $incoming.attr('width') );
            $('.zoomhaus-image').css('width', width)

            // Set appropriate classes
            $outgoing.removeClass('active')
            $incoming.addClass('active')

            evt.preventDefault()

        })

        // Set up arrow key nav if desired
        if( jQuery('body').data('zoomhaus.arrow-nav') === undefined ){

            jQuery(document).keydown(function(evt){
                var index = $('.zoomhaus-target.active').index( '.zoomhaus-target' )

                switch( evt.which ){
                    case 37 : // left
                        index -= 1
                        if( index < 0 ){
                            index = $('.zoomhaus-target').length - 1
                        }
                        break

                    case 39 : // right
                        index += 1
                        if( index >= $('.zoomhaus-target').length ){
                            index = 0
                        }
                        break

                    default: return
                }

                jQuery(document).trigger('zoomhaus.goto', [ index ])
            })

            jQuery('body').data('zoomhaus.arrow-nav', true)
        }



        // return $elems
        return this

    }

}(jQuery))
