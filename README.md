## What
Takeover zoom effect like the images [here](http://funkhaus.us/14153/an-afternoon-with-an-la-icon-the-stahl-house/).

## How
1. Include jQuery.
1. Include `dist/bundle.js`.
1. `jQuery('element').zoomhaus()` on any images you want to zoom on click.
1. (Optional, but recommended) Include the contents of `./zoomhaus.css` in your own CSS to match the standard zoomhaus styling.

That's it!

## Options

`jQuery('element').zoomhaus({ option: value })`

### `arrows`

**Default `true`**

Can we use arrow keys to navigate through all zoomhaus images?

### `esc`

**Default `true`**

Can we use the 'esc' key to close the zoomhaus gallery?

### `grow`

**Default `true`**

Will a cropped image grow to its full size in the zoomhaus gallery? See the `.grow-demo` div on the included demo (`npm run dev`) for an example implementation.

## Development
1. Clone or fork this repo.
1. `npm install`
1. `npm run dev` to watch the contents of `src`. Runs a webpack-dev-server that serves a rendered version of `./index.ejs`, a demo of the plugin in action.
1. `npm run build` to bundle, and minify to `dist/bundle.js`.

-------

Version 1.1

http://funkhaus.us
