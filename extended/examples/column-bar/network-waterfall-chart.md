---
title: "Network Waterfall Chart"
source: "https://www.amcharts.com/demos/network-waterfall-chart/"
category: "column-bar"
scraped: "2026-10-25"
---

The requests a shop's home page makes as it loads, the way the browser's network panel draws them: each request a row, split into its phases, with its DOMContentLoaded and Load moments marked. Throttle the network with Chrome's presets to see what a slow connection does.

Reading a waterfall: A network waterfall lines up every request on one clock, so the shape of the page load shows at once: a long first bar is a slow server, steps down the chart are requests that wait for each other, and DNS and connection time appear only where the page talks to a new server. Throttling stretches every round trip and download, and shows which requests stand between the visitor and a usable page.

Good for:
- Page loads, API calls and other request timings
- Any process of phases per item: builds, pipelines, jobs
- Finding what waits on what

Think twice when:
- Hundreds of requests: group or filter them first
- Totals per phase: a stacked bar chart is clearer

Prompt: Create a network waterfall chart like Chrome DevTools' network panel, with generated data: the 17 requests of a shop's home page (the HTML, styles, scripts, fonts, images, API calls, analytics, favicon) down the side in request order, time in milliseconds along the top. Each request's phases are floating bars on its row, one column series per phase (Queueing in faint gray, then DNS lookup, Connecting, Waiting for server and Content download in theme colors) with a legend; DNS and connecting only on the first request to each server; later requests to it queue until that connection is up. Mark DOMContentLoaded and Load with dashed vertical lines labeled with their times; Load waits for the files, images and the analytics script, not for fetch() calls. Tooltips: the file, the phase and its duration, the type, size and server. Buttons switch the network speed with Chrome's throttling presets (off; fast 4G, 8.1 Mbps and 165 ms; slow 4G, 1.44 Mbps and 562.5 ms; 3G, 400 kbps and 2,000 ms) and recompute the timings. On phones hide the legend and the milestone labels. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://docs.amcharts.com/v5/getting-started/#root-element
var root = am5.Root.new("chartdiv");

// Set themes
// https://docs.amcharts.com/v5/concepts/themes/
var responsive = am5themes_Responsive.new(root); // kept in a variable: a rule of its own is added below
root.setThemes([
  am5themes_Animated.new(root),
  responsive
]);


// ── Sample data: the requests a shop's home page makes as it loads, like the network panel of the browser's tools.
// Each request goes through phases: waiting in the queue, finding the server (DNS), connecting to it, waiting for its
// answer and downloading it. A server's first request pays for the DNS lookup and the connection; later ones to the
// same server reuse them ──

// The requests: file, type, server, size (KB), the server's own time to answer (ms), and what has to happen before
// the browser asks for it
var REQUESTS = [
  { url: "index.html", type: "Document", host: "shop.example.com", size: 32, server: 180, after: "start" },
  { url: "styles.css", type: "Stylesheet", host: "shop.example.com", size: 48, server: 25, after: "html" },
  { url: "vendor.js", type: "Script", host: "shop.example.com", size: 420, server: 20, after: "html" },
  { url: "app.js", type: "Script", host: "shop.example.com", size: 310, server: 20, after: "html" },
  { url: "fonts.css", type: "Stylesheet", host: "fonts.example.net", size: 2, server: 30, after: "html" },
  { url: "inter.woff2", type: "Font", host: "fonts.example.org", size: 38, server: 15, after: "fonts.css" },
  { url: "inter-bold.woff2", type: "Font", host: "fonts.example.org", size: 41, server: 15, after: "fonts.css" },
  { url: "logo.svg", type: "Image", host: "shop.example.com", size: 6, server: 10, after: "html" },
  { url: "hero.webp", type: "Image", host: "img.example-cdn.com", size: 180, server: 30, after: "html" },
  { url: "product-1.webp", type: "Image", host: "img.example-cdn.com", size: 64, server: 25, after: "html" },
  { url: "product-2.webp", type: "Image", host: "img.example-cdn.com", size: 58, server: 25, after: "html" },
  { url: "product-3.webp", type: "Image", host: "img.example-cdn.com", size: 71, server: 25, after: "html" },
  { url: "product-4.webp", type: "Image", host: "img.example-cdn.com", size: 49, server: 25, after: "html" },
  { url: "api/user", type: "Fetch", host: "api.example.com", size: 8, server: 90, after: "app.js" },
  { url: "api/products", type: "Fetch", host: "api.example.com", size: 24, server: 140, after: "app.js" },
  { url: "analytics.js", type: "Script", host: "stats.example.io", size: 45, server: 40, after: "dcl" },
  { url: "favicon.ico", type: "Image", host: "shop.example.com", size: 4, server: 10, after: "load" }
];

