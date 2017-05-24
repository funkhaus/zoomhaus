import bootstrap from './bootstrap'
// bootstraps transitions - bootstrap() doesn't work for some reason
bootstrap

/*!
* jQuery zoomHaus; version: 1.0
* https://github.com/...
* Copyright (c) 2016 Funkhaus; MIT license
*/
/*!
* jQuery zoomHaus; version: 1.0
* https://github.com/...
* Copyright (c) 2016 Funkhaus; MIT license
*/
(function($) {

    $.fn.zoomhaus = function(options, cb) {

        var $elems = this;

        // Defaults
        var settings = $.extend({
            container: window,
            grow: false     // Will the image need to grow and shrink when moving to and from its container?
        }, options);

        // Save window dimensions
        var winHeight   = window.innerHeight || document.documentElement.clientHeight;
        var winWidth   = window.innerWidth || document.documentElement.clientWidth;

        // Update window dimensions when necessary
        $(window).resize(function() {
            winHeight = window.innerHeight || document.documentElement.clientHeight;
            winWidth   = window.innerWidth || document.documentElement.clientWidth;
        });

        // add the main overlay if it does not exist
        if ( ! $('body > #zoomhaus-overlay').length ){
            $('body').append('<div id="zoomhaus-overlay"></div>');
        }

        var styles = '';
            styles += '#zoomhaus-overlay {';
                styles += 'pointer-events: none;';
                styles += '-webkit-pointer-events: none;';
                styles += 'position: fixed;';
                styles += 'display: none;';
                styles += 'height: 100%;';
                styles += 'width: 100%;';
                styles += 'left: 0;';
                styles += 'top: 0;';
            styles += '}';
            styles += '.zoomhaus-target {';
                styles += 'cursor: pointer;';
            styles += '}';
            styles += '#zoomhaus-overlay img {';
                styles += '-webkit-transform-origin: left top;';
                styles += 'transform-origin: left top;';
            styles += '}';

        // add css styling to head
        $('head').append('<style>' + styles + '</style>');

        // define function to close overlay
        var closeOverlay = function(){

            // remove body class
            $('body').removeClass('zoomhaus-open').addClass('zoomhaus-transitioning');

            var css = {
                '-webkit-transform': 'none',
                'transform': 'none'
            };

            if( settings.grow ){

                var $target = $('.zoomhaus-target.active');

                // Calculate the aspect ratio of the parent
                var parentHeight = $target.parent().innerHeight();
                var diff = $target.innerHeight() - parentHeight;
                css['-webkit-clip-path'] = 'inset(' + (diff / 2) + 'px 0)';
                css['clip-path'] = 'inset(' + (diff / 2) + 'px 0)';

            }

            // remove transform styles, fire callback
            $('#zoomhaus-overlay img').css(css)
            .one($.support.transition.end, function(){

                $('#zoomhaus-overlay').hide().empty();
                $('.zoomhaus-target.active').removeClass('active');
                $('body').removeClass('zoomhaus-transitioning');

            })
            .emulateTransitionEnd(600);

        }

        // close overlay when clicking anything
        $(document).on('click', '.zoomhaus-open *', closeOverlay);

        // listen for a scroll event
        $(settings.container).scroll(function(){

            // if overlay is open, close it
            if ( $('body').hasClass('zoomhaus-open') ) closeOverlay();

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
            if ( ! $(this).is('img') ) return;

            // add class
            $(this).addClass('zoomhaus-target');

            // wait for click
            $(this).click(function(e){

                // abort if there is already an instance open
                if ( $('body.zoomhaus-open').length ) return;

                // add active class to image
                $(this).addClass('active');

                // get rectangle for image as it sits in the page
                var imgRect = this.getBoundingClientRect();

                // calculate natural aspect ratio for image
                // aspect ratio > 1: image is portrait
                // aspect ratio < 1: image is landscape
                var naturalRatio = Math.max( $(this).attr('height'), $(this).height() ) / Math.max( $(this).attr('width'), $(this).width() );

                // get target dimensions
                var targetWidth = Math.min( (winWidth - 100), $(this).attr('width') );
                var targetHeight = Math.min( (winHeight - 100), $(this).attr('height') );

                var css = {
                    transform: 'none',
                    position: 'absolute',
                    width: imgRect.width,
                    left: imgRect.left,
                    top: imgRect.top,
                    height: 'auto',
                };

                // determine if we need any clipping
                if( settings.grow ){

                    // Calculate the aspect ratio of the parent
                    var parentHeight = $(this).parent().innerHeight();
                    var diff = $(this).innerHeight() - parentHeight;
                    css['-webkit-clip-path'] = 'inset(' + (diff / 2) + 'px 0)';
                    css['clip-path'] = 'inset(' + (diff / 2) + 'px 0)';

                }

                // clone target image, position it
                var $newImg = $(this).clone()
                    .css( css )
                    .removeClass('active zoomhaus-target');

                // add image into overlay
                $('#zoomhaus-overlay').show().html( $newImg.addClass('zoomhaus-image') );

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
                var scale = targetWidth / imgRect.width;
                var antiScale = imgRect.width / targetWidth;

                // calculate translate offsets
                var offsets = {
                    x: ((winWidth / 2) - (targetWidth / 2)) - imgRect.left,
                    y: ((winHeight / 2) - (targetHeight / 2)) - imgRect.top,
                };

                // wait for animation frame so the browser can handle transitions
                window.requestAnimationFrame(function(){

                    // add body classes
                    $('body').addClass('zoomhaus-open zoomhaus-transitioning');

                    // when transition complete...
                    $newImg.one($.support.transition.end, function(){

                        // remove transition class
                        $('body').removeClass('zoomhaus-transitioning');

                    })
                    .emulateTransitionEnd(600);

                    // add transform styling
                    $newImg.css({
                        '-webkit-clip-path': 'inset(0)',
                        'clip-path': 'inset(0)',
                        '-webkit-transform': 'scale(' + scale + ')' + ' translate3d(' + (offsets.x * antiScale) + 'px, ' + (offsets.y * antiScale) + 'px, 0)',
                        'transform': 'scale(' + scale + ')' + ' translate3d(' + (offsets.x * antiScale) + 'px, ' + (offsets.y * antiScale) + 'px, 0)'
                    });

                });

            });

        });

        // return $elems
        return this;
    }

}(jQuery));
