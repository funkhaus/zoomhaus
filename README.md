## What
Vanilla JS, zero-dependency takeover zoom effect like the images [here](http://funkhaus.us/14153/an-afternoon-with-an-la-icon-the-stahl-house/).

## How
### Webpack
```js
import Zoomhaus from 'zoomhaus'

new Zoomhaus('element-selector')
```

### Other
1. Include `dist/bundle.js`.
1. `new Zoomhaus('element-selector')` on any elements you want to zoom on click.

That's it!

## Options

```js
new Zoomhaus('element-selector', {
    // Will the image be able to grow and shrink when moving to and from its container?
    grow: true,

    // Can we page through images with left/right arrow keys?
    arrows: true,               

    // Can we use the 'esc' key to close an open gallery?
    esc: true,

    // Margins for expanded image                       
    marginX: 50,
    marginY: 50,

    // Selector for template element - see below
    template: false,        

    // Does a click anywhere close the open overlay?   
    clickToExit: true,   

    // Does a scroll close the open overlay?
    closeOnScroll: true,

    // Replacement for zoomhaus.goto method. Accepts 3 params: Zoomhaus instance, outgoing element, and incoming element.  
    onGoTo: false,      

    // Selectors that close the overlay when clicked            
    close: false,

    // CSS to be added to Zoomhaus defaults. Set to `false` to prevent any style injection.
    style: ''               
})
```

__A note on `template`__ - If `template` is set to a valid selector, Zoomhaus will grab the first element that matches that selector and place it in the image overlay. Useful for pager elements on the overlay itself, for example.

## Methods

Usage:

```js
var z = new Zoomhaus('.element-selector')
z.methodName()
```

* `close()` - Close an open overlay.
* `goto(index)` - Go to a particular Zoomhaus target. Loops automatically.
* `next()` - Go to the next Zoomhaus target. Loops automatically.
* `previous()` - Go to the previous Zoomhaus target. Loops automatically.

## Properties

* `elements` - Elements that this Zoomhaus instance watches.
* `index` - Index of current or last active zoomed-in element.
* `opts` - Options for Zoomhaus instance.

## Development
1. Clone or fork this repo.
1. `npm install`
1. `npm run dev` to watch the contents of `src`. Runs a webpack-dev-server that serves a rendered version of `./index.ejs`, a demo of the plugin in action.
1. `npm run build` to bundle, and minify to `dist/bundle.js`.

-------

Version 3.1.0

http://funkhaus.us

* 3.1.0 - Removed need for extra CSS file
* 3.0.0 - Migrated to vanilla JS
* 2.1.1 - Fixed a click-to-close bug
* 2.1.0 - Trimmed down lots of extra code, made class declarations central
* 2.0.4 - Added `goto`
* 2.0.3 - Added `clickToExit`, `closeOnScroll`, more robust events and documentation
* 2.0.2 - Added `template`
* 2.0.1 - Added `marginX` and `marginY`, fixed a vertical sizing bug
