<!--
reference-notes.md — hand-written facts merged into the generated API reference
by scripts/generate-reference.cjs (npm run build:reference).

Use it ONLY for facts the library's TSDoc lacks; everything else comes from the
installed @amcharts/amcharts5 package. Verify each fact in the source at the
release tag before adding it, and delete a note once the TSDoc covers it.

Format (each block runs until the next "## " heading; the prefix is required):

  ## member: Owner.member
      A note appended to that member's row, wherever the row is rendered in
      full. Owner is the interface or class that DECLARES the member
      (e.g. ISeriesSettings.urlField). One paragraph.
  ## page: Title
      Markdown appended to the page with that title as a "## Notes" section.
      Titles may contain dots (e.g. "## page: ease.byName"). Use "###" for
      sub-headings inside it.
  ## @since
      Lines that override a wrong @since tag in the typings:
        - member: Owner.member = x.y.z
        - page: Title = x.y.z

The generator warns about any note whose target it does not find, and about
any heading or @since line it does not recognize.
-->

## @since

- member: ISerializerSettings.runningAnimations = 5.20.8
- member: IXYChartSettings.strokeWidths = 5.20.0
- member: IXYChartSettings.strokeDasharrays = 5.20.0

## member: ISeriesSettings.urlField

Linked elements: bullet sprites of every series, `BaseColumnSeries` columns (column, candlestick, OHLC, Gantt…), `PercentSeries` slices (pie, funnel, pyramid, pictorial), Venn slices, `MapPolygon` (also NightSeries polygons) and `MapLine` — not hierarchy nodes, flow nodes/links, word-cloud labels or MapSankey nodes. A linked element gets `cursorOverStyle: "pointer"` unless you set one yourself. Script URLs (`javascript:`, `data:`, `vbscript:`) are never opened. Can be set after the data; a URL added later (e.g. `data.setIndex()`) links too. Clicks go through the public `series.openUrl(dataItem)` method — override it to intercept links.

## member: ISeriesSettings.linkTarget

`"_blank"` opens the page with `noopener`.

## member: ISeriesDataItem.url

Filled from data by the series' `urlField`; opened in the series' `linkTarget`.

## member: ISerializerSettings.runningAnimations

Such an animation (`loops: Infinity` with a named easing) is written as an `animations` entry `{ key, from, to, duration, loops: 0, easing?, ease?, yoyo? }` (see IDeclaredAnimation), and the setting it animates is left out of the saved settings. Easings `am5.ease.easingInfo()` cannot name — e.g. one made with `am5.ease.pow`, or `am5.ease.out(am5.ease.yoyo(x))` — are not written. ChartSerializer also writes an endless animation of a bullet's data item value (e.g. `dataItem.animate({ key: "positionOnLine", loops: Infinity, … })`) on the bullet sprite, as an entry with `target: "dataItem"` (5.21.0; 5.20.8 did not). Turn it off with `am5plugins_json.ChartSerializer.new(root, { runningAnimations: false })`.

## member: ISerializerSettings.excludeSettings

ChartSerializer sets a default list; setting `excludeSettings` replaces that list rather than adding to it.

## member: IChartSerializerSettings.includeRoot

The `root` section holds the Root's `utc`, `fps`, `numberFormatter`, `dateFormatter`, `durationFormatter`, `tabindex` and `interfaceColors`; JsonParser applies it before parsing the chart.

## member: IMapPointSeriesSettings.lineIdField

The line is looked up by its data `id` in the chart's MapLineSeries. With this and `positionOnLineField`, points on lines can come from data rows instead of `pushDataItem({ lineDataItem, positionOnLine })`, so a serialized config keeps them.

## member: IMapPointSeriesSettings.autoRotateField

A value from data wins over the bullet's `autoRotate`.

## member: IMapPointSeriesSettings.autoRotateAngleField

A value from data wins over the bullet's `autoRotateAngle`.

## member: IMapPointSeriesDataItem.autoRotate

