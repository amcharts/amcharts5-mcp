---
title: "Images"
source: "https://docs.amcharts.com/v5/concepts/common-elements/images/"
scraped: "2026-11-16"
---

> This tutorial explains how we can use Picture class elements to add images to charts.

This tutorial explains how we can use `Picture` class elements to add images to charts.

## Creating an image

To create an image, we will need to instantiate a `Picture` object using its `new()` method.

For image to work, it needs to at least have its `src` setting set.

The `src` can be a string with a relative or absolute URL or an encoded data URI. Basically anything that could go into `href` attribute of an HTML `<img>` tag.

TypeScript:

```ts
am5.Picture.new(root, {
  width: 32,
  height: 32,
  src: "/images/icon_btc.svg"
});
```

JavaScript:

```js
am5.Picture.new(root, {
  width: 32,
  height: 32,
  src: "/images/icon_btc.svg"
});
```

The same icon can also be added as in-line data URI:

TypeScript:

```ts
am5.Picture.new(root, {
  width: 32,
  height: 32,
  src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0..."
});
```

JavaScript:

```js
am5.Picture.new(root, {
  width: 32,
  height: 32,
  src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0..."
});
```

Example: [Adding images to container](https://docs.amcharts.com/embeds/v5/adding-images-to-container/)

Scripts: https://cdn.amcharts.com/lib/5/index.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 350px;
  height: 350px;
  margin: auto;
}
```

JavaScript:

```js
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root
var root = am5.Root.new("chartdiv");

// Create chart
var chart = root.container.children.push(
  am5.Container.new(root, {
    width: am5.percent(100),
    height: am5.percent(100),
    background: am5.Rectangle.new(root, {
      stroke: am5.color(0x555555)
    })
  })
);

chart.children.push(
  am5.Picture.new(root, {
    width: 100,
    height: 100,
    x: am5.percent(30),
    y: am5.percent(50),
    centerX: am5.percent(50),
    centerY: am5.percent(50),
    src: "https://docs.amcharts.com/assets/icon_btc.svg"
  })
);

