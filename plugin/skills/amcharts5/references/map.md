# Map Charts — Geographic Visualizations

> **As a JSON config:** see `references/json.md`. The settings below go into each object's `"settings"` there.


## Required imports

### ES modules
```ts
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_ResponsiveMax from "@amcharts/amcharts5/themes/ResponsiveMax";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
```

### CDN
```html
<script src="https://cdn.amcharts.com/lib/5/index.js"></script>
<script src="https://cdn.amcharts.com/lib/5/map.js"></script>
<script src="https://cdn.amcharts.com/lib/5/geodata/worldLow.js"></script>
<script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
<script src="https://cdn.amcharts.com/lib/5/themes/ResponsiveMax.js"></script>
```

From an npm CDN (AI sandboxes, strict CSPs), the same files are under `https://cdn.jsdelivr.net/npm/@amcharts/amcharts5@5.23.0/dist/`, one pinned version for all: see SKILL.md "Plain HTML, no bundler".

## Geodata (map files)

NPM: `@amcharts/amcharts5-geodata`
CDN: `https://cdn.amcharts.com/lib/5/geodata/{mapName}.js`
npm CDN (AI sandboxes, strict CSPs): jsDelivr and unpkg serve the geodata package's `dist/` (`https://cdn.jsdelivr.net/npm/@amcharts/amcharts5-geodata@5.2.0/dist/{mapName}.js`). Files have the same path as below `geodata/` on the amCharts CDN (e.g. `dist/region/world/europeLow.js`) and the same globals.

| Map | ES import | CDN global |
|-----|----------|-----------|
| World (low detail) | `@amcharts/amcharts5-geodata/worldLow` | `am5geodata_worldLow` |
| World (high detail) | `@amcharts/amcharts5-geodata/worldHigh` | `am5geodata_worldHigh` |
| USA (low) | `@amcharts/amcharts5-geodata/usaLow` | `am5geodata_usaLow` |
| USA (high) | `@amcharts/amcharts5-geodata/usaHigh` | `am5geodata_usaHigh` |
| France (low) | `@amcharts/amcharts5-geodata/franceLow` | `am5geodata_franceLow` |
| Continents | `@amcharts/amcharts5-geodata/continentsLow` | `am5geodata_continentsLow` |

Pattern: camelCase country name + detail level. E.g. `germanyLow`, `canadaHigh`, `chinaLow`.

**IMPORTANT — regional/continent geodata:**
- Individual country maps: `geodata/{countryName}Low.js` > global `am5geodata_{countryName}Low`
- **There are NO continent-level maps** like `europeLow.js` or `asiaLow.js` at the top-level CDN path
- Regional maps are in subdirectories: `geodata/region/world/{regionName}Low.js`
  - CDN: `https://cdn.amcharts.com/lib/5/geodata/region/world/europeLow.js`
  - Global: `am5geodata_region_world_europeLow`
- For a map of European countries, use `worldLow.js` and filter with `include: ["DE", "FR", "IT", ...]`
- **US congressional districts** come in versioned packs under `geodata/region/usa/<pack>/`, each with `usaCongressionalLow.js` / `usaCongressionalHigh.js` (all states) and per-state `<st>Low.js` / `<st>High.js` (e.g. `txLow.js`). There is no top-level `geodata/usaCongressionalLow.js`.

| Pack | Districts |
|------|-----------|
| `congressional` | 117th Congress (the original set; the 116th used the same districts) |
| `congressional2022` | 118th |
| `congressional2025` | 119th |
| `congressional120` | 120th, the newest (includes proposed changes) |

**Global names** are `am5geodata_` + the path below `geodata/`, with `/` → `_` and case kept: `geodata/region/usa/congressional120/usaCongressionalLow.js` → `am5geodata_region_usa_congressional120_usaCongressionalLow`; ES import `@amcharts/amcharts5-geodata/region/usa/congressional120/usaCongressionalLow`. The npm package has the same maps (default exports, raw GeoJSON under `json/`, also on the CDN as `geodata/json/<path>.json`), and its `loadMap("region/usa/congressional120/txLow")` loads any map by path. Where the amCharts MCP server is connected, its `list_geodata(filter)` tool lists every map with its CDN path, global name and ES import.

## Core setup

```js
const root = am5.Root.new("chartdiv");
root.setThemes([am5themes_Animated.new(root), am5themes_ResponsiveMax.new(root)]);

const chart = root.container.children.push(
  am5map.MapChart.new(root, {
    panX: "rotateX",           // "translateX", "rotateX", "none"
    panY: "translateY",        // "translateY", "rotateY", "none"
    projection: am5map.geoMercator(),
    // homeGeoPoint: { latitude: 48.8566, longitude: 2.3522 },
    // homeZoomLevel: 5,
    // autoHome: true              // start at the home position
  })
);

// Polygon series (countries/regions)
const polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata_worldLow
    // exclude: ["AQ"]             // exclude Antarctica (only if needed)
    // include: ["US", "CA", "MX"]  // show only these
  })
);

chart.appear(1000, 100);
```

## Available projections

```js
am5map.geoMercator()          // most common, rectangular
am5map.geoNaturalEarth1()     // rounded, good for world maps
am5map.geoAlbersUsa()         // USA with Alaska/Hawaii repositioned
am5map.geoOrthographic()      // globe
am5map.geoEqualEarth()        // equal-area
am5map.geoEquirectangular()   // simple lat/long grid
```

**IMPORTANT — Antarctica (`exclude: ["AQ"]`):**
- Do NOT exclude Antarctica by default. Many amCharts demos exclude it because they use Mercator projection where Antarctica appears disproportionately large, but this is a demo-specific choice, not a best practice.
- Only exclude Antarctica when the user explicitly asks for it, or when referencing a specific demo that excludes it.
- With non-Mercator projections (`geoNaturalEarth1`, `geoEqualEarth`, `geoOrthographic`, `geoEquirectangular`) Antarctica renders at a reasonable size and should be included.


## Continued

The rest of this file is in `references/map-part-2.md`. Read it as part of this file.
