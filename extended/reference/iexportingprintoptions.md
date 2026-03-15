---
title: "IExportingPrintOptions"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/iexportingprintoptions/"
scraped: "2026-03-15"
---

Inheritance
IExportingPrintOptions extends IExportingImageOptions.
IExportingPrintOptions is not extended by any other symbol.
Properties


        delay        
        #
      


                          Type undefined | number                      
Default 500

A delay in milliseconds to wait before initiating print.
 This delay is necessary to ensure DOM is prepared and repainted before print dialog kicks in.


        disabled        
        #
      


                          Type undefined | false | true                      
Inherited from IExportingFormatOptions
If set to true, this format will not appear in ExportMenu.


        imageFormat        
        #
      


                          Type "png" | "jpg"                      
Default "png"

Image format to use for printing.


        maintainPixelRatio        
        #
      


                          Type undefined | false | true                      
Default false

Inherited from IExportingImageOptions
Export images with hardware resolution (false), or the way they appear on screen (true).

## Inheritance

Extends: IExportingImageOptions

> **Note:** This class also inherits all settings, properties, methods, and events from IExportingImageOptions (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **delay** (`undefined | number`) — Default 500 A delay in milliseconds to wait before initiating print. This delay is necessary to ensure DOM is prepared and repainted before print dialog kicks in.
- **imageFormat** (`"png" | "jpg"`) — Default "png" Image format to use for printing.
- **printMethod** (`"css" | "iframe"`) — Default "iframe" Method to use for printing. If one fails for your particular setup, try the other. "css" - inserts dynamic CSS that hides everything, except the image being printed. "iframe" - creates a dynamic <iframe> with the image, then prints it.
