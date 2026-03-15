---
title: "LinkedHierarchy"
type: "class"
source: "https://www.amcharts.com/docs/v5/reference/linkedhierarchy/"
scraped: "2026-03-15"
---

A base class for linked hierarchy series.
Data item
LinkedHierarchy uses data items of type ILinkedHierarchyDataItem.

## Import

```javascript
// Import LinkedHierarchy
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy"
```

## Inheritance

Extends: Hierarchy
Extended by: ForceDirected, Tree

> **Note:** This class also inherits all settings, properties, methods, and events from Hierarchy (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Settings

- **linkWithField** (`undefined | string`) — A field in data which holds IDs of nodes to link with.

## Properties

- **circles** (`ListTemplate`) — Default new ListTemplate<Circle> A list of node circle elements in a LinkedHierarchy chart.
- **linkBullets** (`List`) — Default new List()
- **links** (`ListTemplate`) — Default new ListTemplate<HierarchyLink> A list of link elements in a LinkedHierarchy chart.
- **linksContainer** (`Container`) — Default Container.new() A Container that link elements are placed in.
- **nodes** (`ListTemplate`) — Default new ListTemplate<LinkedHierarchyNode> A list of nodes in a LinkedHierarchy chart.
- **outerCircles** (`ListTemplate`) — Default new ListTemplate<Circle> A list of node outer circle elements in a LinkedHierarchy chart.
