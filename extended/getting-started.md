---
title: "Getting started"
source: "https://www.amcharts.com/docs/v5/getting-started/"
scraped: "2026-03-15"
---

During the course of this tutorial we'll get acquainted with the general concepts behind amCharts 5, terminology used, and other things to get you started.

## Installation

amCharts 5 comes in two flavors: as a [JavaScript module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) (ES6) files or as compiled standalone JavaScript files.

Depending on the type of your application, you may need to to grab one or another.

### JavaScript module (ES6)

These are available via NPM or GitHub.

You can use our official npm package `@amcharts/amcharts5` to install amCharts 5 into your application. It will even pull in all the required dependencies.

npm install @amcharts/amcharts5

For those of you using Yarn, you can use its `add` command to install our official npm package:

yarn add @amcharts/amcharts5

### Compiled JavaScript

### CDN

All amCharts 5 standalone JavaScript files are available via our free high-availability CDN service.

Using CDN will eliminate the need to install the library alotgether.

All amCharts libraries and plugins are available as a ready-to-include CDN resources. They are all accessible via `http(s)://cdn.amcharts.com/lib/5/` URL prefix.

<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
<script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
<script src="https://cdn.amcharts.com/lib/5/locales/de\_DE.js"></script>
<script src="https://cdn.amcharts.com/lib/5/geodata/germanyLow.js"></script>
<script src="https://cdn.amcharts.com/lib/5/fonts/notosans-sc.js"></script>

### Download