chart.children.push(
  am5.Picture.new(root, {
    width: 100,
    height: 100,
    x: am5.percent(70),
    y: am5.percent(50),
    centerX: am5.percent(50),
    centerY: am5.percent(50),
    src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDY0IDY0IiBoZWlnaHQ9IjY0cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA2NCA2NCIgd2lkdGg9IjY0cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnIGlkPSJCaXRjb2luX0JUQyI+PGc+PGc+PGc+PGc+PGc+PGc+PGc+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgZmlsbD0iI0ZGRkZGRiIgcj0iMjYuNSIvPjwvZz48L2c+PC9nPjxnPjxnPjxnPjxnPjxwYXRoIGQ9Ik01OCwzMmMwLTExLjg2OC03Ljk5Ni0yMS44OTctMTguODgxLTI1LjAwMUMzNy40NjIsNi42NzUsMzUuNzUyLDYuNSwzNCw2LjUgICAgICAgICAgIEMxOS4zNjUsNi41LDcuNSwxOC4zNjUsNy41LDMzYzAsNy43NzMsMy4zNDgsMTQuNzY1LDguNjc5LDE5LjYxMkMyMC41NjUsNTUuOTg3LDI2LjA1MSw1OCwzMiw1OCAgICAgICAgICAgQzQ2LjMzNyw1OCw1OCw0Ni4zMzcsNTgsMzJ6IiBmaWxsPSIjRkZFNTdGIi8+PC9nPjwvZz48L2c+PC9nPjxnPjxnPjxnPjxwYXRoIGQ9Ik00Mi44NTIsNy44MjVDNTAuOTksMTIuMzQ5LDU2LjUsMjEuMDI5LDU2LjUsMzFjMCwxNC42MzUtMTEuODY1LDI2LjUtMjYuNSwyNi41ICAgICAgICAgIGMtMy44NjgsMC03LjUzOS0wLjgzNi0xMC44NTItMi4zMjVDMjIuOTU1LDU3LjI5MSwyNy4zMzYsNTguNSwzMiw1OC41YzE0LjYzNSwwLDI2LjUtMTEuODY1LDI2LjUtMjYuNSAgICAgICAgICBDNTguNSwyMS4yMzMsNTIuMDc0LDExLjk3Myw0Mi44NTIsNy44MjV6IiBmaWxsPSIjRkZENzQwIi8+PC9nPjwvZz48L2c+PGc+PGc+PGc+PHBhdGggZD0iTTMyLDU5QzE3LjExMiw1OSw1LDQ2Ljg4OCw1LDMyUzE3LjExMiw1LDMyLDVzMjcsMTIuMTEyLDI3LDI3UzQ2Ljg4OCw1OSwzMiw1OXogTTMyLDYgICAgICAgICAgQzE3LjY2Myw2LDYsMTcuNjYzLDYsMzJzMTEuNjYzLDI2LDI2LDI2czI2LTExLjY2MywyNi0yNlM0Ni4zMzcsNiwzMiw2eiIgZmlsbD0iIzM3NDc0RiIvPjwvZz48L2c+PC9nPjwvZz48Zz48Zz48Zz48Zz48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiBmaWxsPSIjRkZENzQwIiByPSIyMi41Ii8+PC9nPjwvZz48L2c+PGc+PGc+PGc+PHBhdGggZD0iTTExLjUsMzNjMC0xMi40MjYsMTAuMDc0LTIyLjUsMjIuNS0yMi41YzMuMjEyLDAsNi4yNjUsMC42NzgsOS4wMjksMS44OTIgICAgICAgICAgQzM5Ljc3LDEwLjU1NCwzNi4wMDksOS41LDMyLDkuNUMxOS41NzQsOS41LDkuNSwxOS41NzQsOS41LDMyYzAsOS4yMTQsNS41NDEsMTcuMTI5LDEzLjQ3MSwyMC42MDggICAgICAgICAgQzE2LjEyNiw0OC43NSwxMS41LDQxLjQxNywxMS41LDMzeiIgZmlsbD0iI0ZGQ0EyOCIvPjwvZz48L2c+PC9nPjxnPjxnPjxnPjxwYXRoIGQ9Ik00MS4wMjksMTEuMzkyQzQ3Ljg3NCwxNS4yNSw1Mi41LDIyLjU4Myw1Mi41LDMxYzAsMTIuNDI2LTEwLjA3NCwyMi41LTIyLjUsMjIuNSAgICAgICAgICBjLTMuMjEyLDAtNi4yNjUtMC42NzgtOS4wMjktMS44OTJDMjQuMjMsNTMuNDQ2LDI3Ljk5MSw1NC41LDMyLDU0LjVjMTIuNDI2LDAsMjIuNS0xMC4wNzQsMjIuNS0yMi41ICAgICAgICAgIEM1NC41LDIyLjc4Niw0OC45NTksMTQuODcxLDQxLjAyOSwxMS4zOTJ6IiBmaWxsPSIjRkZFNTdGIi8+PC9nPjwvZz48L2c+PGc+PGc+PGc+PHBhdGggZD0iTTMyLDU1QzE5LjMxNyw1NSw5LDQ0LjY4Myw5LDMyUzE5LjMxNyw5LDMyLDlzMjMsMTAuMzE3LDIzLDIzUzQ0LjY4Myw1NSwzMiw1NXogTTMyLDEwICAgICAgICAgIGMtMTIuMTMxLDAtMjIsOS44NjktMjIsMjJzOS44NjksMjIsMjIsMjJzMjItOS44NjksMjItMjJTNDQuMTMxLDEwLDMyLDEweiIgZmlsbD0iIzM3NDc0RiIvPjwvZz48L2c+PC9nPjwvZz48L2c+PC9nPjwvZz48Zz48Zz48Zz48Zz48cGF0aCBkPSJNNDQuMjU2LDI4LjIxN2MwLjUzNS0zLjU4NS0yLjE5NC01LjUxMi01LjkyNi02Ljc5N2wxLjIxMS00Ljg1NWwtMi45NTctMC43MzZsLTEuMTc5LDQuNzI4ICAgICAgIGMtMC43NzYtMC4xOTMtMS41NzUtMC4zNzctMi4zNjgtMC41NTdsMS4xODctNC43NThsLTIuOTU0LTAuNzM4bC0xLjIxMSw0Ljg1NGMtMC42NDMtMC4xNDctNS45Ni0xLjQ3OC01Ljk2LTEuNDc4ICAgICAgIGwtMC43ODYsMy4xNThjMCwwLDIuMTkzLDAuNTAxLDIuMTQ2LDAuNTM0YzEuMTk3LDAuMjk4LDEuNDE1LDEuMDksMS4zNzgsMS43MThsLTMuMzE3LDEzLjMgICAgICAgYy0wLjE0NywwLjM2Ni0wLjUxOCwwLjkxLTEuMzU0LDAuNzA1YzAuMDI5LDAuMDQxLTIuMTQ4LTAuNTM3LTIuMTQ4LTAuNTM3bC0xLjQ2NywzLjM4NWMwLDAsNS4yNjQsMS4zMjYsNS45NTMsMS41MDIgICAgICAgbC0xLjIyMyw0LjkxMmwyLjk1MiwwLjczN2wxLjIxMi00Ljg1OWMwLjgwNiwwLjIyLDEuNTg5LDAuNDIsMi4zNTUsMC42MTJsLTEuMjA4LDQuODM0bDIuOTU3LDAuNzM3bDEuMjIzLTQuOTAxICAgICAgIGM1LjA0LDAuOTUzLDguODMyLDAuNTY4LDEwLjQyNS0zLjk5YzEuMjg2LTMuNjctMC4wNjMtNS43ODctMi43MTUtNy4xNjhDNDIuNDEzLDMyLjExMiw0My44NjcsMzAuODQyLDQ0LjI1NiwyOC4yMTcgICAgICAgTDQ0LjI1NiwyOC4yMTd6IE0zNy41MDMsMzcuNjg4Yy0wLjkxNSwzLjY3LTcuMDk0LDEuNjg4LTkuMDk5LDEuMTg4bDEuNjIzLTYuNTA2QzMyLjAzMSwzMi44NjksMzguNDU2LDMzLjg1OCwzNy41MDMsMzcuNjg4ICAgICAgIEwzNy41MDMsMzcuNjg4eiBNMzguNDE2LDI4LjE2NWMtMC44MzMsMy4zMzgtNS45NzgsMS42NDItNy42NDcsMS4yMjhsMS40NzItNS45MDJDMzMuOTEsMjMuOTA3LDM5LjI4NCwyNC42ODIsMzguNDE2LDI4LjE2NXoiIGZpbGw9IiNGRkZGRkYiLz48L2c+PC9nPjwvZz48Zz48Zz48Zz48cGF0aCBkPSJNMzMuNzM5LDQzLjQ3NmMxLjQ3NywwLjI3OSwyLjcxLDAuNDE1LDMuNzcxLDAuNDE1YzMuMjI1LDAsNS4xMDMtMS4yNTgsNi4wODktNC4wNzkgICAgICAgYzEuMDgxLTMuMDg0LDAuMzE3LTUuMTA2LTIuNDc0LTYuNTZsLTEuMjAyLTAuNjI1bDEuMzItMC4zMDZjMS45NTktMC40NTIsMy4wNjktMS43MzcsMy4zOTMtMy45MjggICAgICAgYzAuNDI1LTIuODQ1LTEuMjk5LTQuNzcyLTUuNTkzLTYuMjUxbC0wLjQzNC0wLjE0OWwxLjIwMS00LjgxNGwtMS45ODYtMC40OTRsLTEuMTc5LDQuNzI4bC0wLjQ4NS0wLjEyMSAgICAgICBjLTAuNzczLTAuMTkyLTEuNTY4LTAuMzc1LTIuMzU3LTAuNTU1bC0wLjQ5OS0wLjExMmwxLjE5LTQuNzY5bC0xLjk4My0wLjQ5NmwtMS4yMDksNC44NDVsLTAuNDc4LTAuMTA5ICAgICAgIGMtMC41MjQtMC4xMi00LjE1Ni0xLjAyNi01LjQ4NC0xLjM1OGwtMC41NDIsMi4xNzhjMC45MDksMC4yMDksMS4zOTcsMC4zMjYsMS42NjYsMC40MjVjMS4xNzgsMC4yOTYsMS44MTUsMS4xMDgsMS43NDksMi4yMyAgICAgICBsLTMuMzMxLDEzLjM5MmMtMC4zNTEsMC44OS0xLjA1NCwxLjI3LTEuOTA1LDEuMDgyYy0wLjExNy0wLjAxNS0wLjQ1NC0wLjA4OC0xLjc5Ni0wLjQ0MWwtMS4wNjIsMi40NSAgICAgICBjMS4zODIsMC4zNDgsNC44MzUsMS4yMTgsNS4zODQsMS4zNThsMC40ODIsMC4xMjNsLTEuMjIyLDQuOTA5bDEuOTgxLDAuNDk1bDEuMjE1LTQuODdsMC40OTMsMC4xMzUgICAgICAgYzAuODAzLDAuMjE5LDEuNTgzLDAuNDE4LDIuMzQ2LDAuNjA5bDAuNDg1LDAuMTIybC0xLjIwOCw0LjgzM2wxLjk4NiwwLjQ5NWwxLjIxNi00Ljg3NEwzMy43MzksNDMuNDc2eiBNMzIuNzUyLDIzLjEzNCAgICAgICBsMC40ODUsMC4xMjFjMC4xNjcsMC4wNDIsMC4zNywwLjA4NywwLjYwMiwwLjEzOGMxLjY5LDAuMzc1LDQuNTIsMS4wMDIsNS42MTMsMi43NjhjMC40MzQsMC43LDAuNTQzLDEuNSwwLjMyNSwyLjM3NiAgICAgICBjLTAuMjc0LDEuMDk3LTEuMTQxLDIuNDA1LTMuNzExLDIuNDA1Yy0xLjQ3NiwwLTMuMDMtMC40MTQtNC4wNTgtMC42ODhsLTAuOTY5LTAuMjQ2TDMyLjc1MiwyMy4xMzR6IE0yOS43MTgsMzkuNzU2ICAgICAgIGwtMS4wNDUtMC4yNjdsMS44NjUtNy40NzdsMC40ODUsMC4xMjFjMC4xOTgsMC4wNSwwLjQ0LDAuMTA0LDAuNzE1LDAuMTY2YzIuMDYzLDAuNDYyLDUuNTE1LDEuMjM2LDYuNzcyLDMuMjczICAgICAgIGMwLjQ1OSwwLjc0NCwwLjU3OCwxLjU4LDAuMzUzLDIuNDg1Yy0wLjI5LDEuMTYzLTEuMjQxLDIuNTUtNC4xMjMsMi41NUMzMi45MzgsNDAuNjA4LDMwLjkyMyw0MC4wNzUsMjkuNzE4LDM5Ljc1NnoiIGZpbGw9IiNGRkU1N0YiLz48L2c+PC9nPjwvZz48Zz48Zz48Zz48cGF0aCBkPSJNMzEuOTEzLDQ5LjIyNWwtMy45MjctMC45NzlsMS4yMDktNC44MzZjLTAuNDU2LTAuMTE1LTAuOTE4LTAuMjM0LTEuMzg4LTAuMzU5TDI2LjU5OCw0Ny45ICAgICAgIGwtMy45MjItMC45NzlsMS4yMjMtNC45MTRjLTEuNDkyLTAuMzc3LTUuNDctMS4zOC01LjQ3LTEuMzhsLTAuNTcxLTAuMTQ0bDEuODczLTQuMzE5bDAuNDE2LDAuMTEgICAgICAgYzAuNjQ1LDAuMTcyLDEuMzQ5LDAuMzU0LDEuNzUyLDAuNDUzbDAuMDA1LTAuMDExbDAuMzgxLDAuMDkzYzAuMDgzLDAuMDIsMC4xNiwwLjAzLDAuMjI5LDAuMDNjMC4wOTEsMCwwLjM2NywwLDAuNTQyLTAuNDM3ICAgICAgIGwzLjI5NS0xMy4yMzRjMC4wMjQtMC41NS0wLjI5My0wLjkzMy0xLjAxMy0xLjExMWwtMC4zMzEtMC4xMDJjLTAuMzg4LTAuMS0xLjEzLTAuMjc2LTEuODA2LTAuNDMxbC0wLjQ5Ny0wLjExM2wxLjAzLTQuMTM5ICAgICAgIGwwLjQ4NSwwLjEyMWMwLDAsMy45OTcsMSw1LjQ3NCwxLjM2MWwxLjIxMy00Ljg1OWwzLjkyMywwLjk4bC0xLjE4NCw0Ljc0OGMwLjQ2NiwwLjEwNiwwLjkzMywwLjIxNSwxLjM5NCwwLjMyNmwxLjE3OS00LjcyOSAgICAgICBsMy45MjgsMC45NzlMMzguOTI2LDIxLjFjMi45MzEsMS4wNjYsNi40NTQsMi45NzgsNS44MjUsNy4xOTFjLTAuMzIzLDIuMTgtMS4zNTQsMy42NTUtMy4wNjksNC40ICAgICAgIGMyLjQ0NywxLjY2OSwzLjA5Niw0LjAzNCwxLjk4Niw3LjJjLTEuMTMyLDMuMjQtMy4zNjcsNC43NDktNy4wMzMsNC43NDljLTEuMDA5LDAtMi4xNTUtMC4xMTQtMy40OTItMC4zNDhMMzEuOTEzLDQ5LjIyNXogICAgICAgIE0yOS4xOTksNDcuNTE3bDEuOTg2LDAuNDk1bDEuMjE2LTQuODc0bDAuNDY0LDAuMDg4YzEuNDc3LDAuMjc5LDIuNzEsMC40MTUsMy43NzEsMC40MTVjMy4yMjUsMCw1LjEwMy0xLjI1OCw2LjA4OS00LjA3OSAgICAgICBjMS4wODEtMy4wODQsMC4zMTctNS4xMDYtMi40NzQtNi41NmwtMS4yMDItMC42MjVsMS4zMi0wLjMwNmMxLjk1OS0wLjQ1MiwzLjA2OS0xLjczNywzLjM5My0zLjkyOCAgICAgICBjMC40MjUtMi44NDUtMS4yOTktNC43NzItNS41OTMtNi4yNTFsLTAuNDM0LTAuMTQ5bDEuMjAxLTQuODE0bC0xLjk4Ni0wLjQ5NGwtMS4xNzksNC43MjhsLTAuNDg1LTAuMTIxICAgICAgIGMtMC43NzMtMC4xOTItMS41NjgtMC4zNzUtMi4zNTctMC41NTVsLTAuNDk5LTAuMTEybDEuMTktNC43NjlsLTEuOTgzLTAuNDk2bC0xLjIwOSw0Ljg0NWwtMC40NzgtMC4xMDkgICAgICAgYy0wLjUyNC0wLjEyLTQuMTU2LTEuMDI2LTUuNDg0LTEuMzU4bC0wLjU0MiwyLjE3OGMwLjkwOSwwLjIwOSwxLjM5NywwLjMyNiwxLjY2NiwwLjQyNWMxLjE3OCwwLjI5NiwxLjgxNSwxLjEwOCwxLjc0OSwyLjIzICAgICAgIGwtMy4zMzEsMTMuMzkyYy0wLjM1MSwwLjg5LTEuMDU0LDEuMjctMS45MDUsMS4wODJjLTAuMTE3LTAuMDE1LTAuNDU0LTAuMDg4LTEuNzk2LTAuNDQxbC0xLjA2MiwyLjQ1ICAgICAgIGMxLjM4MiwwLjM0OCw0LjgzNSwxLjIxOCw1LjM4NCwxLjM1OGwwLjQ4MiwwLjEyM2wtMS4yMjIsNC45MDlsMS45ODEsMC40OTVsMS4yMTUtNC44N2wwLjQ5MywwLjEzNSAgICAgICBjMC44MDMsMC4yMTksMS41ODMsMC40MTgsMi4zNDYsMC42MDlsMC40ODUsMC4xMjJMMjkuMTk5LDQ3LjUxN3ogTTMzLjg2Niw0MC4zNThjLTEuODAyLDAtMy44MTgtMC41MzMtNS4wMjItMC44NTMgICAgICAgbC0xLjA0NS0wLjI2N2wxLjg2NS03LjQ3N2wwLjQ4NSwwLjEyMWMwLjE5OCwwLjA1LDAuNDQsMC4xMDQsMC43MTUsMC4xNjZjMi4wNjMsMC40NjIsNS41MTUsMS4yMzYsNi43NzIsMy4yNzMgICAgICAgYzAuNDU5LDAuNzQ0LDAuNTc4LDEuNTgsMC4zNTMsMi40ODVDMzcuNjk4LDM4Ljk3MiwzNi43NDgsNDAuMzU4LDMzLjg2Niw0MC4zNTh6IE0yOS4wMDksMzguNTE2bDAuMDksMC4wMjMgICAgICAgYzEuMTU3LDAuMzA3LDMuMDk0LDAuODE5LDQuNzY3LDAuODE5YzEuODIsMCwyLjg1Mi0wLjU4NiwzLjE1Mi0xLjc5MmMwLjE2LTAuNjQzLDAuMDg0LTEuMjA1LTAuMjMzLTEuNzE4ICAgICAgIGMtMS4wMzYtMS42NzktNC4zNTYtMi40MjQtNi4xNC0yLjgyM2MtMC4wODctMC4wMi0wLjE3MS0wLjAzOS0wLjI1MS0wLjA1N0wyOS4wMDksMzguNTE2eiBNMzUuMTksMzAuNjkxICAgICAgIGMtMS40NzYsMC0zLjAzLTAuNDE0LTQuMDU4LTAuNjg4bC0wLjk2OS0wLjI0NmwxLjcxNC02Ljg3NGwwLjQ4NSwwLjEyMWMwLjE2NywwLjA0MiwwLjM3LDAuMDg3LDAuNjAyLDAuMTM4ICAgICAgIGMxLjY5LDAuMzc1LDQuNTIsMS4wMDIsNS42MTMsMi43NjhjMC40MzQsMC43LDAuNTQzLDEuNSwwLjMyNSwyLjM3NkMzOC42MjcsMjkuMzgzLDM3Ljc2MSwzMC42OTEsMzUuMTksMzAuNjkxeiAgICAgICAgTTMxLjM3NCwyOS4wMzNsMC4wMTUsMC4wMDVjMC45NzgsMC4yNiwyLjQ1NiwwLjY1MywzLjgwMSwwLjY1M2MyLjA4OCwwLDIuNTY0LTAuOTQsMi43NDEtMS42NDcgICAgICAgYzAuMTUyLTAuNjEzLDAuMDg1LTEuMTM5LTAuMjA1LTEuNjA3Yy0wLjg3MS0xLjQwNi0zLjU0My0xLjk5OS00Ljk3OS0yLjMxN2MtMC4wNDctMC4wMTEtMC4wOTQtMC4wMjEtMC4xNC0wLjAzMSAgICAgICBMMzEuMzc0LDI5LjAzM3oiIGZpbGw9IiMzNzQ3NEYiLz48L2c+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPg=="
  })
);
```

## Images as bullets

Since image is as good as element as any, we can also use it as [bullet in series](https://docs.amcharts.com/v5/concepts/common-elements/bullets/) or [axes ranges](https://docs.amcharts.com/v5/charts/xy-chart/axes/axis-ranges/#bullet):

TypeScript:

```ts
series.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Picture.new(root, {
      width: 32,
      height: 32,
      x: am5.percent(30),
      y: am5.percent(50),
      centerX: am5.percent(50),
      centerY: am5.percent(50),
      src: "/images/icon_btc.svg"
    })
  });
});
```

JavaScript:

```js
series.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Picture.new(root, {
      width: 32,
      height: 32,
      x: am5.percent(30),
      y: am5.percent(50),
      centerX: am5.percent(50),
      centerY: am5.percent(50),
      src: "/images/icon_btc.svg"
    })
  });
});
```

Example: [Line series with bullets](https://docs.amcharts.com/embeds/v5/line-series-with-bullets-2/)

Scripts: https://cdn.amcharts.com/lib/5/index.js, https://cdn.amcharts.com/lib/5/xy.js, https://cdn.amcharts.com/lib/5/themes/Animated.js

HTML:

```html
<div id="chartdiv"></div>
```

CSS:

```css
body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 250px;
}
```

JavaScript:

```js
/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 *
 * For more information visit:
 * https://www.amcharts.com/
 *
 * Documentation is available at:
 * https://docs.amcharts.com/v5/
 * ---------------------------------------
 */

