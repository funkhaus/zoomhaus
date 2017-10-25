## What
Takeover zoom effect like the images [here](http://funkhaus.us/14153/an-afternoon-with-an-la-icon-the-stahl-house/).

## How
1. Include jQuery.
1. Include `dist/bundle.js`.
1. Include the contents of `./zoomhaus.css` in your own CSS.
1. `jQuery('element').zoomhaus()` on any images you want to zoom on click.

That's it!

## Options

`jQuery('element').zoomhaus({ option: value })`

### `arrows`

***Boolean. Default `true`***

Can we use arrow keys to navigate through all zoomhaus images?

### `clickToExit`

***Boolean. Default `true`***

Will a click anywhere on the open overlay trigger its closing?

### `closeOnScroll`

***Boolean. Default `true`***

Will scrolling while the overlay is open close that overlay?

### `esc`

***Boolean. Default `true`***

Can we use the 'esc' key to close the zoomhaus gallery?

### `goto( evt, index, $outgoing, $incoming, next )`

***Function. Default `false`***

Override the default `zoomhaus.goto` callback with your own. Accepts five arguments: the event, the desired index, a reference to the old zoom target, a reference to the new zoom target, and a bool set to `true` if going to the next slide and `false` if not.

### `grow`

***Boolean. Default `true`***

Will a cropped image grow to its full size in the zoomhaus gallery? See the `.grow-demo` div on the included demo (`npm run dev`) for an example implementation.

### `marginX`

***Number. Default `50`***

Minimum horizontal margin of a zoomed-in image, in pixels.

### `marginY`

***Number. Default `50`***

Minimum vertical margin of a zoomed-in image, in pixels.

### `template`

***String. Default `false`***

Selector to use for a template element in the zoomed-in overlay. Moves the template element to the `#zoomhaus-overlay .template-slot` element. Useful for adding arrow keys to the overlay, for example.

## Events

`jQuery(document).trigger('event-name-here')`

### `zoomhaus.close`

Closes the open Zoomhaus overlay.

### `zoomhaus.goto`

Goes to the nth `zoomhaus-target`. `jQuery(document).trigger('zoomhaus.goto', [ yourIndexHere ])`

### `zoomhaus.next`

Goes to the next `zoomhaus-target` in the overlay.

### `zoomhaus.previous`

Goes to the previous `zoomhaus-target` in the overlay.

## Development
1. Clone or fork this repo.
1. `npm install`
1. `npm run dev` to watch the contents of `src`. Runs a webpack-dev-server that serves a rendered version of `./index.ejs`, a demo of the plugin in action.
1. `npm run build` to bundle, and minify to `dist/bundle.js`.

-------

Version 2.1.2

http://funkhaus.us

* 2.1.2 - Fixed Safari sizing bug and buggy scrolling
* 2.1.1 - Fixed a click-to-close bug
* 2.1.0 - Trimmed down lots of extra code, made class declarations central
* 2.0.4 - Added `goto`
* 2.0.3 - Added `clickToExit`, `closeOnScroll`, more robust events and documentation
* 2.0.2 - Added `template`
* 2.0.1 - Added `marginX` and `marginY`, fixed a vertical sizing bug
