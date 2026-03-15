---
title: "Images"
source: "https://www.amcharts.com/docs/v5/concepts/common-elements/images/"
scraped: "2026-03-15"
---

This tutorial explains how we can use `Picture` class elements to add images to charts.

## Creating an image

To create an image, we will need to instantiate a `[Picture](https://www.amcharts.com/docs/v5/reference/picture/)` object using its `new()` method.

For image to work, it needs to at least have its `[src](https://www.amcharts.com/docs/v5/reference/picture/#src_setting)` setting set.

The `src` can be a string with a relative or absolute URL or an encoded data URI. Basically anything that could go into `href` attribute of an HTML `<img>` tag.

am5.Picture.new(root, {
  width: 32,
  height: 32,
  src: "/images/icon\_btc.svg"
});

am5.Picture.new(root, {
  width: 32,
  height: 32,
  src: "/images/icon\_btc.svg"
});

The same icon can also be added as in-line data URI:

am5.Picture.new(root, {
  width: 32,
  height: 32,
  src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0..."
});

am5.Picture.new(root, {
  width: 32,
  height: 32,
  src: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0..."
});


## Images as bullets

Since image is as good as element as any, we can also use it as [bullet in series](https://www.amcharts.com/docs/v5/concepts/common-elements/bullets/) or [axes ranges](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/axis-ranges/#Bulltet):

series.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Picture.new(root, {
      width: 32,
      height: 32,
      x: am5.percent(30),
      y: am5.percent(50),
      centerX: am5.percent(50),
      centerY: am5.percent(50),
      src: "/images/icon\_btc.svg"
    })
  });
});

series.bullets.push(function() {
  return am5.Bullet.new(root, {
    sprite: am5.Picture.new(root, {
      width: 32,
      height: 32,
      x: am5.percent(30),
      y: am5.percent(50),
      centerX: am5.percent(50),
      centerY: am5.percent(50),
      src: "/images/icon\_btc.svg"
    })
  });
});


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

To draw shapes using SVG paths, instead of `Picture` class, we can use `Graphics`. For more information, please refer to "[Graphics](https://www.amcharts.com/docs/v5/concepts/common-elements/graphics/)" tutorial.
