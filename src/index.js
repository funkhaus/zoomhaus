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
            grow: false,    // Will the image need to grow and shrink when moving to and from its container?
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

        // listen for a scroll event
        $(settings.container).scroll(function(){

            // if overlay is open, close it
            if ( $('body').hasClass('zoomhaus-open') ) closeOverlay( $, settings )

            // if there is a zoomed image, recalculate base position
            if ( $('.zoomhaus-target.active').length ){

                // get rectangle for active image
                var rect = $('.zoomhaus-target.active').get(0).getBoundingClientRect();

                // set top property on overlay image
                $('#zoomhaus-overlay img').eq(0).css({
                    top: rect.top
                });

            }
        });

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
                openOverlay( this, $, win )

            })
        })

    }

}(jQuery))
