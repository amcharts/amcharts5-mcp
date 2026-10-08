---
title: "IFlowNodesDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iflownodesdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: ISeriesDataItem
All ancestors: ISeriesDataItem, IComponentDataItem
TypeScript: `am5flow.IFlowNodesDataItem` (`import type { IFlowNodesDataItem } from "@amcharts/amcharts5/flow"`)

## Data item fields

- **name** (`string`) — Node name.
- **node** (`FlowNode`) — The node element.
- **label** (`Label`) — Node label.
- **fill** (`Color`) — Node color.
- **fillPattern** (`Pattern`) — Node pattern. _Since 5.10.0._ Docs: https://www.amcharts.com/docs/v5/concepts/colors-gradients-and-patterns/patterns/
- **unknown** (`boolean`) — Marks a placeholder node, made for a link that has no source or target ID. It is not shown, and its links fade out toward it.
- **d3SankeyNode** (`d3sankey.SankeyNode<d3sankey.SankeyExtraProperties, d3sankey.SankeyExtraProperties>`) — _(internal)_
- **sumIncoming** (`number`) — Sum of values of all incoming links.
- **sumOutgoing** (`number`) — Sum of values of all outgoing links.
- **sumIncomingWorking** (`number`) — _(internal)_
- **sumOutgoingWorking** (`number`) — _(internal)_
- **sum** (`number`) — Sum of values of all links: incoming and outgoing.
- **sumWorking** (`number`) — _(internal)_
- **incomingLinks** (`DataItem<IFlowDataItem>[]`) — Data items of the links that come into the node.
- **outgoingLinks** (`DataItem<IFlowDataItem>[]`) — Data items of the links that go out of the node.
- **depth** (`number`) — Depth of the node.

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("ISeriesDataItem")`) for types, defaults and descriptions.

- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, value, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorking, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
