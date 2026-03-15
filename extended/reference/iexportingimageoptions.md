---
title: "IExportingImageOptions"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iexportingimageoptions/"
scraped: "2026-03-15"
---

Inheritance
IExportingImageOptions extends IExportingFormatOptions.
IExportingImageOptions is extended by IExportingPrintOptions, IExportingPDFOptions.
Properties


        disabled        
        #
      


                          Type undefined | false | true                      
Inherited from IExportingFormatOptions
If set to true, this format will not appear in ExportMenu.


        maintainPixelRatio        
        #
      


                          Type undefined | false | true                      
Default false

Export images with hardware resolution (false), or the way they appear on screen (true).

## Inheritance

Extends: IExportingFormatOptions
Extended by: IExportingPrintOptions, IExportingPDFOptions

> **Note:** This class also inherits all settings, properties, methods, and events from IExportingFormatOptions (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **maintainPixelRatio** (`undefined | false | true`) — Default false Export images with hardware resolution (false), or the way they appear on screen (true). Click here for more info
- **maxHeight** (`undefined | number`) — Maximal height of exported image, in pixels. Click here for more info
- **maxWidth** (`undefined | number`) — Maximal width of exported image, in pixels. Click here for more info
- **minHeight** (`undefined | number`) — Minimal height of exported image, in pixels. Click here for more info
- **minWidth** (`undefined | number`) — Minimal width of exported image, in pixels. Click here for more info

