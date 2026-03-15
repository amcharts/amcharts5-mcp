---
title: "Hierarchy link bullets"
source: "https://www.amcharts.com/docs/v5/charts/hierarchy/hierarchy-link-bullets/"
scraped: "2026-03-15"
---

This tutorial will show how we can add bullets to links on linked hierarchy charts like [Force-directed](https://www.amcharts.com/docs/v5/charts/hierarchy/force-directed/) and [Tree](https://www.amcharts.com/docs/v5/charts/hierarchy/tree/).

## Adding bullets

Hierarchy chart's bullets are created like [any other bullets](https://www.amcharts.com/docs/v5/concepts/common-elements/bullets/), except they are pushed to `linkBullets` list (instead of `bullets`):

series.linkBullets.push(function(root, source, target) {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "Link",
      fill: am5.color(0x000000),
      centerX: am5.p50,
      centerY: am5.p50
    })
  });
});

series.linkBullets.push(function(root, source, target) {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "Link",
      fill: am5.color(0x000000),
      centerX: am5.p50,
      centerY: am5.p50
    })
  });
});

This will add a bullet on each link in series.

## Location within link

By default, bullets will appear at the start of the link.

We can use bullet's setting `locationX` to specify relative location within the span of the link.

It accepts numeric values from `0` (one, which means beginning of the link) and `1` (one, which means end of the link).

The following will place bullets in the middle of a link:

series.linkBullets.push(function(root, source, target) {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "Link",
      fill: am5.color(0x000000),
      centerX: am5.p50,
      centerY: am5.p50,
      locationX: 0.5
    })
  });
});

series.linkBullets.push(function(root, source, target) {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: "Link",
      fill: am5.color(0x000000),
      centerX: am5.p50,
      centerY: am5.p50,
      locationX: 0.5
    })
  });
});

## Using node data

The bullet function will receive data items for source and target nodes as second and third parameters respectively.

We can use that data to decorate the bullet accordingly, e.g. populate label text, or set color.

The following will use source node's color, as well as target node's title for a label bullet:

series.linkBullets.push(function(root, source, target) {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: target.get("category"),
      fill: source.get("fill"),
      centerX: am5.p50,
      centerY: am5.p50,
      locationX: 0.5
    })
  });
});

series.linkBullets.push(function(root, source, target) {
  return am5.Bullet.new(root, {
    sprite: am5.Label.new(root, {
      text: target.get("category"),
      fill: source.get("fill"),
      centerX: am5.p50,
      centerY: am5.p50,
      locationX: 0.5
    })
  });
});

## Relative rotation

A bullet can also be rotated automatically to follow the direction of the link.

It doesn't matter for a circle bullet, but might make perfect sense for other shapes, e.g. a triangle or a label.

To enable auto-rotation, we just need to set `autoRotate: true` (default: `false`) on our bullet:

series.linkBullets.push(function(root, source, target) {
  return am5.Bullet.new(root, {
    autoRotate: true,
    autoRotateAngle: 90,
    sprite: am5.Triangle.new(root, {
      width: 10,
      height: 15,
      rotation: 45,
      fill: source.get("fill"),
      centerX: am5.p50,
      centerY: am5.p50,
      locationX: 0.5
    })
  });
});

series.linkBullets.push(function(root, source, target) {
  return am5.Bullet.new(root, {
    autoRotate: true,
    autoRotateAngle: 90,
    sprite: am5.Triangle.new(root, {
      width: 10,
      height: 15,
      rotation: 45,
      fill: source.get("fill"),
      centerX: am5.p50,
      centerY: am5.p50,
      locationX: 0.5
    })
  });
});

Relative rotation can also be further tweaked using another bullet setting: `autoRotateAngle`.

If set, it will add additional degrees to the automatically-calculated angle.

The following will create triangle arrowheads for bullets, and the `autoRotateAngle: 180` will make the point backwards:

series.linkBullets.push(function(root, source, target) {
  return am5.Bullet.new(root, {
    locationX: 0.5,
    autoRotate: true,
    autoRotateAngle: 180,
    sprite: am5.Graphics.new(root, {
    fill: source.get("fill"),
      centerY: am5.percent(50),
      centerX: am5.percent(50),
      draw: function (display) {
        display.moveTo(0, -6);
        display.lineTo(16, 0);
        display.lineTo(0, 6);
        display.lineTo(6, 0);
        display.lineTo(0, -6);
      }
    })
  });
});

series.linkBullets.push(function(root, source, target) {
  return am5.Bullet.new(root, {
    locationX: 0.5,
    autoRotate: true,
    autoRotateAngle: 180,
    sprite: am5.Graphics.new(root, {
    fill: source.get("fill"),
      centerY: am5.percent(50),
      centerX: am5.percent(50),
      draw: function (display) {
        display.moveTo(0, -6);
        display.lineTo(16, 0);
        display.lineTo(0, 6);
        display.lineTo(6, 0);
        display.lineTo(0, -6);
      }
    })
  });
});


## Dynamic updates and animation

We can update any bullet setting, including `locationX`, dynamically.

bullet.set("locationX", 0.8);

bullet.set("locationX", 0.8);

We can also animate settings by creating a [setting animation](https://www.amcharts.com/docs/v5/concepts/animations/#Animating_settings):

series.linkBullets.push(function(root, source, target) {
  const bullet = am5.Bullet.new(root, {
    locationX: 0.5,
    autoRotate: true,
    autoRotateAngle: 180,
    sprite: am5.Graphics.new(root, {
      fill: source.get("fill"),
      centerY: am5.percent(50),
      centerX: am5.percent(50),
      draw: function(display) {
        display.moveTo(0, -6);
        display.lineTo(16, 0);
        display.lineTo(0, 6);
        display.lineTo(6, 0);
        display.lineTo(0, -6);
      }
    })
  });

  bullet.animate({
    key: "locationX",
    to: 0.2,
    from: 0.8,
    duration: Math.random() \* 1000 + 2000,
    loops: Infinity,
    easing: am5.ease.quad
  });

  return bullet;
});

series.linkBullets.push(function(root, source, target) {
  var bullet = am5.Bullet.new(root, {
    locationX: 0.5,
    autoRotate: true,
    autoRotateAngle: 180,
    sprite: am5.Graphics.new(root, {
      fill: source.get("fill"),
      centerY: am5.percent(50),
      centerX: am5.percent(50),
      draw: function(display) {
        display.moveTo(0, -6);
        display.lineTo(16, 0);
        display.lineTo(0, 6);
        display.lineTo(6, 0);
        display.lineTo(0, -6);
      }
    })
  });

  bullet.animate({
    key: "locationX",
    to: 0.2,
    from: 0.8,
    duration: Math.random() \* 1000 + 2000,
    loops: Infinity,
    easing: am5.ease.quad
  });

  return bullet;
});


## Related tutorials

-   [Force-Directed Tree with directional labels on links](https://www.amcharts.com/docs/v5/tutorials/force-directed-tree-with-directional-labels-on-links/)
