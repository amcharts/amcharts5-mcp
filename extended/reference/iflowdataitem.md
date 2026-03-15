---
title: "IFlowDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iflowdataitem/"
scraped: "2026-03-15"
---

Inheritance

## Inheritance

Extends: ISeriesDataItem
Extended by: IArcDiagramDataItem, IChordDataItem, ISankeyDataItem

> **Note:** This class also inherits all settings, properties, methods, and events from ISeriesDataItem (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **fill** (`Color`) — Link's color.
- **link** (`FlowLink`) — Associated link element.
- **source** (`DataItem`) — A data item of the source node.
- **sourceId** (`string`) — An ID of the source node.
- **target** (`DataItem`) — A data item of the target node.
- **targetId** (`string`) — An ID of the target node.
- **value** (`number`) — Link value.
