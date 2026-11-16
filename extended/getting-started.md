---
title: "Getting started"
source: "https://docs.amcharts.com/v5/getting-started/"
scraped: "2026-11-16"
---

During the course of this tutorial we'll get acquainted with the general concepts behind amCharts 5, terminology used, and other things to get you started.

## Installation

amCharts 5 comes in two flavors: as [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) (ES6) or as compiled standalone JavaScript files.

Depending on the type of your application, you may need to grab one or another.

### JavaScript module (ES6)

These are available via npm or GitHub.

You can use our official npm package `@amcharts/amcharts5` to install amCharts 5 into your application. It will even pull in all the required dependencies.

```sh
npm install @amcharts/amcharts5
```

For those of you using Yarn, you can use its `add` command to install our official npm package:

```sh
yarn add @amcharts/amcharts5
```

#### Bundling

Keep code splitting on when you bundle amCharts. Most bundlers, such as webpack and Vite, do it by default.

The exporting plugin loads its PDF, Excel and annotation code (pdfmake, xlsx and markerjs2) only when needed. So do the parts that can reach it: the stock toolbar's drawing and indicator controls, [`<am5-chart>`](https://docs.amcharts.com/v5/getting-started/integrations/am5-chart-element/) and the JSON plugin. A single-file bundle, e.g. an IIFE build or esbuild without `splitting`, takes that code in up front, about 1 MB more gzipped. It also does when the whole stock module is kept, e.g. `import * as am5stock` assigned to `window`. A stock chart without those controls doesn't.

### Compiled JavaScript

Standalone files that you load with `<script>` tags, either from a CDN or from your own server.

#### CDN

All amCharts 5 standalone JavaScript files are available via our free high-availability CDN service.

Using CDN will eliminate the need to install the library altogether.

All amCharts libraries and plugins are available as a ready-to-include CDN resources. They are all accessible via `http(s)://cdn.amcharts.com/lib/5/` URL prefix.

```html
<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
<script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
<script src="https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js"></script>
<script src="https://cdn.amcharts.com/lib/5/locales/de_DE.js"></script>
<script src="https://cdn.amcharts.com/lib/5/geodata/germanyLow.js"></script>
<script src="https://cdn.amcharts.com/lib/5/fonts/notosans-sc.js"></script>
```

amCharts 5 is also available on [cdnjs](https://cdnjs.com/libraries/amcharts5) and jsDelivr (`https://cdn.jsdelivr.net/gh/amcharts/amcharts5-dist@5/`), with the same file layout. Use them where only well-known public CDNs are allowed, such as sites with a strict Content Security Policy, or AI chat sandboxes (e.g. Claude artifacts), which allow cdnjs:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/amcharts5/5.22.0/index.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/amcharts5/5.22.0/xy.js"></script>
```

> **More info:** For what each CDN includes, see "[Public CDNs](https://www.amcharts.com/download/#public-cdn)" on our Downloads page.

#### npm package

Since version 5.22.0, the npm package `@amcharts/amcharts5` has the same files in its `dist/` folder. Load them from your own `node_modules`, or from an npm CDN (jsDelivr or unpkg). Use this when:

* You install amCharts from npm but load it with `<script>` tags, without a bundler.
* A sandbox or online code editor allows npm CDNs but not ours. AI chat sandboxes such as Claude artifacts also allow cdnjs, but it has only low-detail maps; unpkg has every map.

```html
<script src="https://cdn.jsdelivr.net/npm/@amcharts/amcharts5@5.22.0/dist/index.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@amcharts/amcharts5@5.22.0/dist/xy.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@amcharts/amcharts5@5.22.0/dist/themes/Animated.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@amcharts/amcharts5@5.22.0/dist/themes/ResponsiveMax.js"></script>
```

| Source         | URL prefix                                                      |
| -------------- | --------------------------------------------------------------- |
| `node_modules` | `/node_modules/@amcharts/amcharts5/dist/`                       |
| jsDelivr       | `https://cdn.jsdelivr.net/npm/@amcharts/amcharts5@5.22.0/dist/` |
| unpkg          | `https://unpkg.com/@amcharts/amcharts5@5.22.0/dist/`            |

* Pin the version and load every file from the same one.
* Use plain `<script>` tags, not `type="module"`. The exporting plugin's PDF, Excel and annotation code loads on first use from the `deps/` folder next to `index.js`, wherever that is served from.
* Load order is the same as on our CDN: `index.js` first.
* Two maps are included: `geodata/worldLow.js` (`am5geodata_worldLow`) and `geodata/usaLow.js` (`am5geodata_usaLow`). All maps are in the `@amcharts/amcharts5-geodata` package's `dist/`, which loads from unpkg but not jsDelivr (the package is over jsDelivr's size limit): `https://unpkg.com/@amcharts/amcharts5-geodata@5.2.0/dist/germanyLow.js`. See "[Geodata (maps)](https://docs.amcharts.com/v5/charts/map-chart/#geodata-maps)".
* Fonts for PDF export aren't included. With `<script>` tags, load them from our CDN, e.g. `https://cdn.amcharts.com/lib/5/fonts/notosans-sc.js`. The `@amcharts/amcharts5-fonts` package has them for bundlers.

