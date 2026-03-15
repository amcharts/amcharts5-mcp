---
title: "Country data"
source: "https://www.amcharts.com/docs/v5/charts/map-chart/country-data/"
scraped: "2026-03-15"
---

amCharts 5 geodata package is bundled with some data country data sets. Let's take a look at those.

## Loading

There are two data country sets bundled with amCharts geodata, located in `geodata/data` folder.

It containers two files: `countries` and `countries2`. We'll explore their contents shortly.

We can load them just like we would load geodata:

import am5geodata\_data\_countries from "@amcharts/amcharts5-geodata/data/countries";
import am5geodata\_data\_countries2 from "@amcharts/amcharts5-geodata/data/countries2";

<script src="https://cdn.amcharts.com/lib/5/geodata/data/countries.js"></script>
<script src="https://cdn.amcharts.com/lib/5/geodata/data/countries2.js"></script>

Loading data files via `<script>` tag will create global variables `am5geodata_data_countries` and `am5geodata_data_countries2`.

## Dataset contents

### File: countries

This file lists countries that there are maps for in amCharts 5 geodata package.

It's an object which has country ISO2 codes for keys, and array of available map names as a value:

{
  // ...
  "FO": \[ "faroeIslandsLow", "faroeIslandsHigh" \],
  "FJ": \[ "fijiEastLow", "fijiEastHigh", "fijiWestLow", "fijiWestHigh" \],
  "FI": \[ "finlandLow", "finlandHigh" \],
  "FR": \[ "franceLow", "franceHigh", "franceDepartmentsLow", "franceDepartmentsHigh" \],
  "GF": \[ "frenchGuianaLow", "frenchGuianaHigh" \],
  "GA": \[ "gabonLow", "gabonHigh" \],
  // ...
}

Let's say we need to know what maps there are available for France:

let franceMaps = am5geodata\_data\_countries\["FR"\];
// Contents: \[ "franceLow", "franceHigh", "franceDepartmentsLow", "franceDepartmentsHigh" \]

var franceMaps = am5geodata\_data\_countries\["FR"\];
// Contents: \[ "franceLow", "franceHigh", "franceDepartmentsLow", "franceDepartmentsHigh" \]

### File: countries2

This file contains more information, arranged differently.

It's still an object, which has country ISO2 codes for its keys. However, it contains all the countries, even those that we still don't have maps for.

The value is an object, that contains following information:

-   Country name in English.
-   Continent code (e.g. `"EU"`) and name in English (e.g. `"Europe"`).
-   Array of available maps for that country (this information overlaps with `countries` file).

{
  // ...
  "FR": {
    "country": "France",
    "continent\_code": "EU",
    "continent": "Europe",
    "maps": \[ "franceLow", "franceHigh", "franceDepartmentsLow", "franceDepartmentsHigh" \]
  },
  // ...
}

## Examples

Below is a demo that makes use of bundled country data.


