---
title: "Picture"
type: "class"
source: "https://docs.amcharts.com/v5/reference/picture/"
generatedFrom: "@amcharts/amcharts5@5.22.0"
---

Displays an image. If only `width` or `height` is set, the other follows the image's aspect ratio.

Docs: https://docs.amcharts.com/v5/concepts/common-elements/images/

## Import

```js
import * as am5 from "@amcharts/amcharts5";

am5.Picture.new(root, { /* settings */ });
```

## Inheritance

Extends: Sprite → Entity → Settings

## Settings and related interfaces

- Settings: `IPictureSettings` — get_api_reference shows it after this page
- Private settings: `IPicturePrivate`
- Events: `IPictureEvents`

## Other inherited methods

Names only — see the declaring class's page (e.g. `get_api_reference("Sprite")`) for signatures and descriptions.

- _Sprite_: appear, compositeOpacity, compositeRotation, compositeScale, depth, getDateFormatter, getDurationFormatter, getNumberFormatter, getTooltip, height, hide, hideTooltip, hover, isDragging, isFocus, isHidden, isHiding, isHover, isShowing, isVisible, isVisibleDeep, markDirtyKey, maxHeight, maxWidth, show, showTooltip, toBack, toFront, toGlobal, toLocal, unhover, width, x, y
- _Entity_: get, isType, remove, set, setTimeout
- _Settings_: animate, dispose, has, isDisposed, off, offDebounced, offDebouncedPrivate, offPrivate, on, onDebounced, onPrivate, onPrivateDebounced, once, onceDebounced, removeAll, setAll
