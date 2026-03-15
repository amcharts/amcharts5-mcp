---
title: "IExportingPDFOptions"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iexportingpdfoptions/"
scraped: "2026-03-15"
---

Inheritance
IExportingPDFOptions extends IExportingImageOptions.
IExportingPDFOptions is not extended by any other symbol.
Properties


        addURL        
        #
      


                          Type undefined | false | true                      
Default true

Whether to add a URL of the web page the chart has been exported from.


        align        
        #
      


                          Type "left" | "center" | "middle"                      
Default left

Alignment of the chart image in PDF.
 Supported options: "left" (default), "center", "right".


        disabled        
        #
      


                          Type undefined | false | true                      
Inherited from IExportingFormatOptions
If set to true, this format will not appear in ExportMenu.


        extraFonts        
        #
      


                          Type Array                      
Additional optional fonts which can be used on individual elements.

## Inheritance

Extends: IExportingImageOptions

> **Note:** This class also inherits all settings, properties, methods, and events from IExportingImageOptions (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **addURL** (`undefined | false | true`) — Default true Whether to add a URL of the web page the chart has been exported from.
- **align** (`"left" | "center" | "middle"`) — Default left Alignment of the chart image in PDF. Supported options: "left" (default), "center", "right".
- **extraFonts** (`Array`) — Additional optional fonts which can be used on individual elements. Click here for more info
- **font** (`IFont`) — Font which should be used for the export. Default font used for PDF includes only Latin-based and Cyrilic characters. If you are exporting text in other languages, you might need to use some other export font. Click here for more info
- **fontSize** (`undefined | number`) — Font size to use for all texts.
- **imageFormat** (`"png" | "jpg"`) — An image format to use for embedded images in PDF. See imageFormats in Export_module.
- **includeData** (`undefined | false | true`) — Include data into PDF
- **pageMargins** (`number | number[]`) — Page margins. Can be one of the following: A single number, in which case it will act as margin setting for all four edges of the page. An array of two numbers [ horizontal, vertical ]. An array of four numbers [ left, top, right, bottom ].
- **pageOrientation** (`"landscape" | "portrait"`) — Page orientation.
- **pageSize** (`pageSizes`) — Page size of the exported PDF.