When set, wins over the bullet's `autoRotate`.

## member: IMapPointSeriesDataItem.autoRotateAngle

When set, wins over the bullet's `autoRotateAngle`.

## page: IMapPointSeriesDataItem

Since 5.20.6, `lineId`, `positionOnLine`, `autoRotate` and `autoRotateAngle` can be given in data rows (read via the series' `lineIdField`, `positionOnLineField`, `autoRotateField` and `autoRotateAngleField`, which default to those names), e.g. `{ lineId: "jfk-lhr", positionOnLine: 0.5, autoRotate: true }`. `polygonIdField` has no default and must be set for `polygonId` to be read from data.

## member: IWordCloudSettings.angles

Any angles work since 5.20.1 (e.g. `[0, -30, -45]`); earlier versions handled only 0, 90 and -90. An overly wide word may still be turned to 0 or ±90 for a better fit, but only to a value present in `angles`.

## page: IWordCloudSettings

### Breaking change in 5.20.1

The WordCloud layout is computed synchronously in a single pass instead of one word per animation frame — much faster for large clouds. The per-data-item `ghostLabel` was removed and labels are held in an internal container, so code reading `dataItem.get("ghostLabel")` or walking `series.children` for labels needs updating. Use `series.labels` (a `ListTemplate<Label>`) or `dataItem.get("label")` instead.

A `series.shape` (`Graphics`) element draws the `svgPath` outline behind the words. Its geometry and `forceHidden` are managed by the series — only `fill`/`stroke` styling is yours to set.

## member: IVoronoiTreemapSettings.shapeType

Renamed from `type` in 5.18.0 (`type` still works).

## member: IMovingAverageSettings.type

Deprecated since 5.18.0: use `maType`.

## member: IMovingAverageDeviationSettings.type

Deprecated since 5.18.0: use `maType`.

## member: SerialChartContainer.zoomableContainer

Theme tag `serialchartcontainer`: the default theme sets `wheelable: false`, `pinchZoom: false` and `maskContent: true` on it.

## member: MapChart.boxZoomSelection

Style its `fill` / `stroke`; the chart sizes and shows it.

## member: IDeclaredAnimation.easing

Any other value — an unknown name, or an easing function such as `am5.ease.cubic` — silently gives linear. `am5.ease.byName(name, ease)` returns the same function in code.

## member: IDeclaredAnimation.from

If the setting has no current value (e.g. `dx` or `fill` never set on the element), the value jumps straight to `to` without animating — give `from` explicitly.

## member: IDeclaredAnimation.target

An entry with `target: "dataItem"` on an element that has no data item is skipped.

## page: IDeclaredAnimation

The interface is not exported by name from the package, so TypeScript code cannot import `IDeclaredAnimation`. Write the entries as object literals; if a type is needed, use `NonNullable<am5.IEntitySettings["animations"]>[number]`.

```javascript
// Pulse every bullet, forever
series.bullets.push(function (root, series, dataItem) {
  return am5.Bullet.new(root, {
    sprite: am5.Circle.new(root, {
      radius: 6,
      animations: [
        { key: "scale", from: 1, to: 1.6, duration: 800, loops: 0, yoyo: true, easing: "sine" },
        { key: "opacity", from: 1, to: 0.3, duration: 800, loops: 0, yoyo: true }
      ]
    })
  });
});
// Move a map point along its line (a data item value) and back, forever
am5.Graphics.new(root, {
  svgPath: "...",
  animations: [{ target: "dataItem", key: "positionOnLine", from: 0, to: 1,
                 duration: 6000, loops: 0, yoyo: true, easing: "cubic", ease: "inOut" }]
});
```

Entries start when the `animations` setting is applied, restart when it changes (the element settings the previous entries animated are put back first), and stop when the element is disposed. A saved config keeps what was configured, never a value caught half way through an animation.

In a JSON config, colors and percents in `from` / `to` are written as `{ "type": "Color", "value": "#ff0000" }` and `{ "type": "Percent", "value": 50 }`.

On a MapPointSeries bullet sprite, an entry with `target: "dataItem"` and `key: "positionOnLine"` also turns an auto-rotating point (`autoRotate` on the data item or the bullet) by 180° while it moves the point back toward the start of the line, so the point faces the way it travels (5.20.8). A point moved by `dataItem.animate()` from code is not turned.

The serializer's `runningAnimations` setting (default `true`) also writes endless animations started in code (`loops: Infinity` with a named amCharts easing) into this setting, as entries with `loops: 0`.

## member: IEasingInfo.easing

Name of the base easing: `"linear"`, `"quad"`, `"cubic"`, `"exp"`, `"sine"`, `"circle"`, `"bounce"` or `"elastic"`.

## member: IEasingInfo.ease

Set when the base easing is wrapped in `am5.ease.out()` or `am5.ease.inOut()`; absent for an easing that applies "in".

## member: IEasingInfo.yoyo

`true` when the easing is wrapped in `am5.ease.yoyo()` (goes there and back).

## page: IEasingInfo

Returned by `am5.ease.easingInfo(easing)` (or `undefined` for an easing that cannot be named). The reverse, `am5.ease.byName(name, mode)`, returns the easing function called `name`, eased `"in"` (default), `"out"` or `"inOut"`; an unknown name gives `linear`. The serializer uses these to save running animations as IDeclaredAnimation entries (see the `runningAnimations` serializer setting). In TypeScript the type is `am5.ease.IEasingInfo`.

```javascript
am5.ease.byName("cubic", "out");                      // same as am5.ease.out(am5.ease.cubic)
am5.ease.easingInfo(am5.ease.yoyo(am5.ease.sine));    // { easing: "sine", yoyo: true }
am5.ease.easingInfo(am5.ease.out(am5.ease.cubic));    // { easing: "cubic", ease: "out" }
am5.ease.easingInfo((t) => t * t);                    // undefined
```

Names pass through `out()`, `inOut()` and `yoyo()` in that order only: `yoyo(out(cubic))` is `{ easing: "cubic", ease: "out", yoyo: true }`, but `out(yoyo(cubic))`, `out(out(cubic))` and `am5.ease.pow` (not a named easing) have no info. `am5.ease.pow` is `pow(t, e)` - it needs its exponent, so it is not usable as an easing on its own; wrap it: `(t) => am5.ease.pow(t, 3)`.

## page: IParseSettings

Options object passed as the **second argument** of `JsonParser.parse(config, options)` (or `parseString`). These are not settings of the parser object itself.

```javascript
const parser = am5plugins_json.JsonParser.new(root);
const chart = await parser.parse(config, { parent: root.container, updateTargets: "soft" });
```

## page: StarPattern

```javascript
columnSeries.columns.template.set("fillPattern", am5.StarPattern.new(root, {
  color: am5.color(0xffffff),
  radius: 5,
  innerRadius: am5.percent(50),
  spikes: 5,
  gap: 6
}));
```

A star pattern's tile is only a repeat unit — the grid repeats every cell — so an oversized `width`/`height` just wastes memory and draw time for an identical result. The class normalizes the tile to a single cell (2x2 cells when `checkered`). This optimization is skipped for a whole-pattern `rotation` (which isn't periodic on an axis-aligned tile — use `rotateShapes` for that) and for non-`repeat` repetitions.

## page: TrianglePattern

```javascript
columnSeries.columns.template.set("fillPattern", am5.TrianglePattern.new(root, {
  color: am5.color(0xffffff),
  maxWidth: 8,
  maxHeight: 8,
  gap: 6
}));
```

A triangle pattern's tile is only a repeat unit — the grid repeats every cell — so an oversized `width`/`height` just wastes memory and draw time for an identical result. The class normalizes the tile to a single cell (2x2 cells when `checkered`). This optimization is skipped for a whole-pattern `rotation` (which isn't periodic on an axis-aligned tile — use `rotateShapes` for that) and for non-`repeat` repetitions.