// Create root and chart
var root = am5.Root.new("chartdiv");

root.setThemes([am5themes_Animated.new(root)]);

var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panY: false,
    wheelY: "zoomX",
    layout: root.verticalLayout,
    maxTooltipDistance: 0
  })
);

// Define data
var data = [
  {
    date: new Date(2021, 0, 1).getTime(),
    value: 1,
    value2: 2.5
  },
  {
    date: new Date(2021, 0, 2).getTime(),
    value: 3,
    value2: 2.1
  },
  {
    date: new Date(2021, 0, 3).getTime(),
    value: 2,
    value2: 3
  },
  {
    date: new Date(2021, 0, 4).getTime(),
    value: 1,
    value2: 2
  },
  {
    date: new Date(2021, 0, 5).getTime(),
    value: 1.5,
    value2: 0.5
  }
];

// Create Y-axis
var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    extraTooltipPrecision: 1,
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Create X-Axis
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minGridDistance: 20
    })
  })
);

// Create series
function createSeries(name, field, bullet) {
  var series = chart.series.push(
    am5xy.LineSeries.new(root, {
      name: name,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: field,
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {})
    })
  );

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Picture.new(root, {
        width: 40,
        height: 40,
        x: am5.percent(30),
        y: am5.percent(50),
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        src: bullet
      })
    });
  });

  series.strokes.template.set("strokeWidth", 2);

  series.get("tooltip").label.set("text", "[bold]{name}[/]\n{valueX.formatDate()}: {valueY}");
  series.data.setAll(data);
}