#### Download

You can also download standalone ZIP archives containing everything you need to run amCharts 5 on your own server from our [Downloads page](https://www.amcharts.com/download/).

### What's included

Besides the library itself, both the npm package and the ZIP download include:

* **Examples** - ready-made charts of every type, with comments explaining most settings. In the ZIP download, open `examples/index.html` for a gallery that shows each chart above its source code, drawn on canvas or as SVG. In the npm package, they come as plain source files (`examples/<name>/index.ts`).
* **Docs for AI coding agents** - an `AGENTS.md` file and a `docs/` folder with a reference for every chart type. Tools like Claude Code, Cursor, or Copilot can read them, so they work from docs that match the version you installed.

> **More info:** For more on using AI to build charts, see "[amCharts + AI](https://docs.amcharts.com/v5/ai/)". In Claude and ChatGPT, the amCharts 5 plugin ([Claude](https://docs.amcharts.com/v5/ai/#the-amcharts-5-plugin-for-claude), [ChatGPT](https://docs.amcharts.com/v5/ai/#the-amcharts-5-plugin-for-chatgpt)) adds our skill and MCP server in one step.

## Modules

All functionality in amCharts 5 is divvied up into small logical chunks - modules - each representing some set of functionality.

For example, an "xy" module includes everything needed to build `XYChart`.

Modules can depend on one another. For instance, the "radar" module (used to build `RadarChart`) requires the "xy" module, because it reuses some of its functionality.

### Core module

Just like "radar" module depends on "xy", every single module depends on the "core" module, which needs to be included for anything to work in amCharts 5.

> **Note:** "core" module must always be imported first - before any other modules.

### Importing in TypeScript / ES6 apps

In a TypeScript or ES6 app, e.g. one created using Angular or React, you would want to import amCharts as a module:

```ts
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
```

You can name and scope imported modules as you need, but for the sake of simplicity as well as consistency across all code snippets we will be importing "core" module as `am5`, while other modules will take in the `am5[module name]` naming syntax.

> **Note:** amCharts 5 type definitions need TypeScript 5.0 or later. With an older TypeScript, use the script version of amCharts 5.

> **More info:** For React, Vue, Angular, Svelte and React Native there are packages that create and dispose the chart with your component. See "[Integrations](https://docs.amcharts.com/v5/getting-started/integrations/)".

### Loading script files

Loading an amCharts 5 module file is done via `<script>` tags in your HTML.

The easiest option is to use our free high-availability CDN server. Just point your `<script>` tags to `https://cdn.amcharts.com/lib/5/....`. E.g.:

```html
<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/xy.js"></script>
```

CDN URLs will always load the latest version of the library. Version-specific URLs are also available, as well as public CDNs (cdnjs, jsDelivr). Refer to our [Downloads page](https://www.amcharts.com/download/) for more details. The npm package has the same files: see "[npm package](https://docs.amcharts.com/v5/getting-started/#npm-package)".

Or, you can download, set up and load them from your own web server. E.g.:

```html
<script src="https://www.mywebsite.com/amcharts5/index.js"></script>
<script src="https://www.mywebsite.com/amcharts5/xy.js"></script>
```

> **Note:** Load `index.js` (core) first, then the modules that depend on it, e.g. `xy.js` before `radar.js`.

## Creating a chart

### Root element

Every chart starts with a central object. We call it "the root".

The root is super important, as you will need it to create every single object in the chart.

Let's create one right now:

TypeScript:

```ts
const root = am5.Root.new("chartdiv");
```

JavaScript:

```js
var root = am5.Root.new("chartdiv");
```

`Root` is part of our `core` package, so we use `am5.*` namespace to access it.

Also notice how we are not creating a `Root` instance using `new [ClassName]` notation, but rather using class' static method `new()`. We will use that for everything in amCharts 5, but more on that later.

Finally, we need to pass in an `id` of the `<div>` container we want to put our chart in. The parameter can also accept a reference to the actual element.

The container needs to have a height. The chart fills its container, so a `<div>` with no height will result in an empty chart:

```html
<div id="chartdiv" style="width: 100%; height: 500px;"></div>
```

Then apply the `Animated` and `ResponsiveMax` [themes](https://docs.amcharts.com/v5/concepts/themes/), as in every chart. `Animated` turns on animations. `ResponsiveMax` fits the chart to the room it has, e.g. on a phone:

TypeScript:

```ts
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_ResponsiveMax.new(root)
]);
```

JavaScript:

```js
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_ResponsiveMax.new(root)
]);
```

> **More info:** For more information, refer to "[Root element](https://docs.amcharts.com/v5/getting-started/root-element/)" tutorial.

### New element syntax

As we've just seen, we do not create instances of amCharts 5 classes using conventional `new [Classname]` option.

The following **is wrong** and **should never be used**:

TypeScript:

```ts
// ERROR: the following will result in error
const root = new am5.Root("chartdiv");
```

JavaScript:

```js
// ERROR: the following will result in error
var root = new am5.Root("chartdiv");
```

Instead we use class' static method `new()`, which creates the instance and sets it up properly.

TypeScript:

```ts
// SUCCESS: this is correct
const root = am5.Root.new("chartdiv");
```

JavaScript:

```js
// SUCCESS: this is correct
var root = am5.Root.new("chartdiv");
```

This is true not just for `Root` but for every single class in amCharts 5.

The difference from root's `new()` syntax when we create other elements is that instead of taking `<div>` element id, it will take the root instance itself, as well as any settings we want to set on the object.

We will see how it works further in this tutorial.

### Chart elements

Now that we have the root element, we can start putting actual stuff in it: chart instance (or even several instances), labels, containers, legends, anything we want.

Root has a special container element that we'll push our elements into.

Let's go ahead and create a `PieChart`.

Before we can do that, we will need to import some more packages. Remember how we have each group of functionality in separate modules?

Our "core" package does not include `PieChart` so we will need to import another module "percent".

In TypeScript / ES6 applications we import "core" and "percent" packages:

```ts
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
```

For `<script>` version, we load the matching files:

```html title="JavaScript"
<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/percent.js"></script>
```

It's a good time now to recall about the namespaces. Remember how we mentioned that we will namespace each import by its module name?

So whatever comes from "percent" module (or `percent.js`) will be prefixed with `am5percent`.

Now, that we have that out of the way, we can create our chart:

TypeScript:

```ts
const chart = root.container.children.push(
  am5percent.PieChart.new(
    root, {}
  )
);
```

JavaScript:

```js
var chart = root.container.children.push(
  am5percent.PieChart.new(
    root, {}
  )
);
```

Let's examine the above.

We create an instance of `PieChart` using its static method `new()`.

Unlike with `Root` element, `new()` method for all other classes takes root instance as the first parameter, and an object with key-value pairs to set settings on a newly created object.

Also note how we push newly-created `PieChart` object into `root.container.children`. This ensures that the object will actually appear on screen.

`push()` method returns the instance that was inserted into root's children, so that we can assign it to a variable for later reuse if we need to. This saves us a line of code, but if we wanted, we could create standalone instances, then push later:

TypeScript:

```ts
const chart = am5percent.PieChart.new(root, {});
root.container.children.push(chart);
```

JavaScript:

```js
var chart = am5percent.PieChart.new(root, {});
root.container.children.push(chart);
```

### Settings

As we briefly mentioned earlier in this tutorial, our `new()` method allows passing in a second parameter: an object with settings for the newly created element.

We passed in an empty object when we created `PieChart` because we didn't want to set any settings.

Let's continue building our chart and create a `PieSeries`, which will definitely need some settings set.

TypeScript:

```ts
const series = chart.series.push(
  am5percent.PieSeries.new(
    root, {
      valueField: "value",
      categoryField: "category"
    }
  )
);
```

JavaScript:

```js
var series = chart.series.push(
  am5percent.PieSeries.new(
    root, {
      valueField: "value",
      categoryField: "category"
    }
  )
);
```

Examining the above we notice familiar pattern:

* We create an object instance using `new()` static method.
* We pass in our root instance as the first parameter.
* We pass in settings for the object as the second parameter.

Setting settings via `new()` is not the only way to do it. We can do that with object's `set()` (to set single key) or `setAll()` (to set multiple keys in one go) methods as well.

The above can be refactored like this:

TypeScript:

```ts
const series = chart.series.push(
  am5percent.PieSeries.new(root, {})
);
series.set("valueField", "value");
series.set("categoryField", "category");
```

JavaScript:

```js
var series = chart.series.push(
  am5percent.PieSeries.new(root, {})
);
series.set("valueField", "value");
series.set("categoryField", "category");
```

Or even like this:

TypeScript:

```ts
const series = chart.series.push(
  am5percent.PieSeries.new(root, {})
);
series.setAll({
  valueField: "value",
  categoryField: "category"
});
```

JavaScript:

```js
var series = chart.series.push(
  am5percent.PieSeries.new(root, {})
);
series.setAll({
  valueField: "value",
  categoryField: "category"
});
```

All three approaches are correct and will produce identical output.

> **More info:** For more information on this topic please refer to the "[Settings](https://docs.amcharts.com/v5/concepts/settings/)" tutorial.

### Data

Data in amCharts 5 is set directly on the objects that use it. In most cases those are series of the chart.

Objects that use data have a special property, called `data`, which can be used to supply data, modify it, etc.

The most common method for setting data is its `setAll()` method:

TypeScript:

```ts
series.data.setAll([{
  category: "Research",
  value: 1000
}, {
  category: "Marketing",
  value: 1200
}, {
  category: "Sales",
  value: 850
}]);
```

JavaScript:

```js
series.data.setAll([{
  category: "Research",
  value: 1000
}, {
  category: "Marketing",
  value: 1200
}, {
  category: "Sales",
  value: 850
}]);
```

> **Important:** It's a good practice to make sure that setting data happens as late into code as possible. Once you set data, all related objects are created, so any configuration settings applied afterwards might not carry over.

> **More info:** There's a lot more to data in amCharts 5 than the above. For more information - dynamic data, incremental loads, external data, etc. - refer to our dedicated "[Data](https://docs.amcharts.com/v5/concepts/data/)" tutorial.

### Complete example

Here's everything from above put together in a single HTML page:

```html
<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/percent.js"></script>
<script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
<script src="https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js"></script>

<div id="chartdiv" style="width: 100%; height: 500px;"></div>

<script>
var root = am5.Root.new("chartdiv");
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_ResponsiveMax.new(root)
]);

var chart = root.container.children.push(
  am5percent.PieChart.new(root, {})
);

var series = chart.series.push(
  am5percent.PieSeries.new(root, {
    valueField: "value",
    categoryField: "category"
  })
);

series.data.setAll([
  { category: "Research", value: 1000 },
  { category: "Marketing", value: 1200 },
  { category: "Sales", value: 850 }
]);
</script>
```

> **More info:** A chart can also be described as a JSON config and put on a page as an HTML element, without any chart code. See "[The \<am5-chart> element](https://docs.amcharts.com/v5/getting-started/integrations/am5-chart-element/)".

## Disposing charts

Every element within a chart can be disposed using its `dispose()` method.

Please keep in mind, that to completely dispose the whole chart it's not enough to dispose chart element - we need to dispose the root element instead:

TypeScript:

```ts
root.dispose();
```

JavaScript:

```js
root.dispose();
```

Trying to create a new root element in a `<div>` container before disposing the old one that is currently residing there, will result in an error.

> **Note:** Our [integration packages](https://docs.amcharts.com/v5/getting-started/integrations/) for React, Vue, Angular, Svelte and React Native create and dispose the root for you.
