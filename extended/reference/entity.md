---
title: "Entity"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/entity/"
scraped: "2026-03-15"
---

Base class.

## Import

```javascript
// Import Entity
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Settings
Extended by: ColorSet, Layout, Sprite, Pattern, Gradient, InterfaceColors, NumberFormatter, DateFormatter, DurationFormatter, Language, Modal, Bullet, PatternSet, DataProcessor, AxisBullet, StockControl, Dropdown, StockToolbar, Serializer, Exporting, ExportingMenu, Annotator, SliceGrouper

> **Note:** This class also inherits all settings, properties, methods, and events from Settings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **id** (`undefined | string`) — A custom string ID for the element. If set, element can be looked up via root.entitiesById. Will raise error if an element with the same ID already exists.
- **stateAnimationDuration** (`undefined | number`) — Duration of transition from one state to another.
- **stateAnimationEasing** (`$ease.Easing`) — Easing of transition from one state to another.
- **themeTags** (`Array`) — Tags which can be used by the theme rules. Click here for more info
- **themeTagsSelf** (`Array`) — Tags which can be used by the theme rules. These tags only apply to this object, not any children. Click here for more info
- **themes** (`Array`) — A list of themes applied to the element.

## Properties

- **adapters** (`Adapters`) — Default new Adapters(this)
- **events** (`EventDispatcher`) — Default this._createEvents()
- **root** (`Root`) — An instance of Root object. @readonly @since 5.0.6
- **states** (`States`) — Default new States(this)
- **template** (`Template | undefined`) — 

## Events

- **root** (`Root`) — An instance of Root object. @readonly @since 5.0.6
- **states** (`States`) — Default new States(this)
- **template** (`Template | undefined`) — 
