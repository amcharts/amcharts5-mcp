---
title: "SVG path converter to points"
source: "https://docs.amcharts.com/embeds/v5/svg-path-converter-to-points/"
category: "docs-demos"
scraped: "2026-11-16"
docsPages: ["charts/timeline"]
---

A demo from the docs page "Timeline chart" (get_doc(path: "charts/timeline")).

## JavaScript

```javascript
// The two important methods here are
// path.getTotalLength and path.getPointAtLength

// For more info see:
// https://developer.mozilla.org/en-US/docs/Web/API/SVGPathElement

function process() {
  // Get path data
  var data = document.getElementById("data").value;

  // Set preview
  var path = document.getElementById("path");
  path.setAttribute("d", data);
  fitPath();

  // Length of path
  var pathLength = Math.floor(path.getTotalLength());

  var points = "[";
  for (let i = 0; i < pathLength; i = i + 5) {
    // Get x and y values at a certain point in the line
    if (i > 0) {
      points += ",";
    }
    pt = path.getPointAtLength(i);
    points +=
      "\n  { x: " + Math.round(pt.x * 10) / 10 + ", y: " + Math.round(pt.y * 10) / 10 + " }";
  }
  points += "\n]";

  // Set result
  var result = document.getElementById("result");
  result.value = points;
  result.focus();
  result.select();
}

function fitPath() {
  var path = document.getElementById("path");
  var svg = document.getElementById("svg");

  path.removeAttribute("transform");

  var pathbox = path.getBoundingClientRect();
  var svgbox = svg.getBoundingClientRect();

  var transform = "";

  // Reduce size if necessary
  var kx = pathbox.width > svgbox.width ? pathbox.width / svgbox.width : 1;
  var ky = pathbox.height > svgbox.height ? pathbox.height / svgbox.height : 1;
  var k = Math.max(kx, ky);

  if (k != 1) {
    transform += " scale(" + k + ")";
  }

  // Position so it fits
  var dx = Math.abs(svgbox.x - pathbox.x) + svgbox.width / 2 - (pathbox.width * k) / 2;
  var dy = Math.abs(svgbox.y - pathbox.y) + svgbox.height / 2 - (pathbox.height * k) / 2;

  if (dx || dy) {
    transform += " translate(" + dx + " " + dy + ")";
  }

  if (transform != "") {
    path.setAttribute("transform", transform);
  }
}
```

## HTML

```html
<div class="container">
  <div class="row">
    <div class="col">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Enter SVG path</h5>
          <textarea id="data">
m -66.523809,44.372384 c 161.819672,0 158.605972,-79.22919 158.605972,-79.22919</textarea>
          <input
            type="button"
            class="btn btn-primary"
            value="Convert to points"
            onclick="process()"
          />
        </div>
      </div>
      <br />
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Preview</h5>
          <svg
            id="svg"
            version="1.1"
            x="0px"
            y="0px"
            width="100%"
            height="200px"
            xml:space="preserve"
          >
            <path
              id="path"
              fill="none"
              stroke="#c00"
              stroke-width="3"
              stroke-miterlimit="10"
              d=""
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="col col-md-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Point info</h5>
          <textarea id="result"></textarea>
        </div>
      </div>
    </div>
  </div>
</div>
```

## CSS

```css
.container {
  margin-top: 2em;
  width: 98%;
}

#data {
  width: 100%;
  height: 100px;
}

#result {
  width: 100%;
  height: 440px;
}

svg {
  border: 1px solid #eee;
}
```

## Required resources

- https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css
