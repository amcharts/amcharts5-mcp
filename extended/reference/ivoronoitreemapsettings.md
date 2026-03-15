---
title: "IVoronoiTreemapSettings"
type: "interface"
source: "https://www.amcharts.com/docs/v5/reference/ivoronoitreemapsettings/"
scraped: "2026-03-15"
---

Inheritance
IVoronoiTreemapSettings extends IHierarchySettings.
IVoronoiTreemapSettings is not extended by any other symbol.
Properties


        active        
        #
      


                          Type undefined | false | true                      
Inherited from ISpriteSettings
Indicates if element is currently active.


        animationDuration        
        #
      


                          Type undefined | number                      
Inherited from IHierarchySettings
Duration for all drill animations in milliseconds.


        animationEasing        
        #
      


                          Type Easing                      
Inherited from IHierarchySettings
An easing function to use for drill animations.


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

Extends: IHierarchySettings

> **Note:** This class also inherits all settings, properties, methods, and events from IHierarchySettings (and its ancestors). Use `get_doc` or `get_core_reference` with the parent class name to see inherited members.

## Properties

- **convergenceRatio** (`undefined | number`) — Default 0.005 The convergence ratio in Voronoi treemaps measures how well the treemap layout represents the hierarchical structure of the underlying data. It is calculated as the ratio of the summed area of the smallest enclosing rectangle for each cell to the total area of the treemap. A lower convergence ratio indicates a better representation of the hierarchy, meaning that the cells are closely packed and the treemap effectively captures the nested relationships between the data elements.
- **cornerCount** (`undefined | number`) — Default 120 Number of corners when type is "polygon". 120 means the polygoon will look like a circle. NOTE: this setting is ignored if type="rectangle".
- **maxIterationCount** (`undefined | number`) — Default 100 Maximum allowed number of iterations when computing the layout. Computation is stopped when it number of iterations is reached, even if the convergenceRatio is not yet reached. Bigger number means finer results, but slower performance.
- **minWeightRatio** (`undefined | number`) — Default 0.005 Minimum weight ratio which allows computing the minimum allowed weight (= [maximum weight] * minWeightRatio). Setting very small minWeigtRatio might result flickering. NOTE: the nodes that have smaller weight will be scaled up and will not represent their true value correctly.
- **type** (`"rectangle" | "polygon"`) — Default "polygon" Type of the diagram's shape. Click here for more info