// Network speeds: a round trip's latency (ms) and the download speed (kilobits/s). Without throttling a fast office
// connection; the others are Chrome's own throttling presets
var PROFILES = {
  none: { rtt: 20, kbps: 50000 },
  fast4g: { rtt: 165, kbps: 8100 },
  slow4g: { rtt: 562.5, kbps: 1440 },
  slow3g: { rtt: 2000, kbps: 400 }
};

// A seeded random number generator (mulberry32): the same timings on every visit
function makeRandom(seed) {
  return function() {
    seed = seed + 0x6D2B79F5 | 0;
    var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// Each request's phases at a speed, and when the page's DOMContentLoaded and load events fire
function simulate(profile) {
  var random = makeRandom(2026);
  var kbPerMs = profile.kbps / 8 / 1000;   // kilobytes a millisecond
  var connectedAt = {};                    // when the connection to each server was up
  var done = {};                           // when each request finished
  var phases = [];
  var events = { start: 0 };

  REQUESTS.forEach(function(request) {
    // when the browser can ask: at the start, once the HTML has started to arrive (the parser finds the tags), once
    // a file it depends on is in, or after the page's own events
    var ready = request.after === "html" ? events.html + 5 + 30 * random() : (events[request.after] !== undefined ? events[request.after] : done[request.after]);
    var t = ready;
    var parts = [];
    function phase(name, ms) {
      parts.push({ url: request.url, phase: name, start: Math.round(t * 10) / 10, end: Math.round((t + ms) * 10) / 10, duration: Math.round(ms) });
      t += ms;
    }
    var queue = 1 + (request.type === "Image" ? 15 : 3) * random(); // images wait behind more urgent requests
    // a request to a server that is still being connected to waits for that connection (the browser calls it stalled)
    if (connectedAt[request.host] !== undefined) {
      queue = Math.max(queue, connectedAt[request.host] - t);
    }
    phase("Queueing", queue);
    if (connectedAt[request.host] === undefined) {
      // the first request to a server finds it and connects to it; later ones reuse the connection
      phase("DNS lookup", profile.rtt * (0.5 + 0.5 * random()));
      phase("Connecting", profile.rtt * 2);  // TCP, then TLS
      connectedAt[request.host] = t;
    }
    phase("Waiting for server", profile.rtt + request.server);
    // a bit under the line's speed: the other downloads share it
    phase("Content download", Math.max(1, request.size / kbPerMs * (1.1 + 0.4 * random())));
    parts.forEach(function(p) {
      p.type = request.type;
      p.host = request.host;
      p.size = request.size;
      phases.push(p);
    });
    done[request.url] = t;

    // the page's milestones: the HTML's first bytes, then DOMContentLoaded once the HTML, the styles and the
    // scripts are in and the scripts have run
    if (request.url === "index.html") { events.html = t - (t - parts[parts.length - 1].start) * 0.7; }
    if (request.url === "app.js") {
      events.dcl = Math.max(done["index.html"], done["styles.css"], done["vendor.js"], done["app.js"]) + 90;
    }
    if (request.url === "analytics.js") {
      // load fires once everything the page itself loads is in: its files and images, and a script added before load,
      // like the analytics. Requests made with fetch() don't hold it
      events.load = Math.max.apply(null, REQUESTS.filter(function(q) {
        return q.type !== "Fetch" && done[q.url] !== undefined;
      }).map(function(q) { return done[q.url]; })) + 15;
    }
  });
  return { phases: phases, dcl: Math.round(events.dcl), load: Math.round(events.load), end: Math.max.apply(null, phases.map(function(p) { return p.end; })) };
}


// Create chart
// https://docs.amcharts.com/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "none",
  wheelY: "none",
  paddingRight: 30, // room for the last time label, which is centered on the plot's edge
  layout: root.verticalLayout
}));

// Add legend: the phases
// https://docs.amcharts.com/v5/charts/xy-chart/legend-xy-series/
var legend = chart.children.unshift(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50,
  marginBottom: 10
}));

