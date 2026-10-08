/**
 * Which amCharts 5 script files a piece of demo code needs, from the globals
 * it uses: am5 -> index.js, am5xy -> xy.js, am5themes_Animated ->
 * themes/Animated.js, am5geodata_data_countries2 -> geodata/data/countries2.js,
 * am5locales_de_DE -> locales/de_DE.js, am5plugins_exporting ->
 * plugins/exporting.js. Paths are relative to https://cdn.amcharts.com/lib/5/.
 */

export const CDN = "https://cdn.amcharts.com/lib/5/";

const MODULES = ["xy", "percent", "map", "hierarchy", "flow", "radar", "stock", "gantt", "timeline", "venn", "wc"];

export function requiredScripts(js) {
  const files = new Set();
  for (const [, name] of js.matchAll(/\b(am5[a-zA-Z0-9_]*)\b/g)) {
    if (name === "am5") files.add("index.js");
    else if (MODULES.includes(name.slice(3))) files.add(`${name.slice(3)}.js`);
    else if (name.startsWith("am5themes_")) files.add(`themes/${name.slice(10)}.js`);
    else if (name.startsWith("am5geodata_")) files.add(`geodata/${name.slice(11).replace(/_/g, "/")}.js`);
    else if (name.startsWith("am5locales_")) files.add(`locales/${name.slice(11)}.js`);
    else if (name.startsWith("am5plugins_")) files.add(`plugins/${name.slice(11)}.js`);
  }
  return files;
}
