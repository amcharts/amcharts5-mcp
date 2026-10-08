---
title: "Modal popups"
source: "https://www.amcharts.com/docs/v5/concepts/common-elements/modal-popups/"
scraped: "2026-10-08"
---

amCharts 5 has a built-in way to display modal popups over the area of a Root element.

## Creating

To create a modal popup, we just need to instantiate a `Modal` class instance using its `new()` syntax.

Its main setting is `content`, which holds HTML to display in the modal:

let modal = am5.Modal.new(root, {
  content: "<h3>Hello, I'm modal!</h3><p>Nice to meet you.</p>"
});

var modal = am5.Modal.new(root, {
  content: "<h3>Hello, I'm modal!</h3><p>Nice to meet you.</p>"
});

## Opening

To open the modal, use its `open()` method:

modal.open();

modal.open();

## Closing and cancelling

Simirally, to close it, use `close()`:

modal.close();

modal.close();

A modal can also be "cancelled" by pressing an ESC key, or calling its `cancel()` method.

There's no functional difference between the two (modal will close in either case), except closing will generate `"closed"` event, whereas cancelling will trigger `"cancelled"`.

## Disposing

When modal object is no longer needed, make sure you `dispose()` it:

modal.dispose();

modal.dispose();

## Events

Modal has three event types:

Event

Comment

`"opened"`

Invoked when a modal opens.

`"closed"`

Invoked when modal is closed via its `close()` method.

`"cancelled"`

Invoked when modal is closed via its `cancel()` method or ESC key.

modal.events.on("opened", function(ev) {
  // A modal has been opened
  // ...
});

modal.events.on("opened", function(ev) {
  // A modal has been opened
  // ...
});

## Modal DOM elements

Modal consists of several elements representing its main wrapper div, curtain (shaded area covering root element), and content.

They are accessible via modal's private settings:

Reference

Comment

`modal.getPrivate("wrapper")`

Wrapper `<div>`.

`modal.getPrivate("curtain")`

Curtain `<div>`.

`modal.getPrivate("content")`

Modal content `<div>`.

We can use those in any way we want, e.g. styling them, applying classes, or appending other elements.

The following code will add two buttons: OK and Cancel, that in respectively invoke `close()` and `cancel()` methods.

let modal = modal = am5.Modal.new(root, {
  content: "<h3>Hello, I'm modal!</h3><p>Nice to meet you.</p>"
});

let modalSetup = false;

function openModal() {
  if (!modalSetup) {
    let okButton = document.createElement("input");
    okButton.type = "button";
    okButton.value = "OK";
    okButton.addEventListener("click", function() {
      modal.close();
    });
    
    let cancelButton = document.createElement("input");
    cancelButton.type = "button";
    cancelButton.value = "Cancel";
    cancelButton.addEventListener("click", function() {
      modal.cancel();
    });
    
    modal.getPrivate("content").appendChild(okButton);
    modal.getPrivate("content").appendChild(cancelButton);
    
    modalSetup = true;
  }
  modal.open();
}

function closeModal() {
  if (modal) {
    modal.close();
  }
}

var modal = modal = am5.Modal.new(root, {
  content: "<h3>Hello, I'm modal!</h3><p>Nice to meet you.</p>"
});

var modalSetup = false;

function openModal() {
  if (!modalSetup) {
    var okButton = document.createElement("input");
    okButton.type = "button";
    okButton.value = "OK";
    okButton.addEventListener("click", function() {
      modal.close();
    });
    
    var cancelButton = document.createElement("input");
    cancelButton.type = "button";
    cancelButton.value = "Cancel";
    cancelButton.addEventListener("click", function() {
      modal.cancel();
    });
    
    modal.getPrivate("content").appendChild(okButton);
    modal.getPrivate("content").appendChild(cancelButton);
    
    modalSetup = true;
  }
  modal.open();
}

function closeModal() {
  if (modal) {
    modal.close();
  }
}

## Accessibility

A modal is exposed to screen readers as a dialog. It is named by the first heading (`<h1>` - `<h6>`) in its content, e.g. "Hello, I'm modal!" in the examples above.

If the content has no heading, or we'd like a different name, we can set it with the `ariaLabel` setting:

let modal = am5.Modal.new(root, {
  content: "<p>Are you sure you want to delete this item?</p>",
  ariaLabel: "Confirm deletion"
});

var modal = am5.Modal.new(root, {
  content: "<p>Are you sure you want to delete this item?</p>",
  ariaLabel: "Confirm deletion"
});

The modal also handles keyboard focus:

-   When it opens, focus moves to the first focusable element in its content (a button, input, link, etc.), or to the modal itself if there is none.
-   While it is open, TAB and SHIFT+TAB cycle through the elements inside it, and do not leave it.
-   ESC cancels it.
-   When it closes, focus goes back to the element that had it before the modal opened.

NOTEThese features are available since version 5.21.0. They also apply to modals used by other parts of the library, such as [Stock chart](https://www.amcharts.com/docs/v5/charts/stock/) settings.

## Example


