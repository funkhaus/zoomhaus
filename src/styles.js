let styles = '';
styles += '#zoomhaus-overlay {';
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

export default styles