createSeries("Series #1", "value", "https://docs.amcharts.com/assets/icon_btc.svg");
createSeries("Series #2", "value2", "https://docs.amcharts.com/assets/icon_eth.svg");

// Add cursor
chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "zoomXY",
    xAxis: xAxis
  })
);

xAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);

yAxis.set(
  "tooltip",
  am5.Tooltip.new(root, {
    themeTags: ["axis"]
  })
);
```

## Known issues

### Cross-domain issues

Images loaded from the same host as the web page displaying the chart, or images loaded via data URIs are considered safe and can be used without any restrictions.

Images loaded from another domains (even from another sub-domain) are considered unsafe by the browser.

Such unsafe images cannot be used as interactive elements on the chart. They will also be removed when chart snapshot is exported to an image.

The above should be taken into consideration when creating charts.

### Dimension-less SVG

In Firefox, if the SVG does not have its width and height attributes set, image might not render. It's due to a [bug](https://bugzilla.mozilla.org/show_bug.cgi?id=700533) in Firefox.

There's currently no known workarounds, except of manually editing the SVG to give it some dimensions.

## Using SVG paths

Instead of full images, we can also use SVG paths as images.

Using SVG paths adds a number of advantages, like avoiding cross-domain issues, latency loading external files, as well as enabling us to set custom colors and other drawing settings.

To draw shapes using SVG paths, instead of `Picture` class, we can use `Graphics`. For more information, please refer to "[Graphics](https://docs.amcharts.com/v5/concepts/common-elements/graphics/)" tutorial.