You can download also standalone ZIP archives containing everything you need to independently run amCharts 5 on our [Downloads page](https://www.amcharts.com/download/).

## Modules

All functionality in amCharts 5 is divvied up into small logical chunks - modules - each representing some set of functionality.

For example, an "xy" module includes everything needed to build `XYChart`.

Modules can be co-dependent on one another. Like for instance, "radar" module (which can be used to build `RadarChart`) requires "xy" module because it reuses some of the functionality from the latter.

### Core module

Just like "radar" module depends on "xy", every single module depends on the "core" module, which needs to be included for anything to work in amCharts 5.

NOTE "core" module must always be imported first - before any other modules.

### Importing in TypeScript / ES6 apps

In an TypeScript or ES6 app, e.g. one created using Angular or React, you would want to import amCharts as a module:

import \* as am5 from "@amcharts/amcharts5";
import \* as am5xy from "@amcharts/amcharts5/xy";

You can name and scope imported modules as you need, but for the sake of simplicity as well as consistency across all code snippets we will be importing "core" module as `am5`, while other modules will take in the `am5[module name]` naming syntax.

NOTEamCharts 5 needs TypeScript 4.3 or later to compile. If you must use earlier version, please use script version of amCharts 5.

### Loading script files

Loading an amCharts 5 module file is done via `<script>` tags in your HTML.

The easiest option is to use our free high-availability CDN server. Just point your `<script>` tags to `https://cdn.amcharts.com/lib/5/....`. E.g.:

<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/xy.js"></script>

CDN URLs will always load the latest version of the library. Version-specific URLs are also available. Refer to our [Downloads page](https://www.amcharts.com/download/) for more details.

Or, you can download, set up and load them from your own web server. E.g.:

<script src="https://www.mywebsite.com/amcharts5/index.js"></script>
<script src="https://www.mywebsite.com/amcharts5/xy.js"></script>

## Creating a chart

### Root element

The central object of each chart starts with a central object. We call it "the root".

The root is super important, as you will need it to create every single object in the chart.

Let's create one right now:

const root = am5.Root.new("chartdiv");

var root = am5.Root.new("chartdiv");

`Root` is part of our `core` package, so we use `am5.*` namespace to access it.

Also notice how we are not creating a `Root` instance using `new [ClassName]` notion, but rather using class' static method `new()`. We will use that for everything in amCharts 5, but more on that later.

Final notice about creating a "root" element, is that we need to pass in an `id` of the `<div>` container we want to put our chart in. The parameter can also accept a reference of the actual element, too.

MORE INFOFor more information, refer to "[Root element](https://www.amcharts.com/docs/v5/getting-started/root-element/)" tutorial.

### New element syntax

As we've just seen, we do not create instances of amCharts 5 classes using conventional `new [Classname]` option.

The following **is wrong** and **should never be used**:

// ERROR: the following will result in error
const root = new am5.Root("chartdiv");

// ERROR: the following will result in error
var root = new am5.Root("chartdiv");

Instead we use class' static method `new()` which will return an instance of the class for us, as well as will take care of other stuff for us.

// SUCCESS: this is correct
const root = am5.Root.new("chartdiv");

// SUCCESS: this is correct
var root = am5.Root.new("chartdiv");

This true not just for `Root` but for every single class in amCharts 5.

The difference from root's `new()` syntax when we create other elements is that instead of taking `<div>` element id, it will take an instance to the the root itself as well as any settings we want to set on the object.

We will see how it works further in this tutorial.

### Chart elements

Now that we have the root element, we can start putting actual stuff in it: chart instance (or even several instances), labels, containers, legends, anything we want.

Root does have a special container element, that we'll push our elements into.

Let's go ahead and create a `PieChart`.

Before we can do that, we will need to import some more packages. Remember how we have each group of functionality in separate modules?

Our "core" package does not include `PieChart` so we will need to import another module "percent".

Incidentally, "percent" module itself relies on another module - "percent".

In TypeScript / ES6 applications we don't need to import these kind of dependencies, because our compiler will do it for us. So we just need to import "core" and "percent" packages:

import \* as am5 from "@amcharts/amcharts5/index";
import \* as am5percent from "@amcharts/amcharts5/percent";

For `<script>` version, we'll need to explicitly load "percent", though:

<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/percent.js"></script>

It's a good time now to recall about the namespaces. Remember how we mentioned that we will namespace each import by its module name?

So whatever comes from "percent" module (or `percent.js`) will be prefixed with `am5percent`.

Now, that we have that out of the way, we can create our chart:

const chart = root.container.children.push(
  am5percent.PieChart.new(
    root, {}
  )
);

var chart = root.container.children.push(
  am5percent.PieChart.new(
    root, {}
  )
);

Let's examine the above.

We create an instance of `PieChart` using its static method `new()`.

Differently than with `Root` element, `new()` method for all other classes take root instance as the first parameter, and an object with key-value pairs to set settings on a newly created object.

Also note how we push newly-created `PieChart` object into `root.container.children`. This ensures that the object will actually appear on screen.

`push()` method returns the instance that was inserted into root's children, so that we can assign it to a variable for later reuse if we need to. This saves us a line of code, but if we wanted, we could create standalone instances, then push later:

const chart = am5percent.PieChart.new(root, {});
root.container.children.push(chart);

var chart = am5percent.PieChart.new(root, {});
root.container.children.push(chart);

### Settings

As we briefly mentioned earlier in this tutorial, our `new()` method allows passing in a second parameter, which is a collection of settings we want to set on the created element. Whatever settings the object will have will be set on the target object as well.

We passed in an empty object when we created `PieChart` because we didn't want to set any settings.

Let's continue building our chart and create a `PieSeries`, which will definitely need some settings set.

const series = chart.series.push(
  am5percent.PieSeries.new(
    root, {
      valueField: "value",
      categoryField: "category"
    }
  )
);

var series = chart.series.push(
  am5percent.PieSeries.new(
    root, {
      valueField: "value",
      categoryField: "category"
    }
  )
);

Examining the above we notice familiar pattern:

-   We create an object instance using `new()` static method.
-   We pass in our root instance as the first parameter.
-   We pass in settings for the object as the second parameter.

Setting settings via `new()` is not the only way to do it. We can do that with object's `set()` (to set single key) or `setAll()` (to set multiple keys in one go) methods as well.

The above can be refactored this:

const series = chart.series.push(
  am5percent.PieSeries.new(root, {})
);
series.set("valueField", "value");
series.set("categoryField", "category");

var series = chart.series.push(
  am5percent.PieSeries.new(root, {})
);
series.set("valueField", "value");
series.set("categoryField", "category");

Or even like this:

const series = chart.series.push(
  am5percent.PieSeries.new(root, {})
);
series.setAll({
  valueField: "value",
  categoryField: "category"
});

var series = chart.series.push(
  am5percent.PieSeries.new(root, {})
);
series.setAll({
  valueField: "value",
  categoryField: "category"
});

All three approaches are correct and will produce identical output.

MORE INFO For more information on this topic please refer to the "[Settings](https://www.amcharts.com/docs/v5/concepts/settings/)" tutorial.

### Data

Data in amCharts 5 is set directly on objects that are its users. In most cases those are series of the chart.

For that objects that use data have a special property, called `data`, which in turn is an object that can be used to supply data, modify it, etc.

The most common method for setting data is its `setAll()` method:

series.data.setAll(\[{
  category: "Research",
  value: 1000
}, {
  category: "Marketing",
  value: 1200
}, {
  category: "Sales",
  value: 850
}\]);

series.data.setAll(\[{
  category: "Research",
  value: 1000
}, {
  category: "Marketing",
  value: 1200
}, {
  category: "Sales",
  value: 850
}\]);

IMPORTANT It's a good practice to make sure that setting data happens as late into code as possible. Once you set data, all related objects are created, so any configuration settings applied afterwards might not carry over.

MORE INFO There's a lot more to data in amCharts 5 than the above. For more information - dynamic data, incremental loads, external data, etc. - refer to our dedicated "[Data](https://www.amcharts.com/docs/v5/concepts/data/)" tutorial.

## Disposing charts

Every element within chart can be disposed using its `dispose()` method.

Please keep in mind, that to completely dispose the whole chart it's not enough to dispose chart element - we need to dispose the root element instead:

root.dispose();

root.dispose();

Trying to create a new root element in a `<div>` container before disposing the old one that is currently residing there, will result in an error.
