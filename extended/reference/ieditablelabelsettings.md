---
title: "IEditableLabelSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ieditablelabelsettings/"
scraped: "2026-03-15"
---

Inheritance
IEditableLabelSettings extends ILabelSettings.
IEditableLabelSettings is extended by IEditableAxisLabelSettings.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        ariaChecked        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
aria-checked setting.
 This setting is ignored unless role is one of the following:

"checkbox"

"option"

"radio"

"menuitemcheckbox"

"menuitemradio"

"treeitem"


        ariaControls        
        #
      


                          Type undefined | string                      
Inherited from ISpriteSettings
aria-controls setting.


        ariaCurrent        
        #
      


                          Type undefined | string                      
Inherited from ISpriteSettings
aria-current setting.

## Inheritance

Extends: ILabelSettings
Extended by: IEditableAxisLabelSettings

> **Note:** This class also inherits all settings, properties, methods, and events from ILabelSettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **editOn** (`"click" | "dblclick" | "rightclick" | "middleclick" | "none"`) — Default "click" Start editing on click ("click"; default) or double-click ('"dblclick"'). All available options: "click" (default) "dblclick" "rightclick" "middleclick" "none"
- **multiLine** (`undefined | false | true`) — Default true Allow multiple lines (true - dfault) or no (false). @since 5.9.6
