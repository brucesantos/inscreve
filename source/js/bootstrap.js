//
//  BootStrap 5.x JavaScript
//
//  Some Bootstrap components require JavaScript. This file powers those components.
//  It uses ECMAScript modules, so to work in browsers it must be 'bundled' into a single,
//  browser-compatible JS file. CodeKit does this automatically using Rollup. By default all
//  Bootstrap components are enabled, but you can disable those you don't use to reduce the
//  final bundle size and speed up page-loads.
//

//
//  1. Import PopperJS
//     If you use the 'dropdown', 'tooltip', or 'popover' Bootstrap components, you MUST include PopperJS
//     or those components won't work. If you do not use those components, you can remove this import.
//
import * as Popper from '@popperjs/core/dist/umd/popper.js';     // eslint-disable-line no-unused-vars


//
//  2. Import Bootstrap Components
//     Optionally, remove or comment-out the modules you don't use.
//
import Alert from 'bootstrap/js/dist/alert';
import Button from 'bootstrap/js/dist/button';
import Carousel from 'bootstrap/js/dist/carousel';
import Collapse from 'bootstrap/js/dist/collapse';
import Dropdown from 'bootstrap/js/dist/dropdown';
import Modal from 'bootstrap/js/dist/modal';
import Offcanvas from 'bootstrap/js/dist/offcanvas';
import Popover from 'bootstrap/js/dist/popover';
import Scrollspy from 'bootstrap/js/dist/scrollspy';
import Tab from 'bootstrap/js/dist/tab';
import Toast from 'bootstrap/js/dist/toast';
import Tooltip from 'bootstrap/js/dist/tooltip';


//
//  3. Expose the Bootstrap components that you want to use from other scripts (e.g. new bootstrap.Popover(...))
//     If you disable any imports above, remove the corresponding export(s) here:
//
export default {
    Alert,
    Button,
    Carousel,
    Collapse,
    Dropdown,
    Modal,
    Offcanvas,
    Popover,
    Scrollspy,
    Tab,
    Toast,
    Tooltip
}


//
//  4. Optionally, add your custom JavaScript below, either directly or by importing ES6 Modules.
//     (Alternately, you can use the 'bootstrap' global object in external scripts.)
//
