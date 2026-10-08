---
title: "IBaseColumnSeriesDataItem"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ibasecolumnseriesdataitem/"
generatedFrom: "@amcharts/amcharts5@5.21.0"
---

## Inheritance

Extends: IXYSeriesDataItem
All ancestors: IXYSeriesDataItem, ISeriesDataItem, IComponentDataItem
TypeScript: `am5xy.IBaseColumnSeriesDataItem` (`import type { IBaseColumnSeriesDataItem } from "@amcharts/amcharts5/xy"`)

## Data item fields

- **fill** (`Color`) — The column's color, given by the series when `colorByDataItem` is set. _Since 5.20.4._ Docs: https://www.amcharts.com/docs/v5/charts/xy-chart/series/column-series/
- **graphics** (`Graphics`) — The column drawn for the data item: a `RoundedRectangle`, `Slice`, `Candlestick` or `OHLC`, depending on the series.
- **rangeGraphics** (`Graphics[]`) — The data item's columns in the series' axis ranges, one per range.
- **legendDataItem** (`DataItem<ILegendDataItem>`) — The `Legend` data item for this data item, when the series' data items feed a legend. Docs: https://www.amcharts.com/docs/v5/concepts/legend/#Data_item_list

## Other inherited data item fields

Names only — see the declaring interface's page (e.g. `get_api_reference("IXYSeriesDataItem")`) for types, defaults and descriptions.

- _IXYSeriesDataItem_: bottom, categoryX, categoryY, highValueX, highValueXChange, highValueXChangePercent, highValueXChangePrevious, highValueXChangePreviousPercent, highValueXChangeSelection, highValueXChangeSelectionPercent, highValueXWorking, highValueXWorkingClose, highValueXWorkingOpen, highValueY, highValueYChange, highValueYChangePercent, highValueYChangePrevious, highValueYChangePreviousPercent, highValueYChangeSelection, highValueYChangeSelectionPercent, highValueYWorking, highValueYWorkingClose, highValueYWorkingOpen, left, locationX, locationY, lowValueX, lowValueXChange, lowValueXChangePercent, lowValueXChangePrevious, lowValueXChangePreviousPercent, lowValueXChangeSelection, lowValueXChangeSelectionPercent, lowValueXWorking, lowValueXWorkingClose, lowValueXWorkingOpen, lowValueY, lowValueYChange, lowValueYChangePercent, lowValueYChangePrevious, lowValueYChangePreviousPercent, lowValueYChangeSelection, lowValueYChangeSelectionPercent, lowValueYWorking, lowValueYWorkingClose, lowValueYWorkingOpen, openCategoryX, openCategoryY, openLocationX, openLocationY, openValueX, openValueXChange, openValueXChangePercent, openValueXChangePrevious, openValueXChangePreviousPercent, openValueXChangeSelection, openValueXChangeSelectionPercent, openValueXWorking, openValueXWorkingClose, openValueXWorkingOpen, openValueY, openValueYChange, openValueYChangePercent, openValueYChangePrevious, openValueYChangePreviousPercent, openValueYChangeSelection, openValueYChangeSelectionPercent, openValueYWorking, openValueYWorkingClose, openValueYWorkingOpen, originals, point, right, stackToItemX, stackToItemY, top, valueX, valueXChange, valueXChangePercent, valueXChangePrevious, valueXChangePreviousPercent, valueXChangeSelection, valueXChangeSelectionPercent, valueXWorking, valueXWorkingClose, valueXWorkingOpen, valueY, valueYChange, valueYChangePercent, valueYChangePrevious, valueYChangePreviousPercent, valueYChangeSelection, valueYChangeSelectionPercent, valueYWorking, valueYWorkingClose, valueYWorkingOpen
- _ISeriesDataItem_: customValue, customValueChange, customValueChangePercent, customValueChangePrevious, customValueChangePreviousPercent, customValueChangeSelection, customValueChangeSelectionPercent, customValueWorking, id, url, value, valueChange, valueChangePercent, valueChangePrevious, valueChangePreviousPercent, valueChangeSelection, valueChangeSelectionPercent, valueWorking, valueWorkingClose, valueWorkingOpen
- _IComponentDataItem_: visible
