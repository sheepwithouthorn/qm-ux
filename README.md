# QM-UX
qm-ux is a JavaScript library for QIANMI admin web UI.

## Features

 * Supports touch devices and [modern](http://caniuse.com/#search=drag) browsers (including IE9)
 * Can drag from one list to another or within the same list
 * CSS animation when moving items
 * Supports drag handles *and selectable text* (better than voidberg's html5sortable)
 * Smart auto-scrolling
 * Built using native HTML5 drag and drop API
 * Supports [Meteor](meteor/README.md), [AngularJS](#ng), [React](#react) and [Polymer](#polymer)
 * Supports any CSS library, e.g. [Bootstrap](#bs)
 * Simple API
 * [CDN](#cdn)
 * No jQuery (but there is [support](#jq))


<br/>


### Articles
 * [Sortable v1.0 — New capabilities](https://github.com/RubaXa/Sortable/wiki/Sortable-v1.0-—-New-capabilities/) (December 22, 2014)
 * [Sorting with the help of HTML5 Drag'n'Drop API](https://github.com/RubaXa/Sortable/wiki/Sorting-with-the-help-of-HTML5-Drag'n'Drop-API/) (December 23, 2013)


<br/>


### Usage

```js
import QMUX from 'qm-ux';
import {Form,Input,Select} from QMUX; 
render(){
    return(
        <Form>
            <Item><Input/></Item>
            <Item><Select/></Item>
        </Form>
    )
}
```

You can use any element for the list and its elements, not just `ul`/`li`. Here is an [example with `div`s](http://jsbin.com/luxero/2/edit?html,js,output).


---