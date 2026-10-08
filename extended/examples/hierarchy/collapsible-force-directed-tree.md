---
title: "Collapsible Force-Directed Tree"
source: "https://www.amcharts.com/demos/collapsible-force-directed-tree/"
category: "hierarchy"
scraped: "2026-10-08"
---

A force-directed tree links bubbles with lines and lets them push and pull until they settle. This one maps the flavors of coffee, from families like Fruity down to single notes, and opens a branch when you click it.

When to fold a tree: A big hierarchy shown all at once turns into a hairball. Starting folded shows the main groups first, and each click opens just the branch someone cares about, so the picture grows with their interest. A dashed outline marks a bubble with more inside.

Good for:
- Flavor wheels, taxonomies and skill maps
- Exploring a big hierarchy step by step
- Talks that reveal detail as they go

Think twice when:
- Readers who need every level: a tree chart shows it all in order
- Exact sizes: bubbles are hard to compare
- Printed pages, where nothing opens

Prompt: Create a collapsible force-directed tree of the coffee taster’s flavor wheel, with bubbles sized by how many flavors they hold. Show the first two levels at first; clicking a bubble opens the levels below it, or folds it. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

var data = {
  value: 0,
  children: [
    {
      name: "Floral",
      children: [
        {
          name: "Black Tea",
          value: 1
        },
        {
          name: "Floral",
          children: [
            {
              name: "Chamomile",
              value: 1
            },
            {
              name: "Rose",
              value: 1
            },
            {
              name: "Jasmine",
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: "Fruity",
      children: [
        {
          name: "Berry",
          children: [
            {
              name: "Blackberry",
              value: 1
            },
            {
              name: "Raspberry",
              value: 1
            },
            {
              name: "Blueberry",
              value: 1
            },
            {
              name: "Strawberry",
              value: 1
            }
          ]
        },
        {
          name: "Dried Fruit",
          children: [
            {
              name: "Raisin",
              value: 1
            },
            {
              name: "Prune",
              value: 1
            }
          ]
        },
        {
          name: "Other Fruit",
          children: [
            {
              name: "Coconut",
              value: 1
            },
            {
              name: "Cherry",
              value: 1
            },
            {
              name: "Pomegranate",
              value: 1
            },
            {
              name: "Pineapple",
              value: 1
            },
            {
              name: "Grape",
              value: 1
            },
            {
              name: "Apple",
              value: 1
            },
            {
              name: "Peach",
              value: 1
            },
            {
              name: "Pear",
              value: 1
            }
          ]
        },
        {
          name: "Citrus Fruit",
          children: [
            {
              name: "Grapefruit",
              value: 1
            },
            {
              name: "Orange",
              value: 1
            },
            {
              name: "Lemon",
              value: 1
            },
            {
              name: "Lime",
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: "Sour/Fermented",
      children: [
        {
          name: "Sour",
          children: [
            {
              name: "Sour Aromatics",
              value: 1
            },
            {
              name: "Acetic Acid",
              value: 1
            },
            {
              name: "Butyric Acid",
              value: 1
            },
            {
              name: "Isovaleric Acid",
              value: 1
            },
            {
              name: "Citric Acid",
              value: 1
            },
            {
              name: "Malic Acid",
              value: 1
            }
          ]
        },
        {
          name: "Alcohol/Fermented",
          children: [
            {
              name: "Winey",
              value: 1
            },
            {
              name: "Whiskey",
              value: 1
            },
            {
              name: "Fermented",
              value: 1
            },
            {
              name: "Overripe",
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: "Green/Vegetative",
      children: [
        {
          name: "Olive Oil",
          value: 1
        },
        {
          name: "Raw",
          value: 1
        },
        {
          name: "Green/Vegetative",
          children: [
            {
              name: "Under-ripe",
              value: 1
            },
            {
              name: "Peapod",
              value: 1
            },
            {
              name: "Fresh",
              value: 1
            },
            {
              name: "Dark Green",
              value: 1
            },
            {
              name: "Vegetative",
              value: 1
            },
            {
              name: "Hay-like",
              value: 1
            },
            {
              name: "Herb-like",
              value: 1
            }
          ]
        },
        {
          name: "Beany",
          value: 1
        }
      ]
    },
    {
      name: "Other",
      children: [
        {
          name: "Papery/Musty",
          children: [
            {
              name: "Stale",
              value: 1
            },
            {
              name: "Cardboard",
              value: 1
            },
            {
              name: "Papery",
              value: 1
            },
            {
              name: "Woody",
              value: 1
            },
            {
              name: "Moldy/Damp",
              value: 1
            },
            {
              name: "Musty/Dusty",
              value: 1
            },
            {
              name: "Musty/Earthy",
              value: 1
            },
            {
              name: "Animalic",
              value: 1
            },
            {
              name: "Meaty Brothy",
              value: 1
            },
            {
              name: "Phenolic",
              value: 1
            }
          ]
        },
        {
          name: "Chemical",
          children: [
            {
              name: "Bitter",
              value: 1
            },
            {
              name: "Salty",
              value: 1
            },
            {
              name: "Medicinal",
              value: 1
            },
            {
              name: "Petroleum",
              value: 1
            },
            {
              name: "Skunky",
              value: 1
            },
            {
              name: "Rubber",
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: "Roasted",
      children: [
        {
          name: "Pipe Tobacco",
          value: 1
        },
        {
          name: "Tobacco",
          value: 1
        },
        {
          name: "Burnt",
          children: [
            {
              name: "Acrid",
              value: 1
            },
            {
              name: "Ashy",
              value: 1
            },
            {
              name: "Smoky",
              value: 1
            },
            {
              name: "Brown, Roast",
              value: 1
            }
          ]
        },
        {
          name: "Cereal",
          children: [
            {
              name: "Grain",
              value: 1
            },
            {
              name: "Malt",
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: "Spices",
      children: [
        {
          name: "Pungent",
          value: 1
        },
        {
          name: "Pepper",
          value: 1
        },
        {
          name: "Brown Spice",
          children: [
            {
              name: "Anise",
              value: 1
            },
            {
              name: "Nutmeg",
              value: 1
            },
            {
              name: "Cinnamon",
              value: 1
            },
            {
              name: "Clove",
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: "Nutty/Cocoa",
      children: [
        {
          name: "Nutty",
          children: [
            {
              name: "Peanuts",
              value: 1
            },
            {
              name: "Hazelnut",
              value: 1
            },
            {
              name: "Almond",
              value: 1
            }
          ]
        },
        {
          name: "Cocoa",
          children: [
            {
              name: "Chocolate",
              value: 1
            },
            {
              name: "Dark Chocolate",
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: "Sweet",
      children: [
        {
          name: "Brown Sugar",
          children: [
            {
              name: "Molasses",
              value: 1
            },
            {
              name: "Maple Syrup",
              value: 1
            },
            {
              name: "Caramelized",
              value: 1
            },
            {
              name: "Honey",
              value: 1
            }
          ]
        },
        {
          name: "Vanilla",
          value: 1
        },
        {
          name: "Vanillin",
          value: 1
        },
        {
          name: "Overall Sweet",
          value: 1
        },
        {
          name: "Sweet Aromatics",
          value: 1
        }
      ]
    }
  ]
};

// Create wrapper container
var chart = root.container.children.push(am5.SerialChartContainer.new(root, {
  width: am5.percent(100), // the container fills the whole chart area
  height: am5.percent(100),
  layout: root.verticalLayout
}));

// Create series
// https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
var series = chart.series.push(am5hierarchy.ForceDirected.new(root, {
  singleBranchOnly: false, // opening a node leaves the other branches open
  // a click opens two levels; the unnamed root is hidden and only the main flavors show at first
  downDepth: 2,
  topDepth: 1,
  initialDepth: 1,
  valueField: "value",
  categoryField: "name",
  childDataField: "children",
  idField: "name",
  linkWithField: "linkWith", // extra links to the nodes named in a node's linkWith
  // the nodes push each other apart less and are pulled to the center harder than by default
  manyBodyStrength: -10,
  centerStrength: 0.8
}));

series.get("colors").setAll({
  step: 2 // skip every other color, so neighboring branches differ more
});

series.links.template.set("strength", 0.5); // links pull their nodes together half as hard as by default

// A soft shadow under each circle
series.circles.template.setAll({
  shadowColor: am5.color(0x000000),
  shadowOpacity: 0.3,
  shadowBlur: 6,
  shadowOffsetX: 2,
  shadowOffsetY: 2
});

// The tooltip names the flavor: the smallest circles are too small for a label
series.nodes.template.set("tooltipText", "{category}");

series.data.setAll([data]);

series.set("selectedDataItem", series.dataItems[0]); // start at the top of the tree

// Make stuff animate on load
series.appear(1000, 100);
```

## HTML

```html
<div id="chartdiv"></div>
```

## CSS

```css
#chartdiv {
  width: 100%;
  height: 500px;
  font-size: 0.875rem;
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/hierarchy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