// Create axes
// https://docs.amcharts.com/v5/charts/xy-chart/axes/
// The requests down the side, in the order the browser made them
var yRenderer = am5xy.AxisRendererY.new(root, {
  inversed: true,          // the first request at the top
  minGridDistance: 8,      // a label for every request
  cellStartLocation: 0.2,  // the bars thinner than the rows
  cellEndLocation: 0.8
});
yRenderer.labels.template.setAll({
  fontSize: "0.8em",
  maxWidth: 130,
  oversizedBehavior: "truncate"
});
yRenderer.grid.template.set("strokeOpacity", 0.05);
var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "url",
  renderer: yRenderer
}));
yAxis.data.setAll(REQUESTS);

// The time since the page was asked for, along the top
var xRenderer = am5xy.AxisRendererX.new(root, {
  opposite: true,
  minGridDistance: 70
});
xRenderer.grid.template.set("strokeOpacity", 0.06);
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  numberFormat: "#,###' ms'",
  renderer: xRenderer
}));

// Create series
// https://docs.amcharts.com/v5/charts/xy-chart/series/
// One series per phase, so the legend names them and can hide each: a phase is a floating bar on its request's row,
// from when it started to when it ended. The queue in a faint gray, the rest in the theme's colors
var gray = root.interfaceColors.get("alternativeBackground");
var series = ["Queueing", "DNS lookup", "Connecting", "Waiting for server", "Content download"].map(function(name) {
  var settings = {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    openValueXField: "start",
    valueXField: "end",
    categoryYField: "url",
    clustered: false // the phases share their request's row
  };
  if (name === "Queueing") {
    settings.fill = gray;
    settings.stroke = gray;
  }
  var s = chart.series.push(am5xy.ColumnSeries.new(root, settings));
  s.columns.template.setAll({
    strokeOpacity: 0,
    fillOpacity: name === "Queueing" ? 0.25 : 1,
    tooltipText: "[bold]{url}[/]\n" + name + ": {duration} ms\n{type}, {size} KB from {host}",
    tooltipY: 0
  });
  legend.data.push(s);
  return s;
});

// The page's two milestones as lines across the requests: DOMContentLoaded (the HTML read and its scripts run) and
// load (everything the page asked for is in)
// https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-ranges/
function milestone(color, side) {
  var range = xAxis.createAxisRange(xAxis.makeDataItem({ value: 0 }));
  range.get("grid").setAll({
    forceHidden: false,
    stroke: color,
    strokeOpacity: 1,
    strokeWidth: 1.5,
    strokeDasharray: [4, 3]
  });
  range.get("label").setAll({
    forceHidden: false,
    fill: color,
    fontSize: "0.75em",
    fontWeight: "600",
    dy: 24,             // down into the plot, below the time axis's own labels
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    background: am5.RoundedRectangle.new(root, {
      fill: root.interfaceColors.get("background"), // the chart's background, so the bars behind don't show through
      fillOpacity: 0.9
    }),
    centerY: 0,
    // DOMContentLoaded's name to the left of its line, Load's to the right, so the two never overlap
    centerX: side < 0 ? am5.p100 : 0,
    dx: 5 * side
  });
  return range;
}
var dclRange = milestone(root.interfaceColors.get("primaryButton"), -1);
var loadRange = milestone(root.interfaceColors.get("negative"), 1);

// On a narrow chart (a phone) the legend would take most of the height: it is hidden there, and so are the milestones' labels (their lines stay). The rule is
// undone on a wider chart
responsive.addRule({
  relevant: am5themes_Responsive.widthM, // the chart is 600px wide or less
  applying: function() {
    legend.set("forceHidden", true);
    dclRange.get("label").set("forceHidden", true); // the lines stay
    loadRange.get("label").set("forceHidden", true);
  },
  removing: function() {
    legend.set("forceHidden", false);
    dclRange.get("label").set("forceHidden", false);
    loadRange.get("label").set("forceHidden", false);
  }
});

// Shows the page loading at a network speed: "none", "fast4g", "slow4g" or "slow3g"
function showRequests(name) {
  var result = simulate(PROFILES[name]);
  series.forEach(function(s) {
    s.data.setAll(result.phases.filter(function(p) { return p.phase === s.get("name"); }));
  });
  dclRange.set("value", result.dcl);
  dclRange.get("label").set("text", "DOMContentLoaded " + result.dcl.toLocaleString("en-US") + " ms");
  loadRange.set("value", result.load);
  loadRange.get("label").set("text", "Load " + result.load.toLocaleString("en-US") + " ms");
  xAxis.set("max", Math.ceil(result.end * 1.04 / 50) * 50); // the last request, with a little room
}

showRequests("none");

// Make stuff animate on load
// https://docs.amcharts.com/v5/concepts/animations/
chart.appear(1000, 100);
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
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
