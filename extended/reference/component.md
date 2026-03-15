---
title: "Component"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/component/"
scraped: "2026-03-15"
---

A base class for elements that make use of data.
Data item
Component uses data items of type IComponentDataItem.

## Import

```javascript
// Import Component
import * as am5 from "@amcharts/amcharts5"
```

## Inheritance

Extends: Container
Extended by: Series, Axis

> **Note:** This class also inherits all settings, properties, methods, and events from Container (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **interpolationDuration** (`undefined | number`) — A duration of the animation from one setting value to another, in milliseconds. Click here for more info
- **interpolationEasing** (`$ease.Easing`) — Easing function to use for cross setting value animations. Click here for more info

## Properties

- **data** (`ListData`) — Component's data. Click here for more info
- **dataItems** (`Array`) — A list of component's data items.
- **inited** (`boolean`) — Default false Indicates if the component has already been initialized.
