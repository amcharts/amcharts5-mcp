---
title: "Star Atlas"
source: "https://www.amcharts.com/demos/star-atlas/"
category: "maps"
scraped: "2026-10-08"
---

A star atlas: the night sky drawn on a map chart, with the brightest stars, about 25 constellations and the path of the sun. It can be shown flat or as a globe.

Maps of things that aren’t the Earth: A map chart only needs coordinates, so it can draw any sphere: here right ascension becomes longitude and declination latitude, and the projections, panning and zoom work as on a world map. The same idea suits other planets, or anything placed on a globe.

Good for:
- Sky charts, planets and moons
- Points and lines placed on a sphere
- Lessons and explainers about the sky

Think twice when:
- Real sky work: only the bright stars are real, the faint ones are placed at random
- Thousands of stars: label only the brightest
- Plain data: a world map or an XY chart may suit better

Prompt: Create a star atlas on a map chart: the night sky with about 100 named bright stars at their real positions, sized by brightness, stick figures of the main constellations, the celestial equator and the ecliptic. The sky slowly rotates and can be dragged and zoomed. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root), am5themes_Responsive.new(root)]);

// Every color comes from the theme: the stars and labels in the text color, the sky and the grid in the alternative
// background color, and the lines from the theme's color set (the equator in its first color, the ecliptic and the
// zodiac figures in a contrasting one)
var textColor = root.interfaceColors.get("text");
var skyColor = root.interfaceColors.get("alternativeBackground");
var colors = am5.ColorSet.new(root, {});
var equatorColor = colors.getIndex(0);
var eclipticColor = colors.getIndex(9);

// Convert right ascension hours to map longitude
function raToLon(raHours) {
	// 15 degrees per hour, negative because on a sky map right ascension grows to the left (east)
	var lon = -(raHours * 15);
	if (lon < -180) lon += 360; // keep it within -180 to 180
	return lon;
}

// Bright named stars (RA in hours, declination in degrees, visual magnitude)

var starCatalog = [
	// Orion
	{ name: "Betelgeuse", ra: 5.920, dec: 7.41, mag: 0.42 },
	{ name: "Rigel", ra: 5.242, dec: -8.20, mag: 0.13 },
	{ name: "Bellatrix", ra: 5.419, dec: 6.35, mag: 1.64 },
	{ name: "Mintaka", ra: 5.533, dec: -0.30, mag: 2.23 },
	{ name: "Alnilam", ra: 5.604, dec: -1.20, mag: 1.69 },
	{ name: "Alnitak", ra: 5.679, dec: -1.94, mag: 1.77 },
	{ name: "Saiph", ra: 5.796, dec: -9.67, mag: 2.09 },
	// Big Dipper / Ursa Major
	{ name: "Dubhe", ra: 11.062, dec: 61.75, mag: 1.79 },
	{ name: "Merak", ra: 11.031, dec: 56.38, mag: 2.37 },
	{ name: "Phecda", ra: 11.898, dec: 53.69, mag: 2.44 },
	{ name: "Megrez", ra: 12.257, dec: 57.03, mag: 3.31 },
	{ name: "Alioth", ra: 12.900, dec: 55.96, mag: 1.77 },
	{ name: "Mizar", ra: 13.399, dec: 54.93, mag: 2.27 },
	{ name: "Alkaid", ra: 13.793, dec: 49.31, mag: 1.86 },
	// Cassiopeia
	{ name: "Schedar", ra: 0.675, dec: 56.54, mag: 2.23 },
	{ name: "Caph", ra: 0.153, dec: 59.15, mag: 2.27 },
	{ name: "Tsih", ra: 0.945, dec: 60.72, mag: 2.47 },
	{ name: "Ruchbah", ra: 1.430, dec: 60.24, mag: 2.68 },
	{ name: "Segin", ra: 1.907, dec: 63.67, mag: 3.37 },
	// Scorpius
	{ name: "Antares", ra: 16.490, dec: -26.43, mag: 0.96 },
	{ name: "Shaula", ra: 17.560, dec: -37.10, mag: 1.63 },
	{ name: "Dschubba", ra: 16.006, dec: -22.62, mag: 2.32 },
	{ name: "Acrab", ra: 16.091, dec: -19.81, mag: 2.62 },
	{ name: "Larawag", ra: 16.836, dec: -34.29, mag: 2.29 },
	// Crux
	{ name: "Acrux", ra: 12.443, dec: -63.10, mag: 0.76 },
	{ name: "Mimosa", ra: 12.795, dec: -59.69, mag: 1.25 },
	{ name: "Gacrux", ra: 12.519, dec: -57.11, mag: 1.63 },
	{ name: "Imai", ra: 12.252, dec: -58.75, mag: 2.80 },
	// Cygnus
	{ name: "Deneb", ra: 20.691, dec: 45.28, mag: 1.25 },
	{ name: "Sadr", ra: 20.370, dec: 40.26, mag: 2.23 },
	{ name: "Gienah Cyg", ra: 20.770, dec: 33.97, mag: 2.48 },
	{ name: "Fawaris", ra: 19.750, dec: 45.13, mag: 2.87 },
	{ name: "Albireo", ra: 19.512, dec: 27.96, mag: 3.08 },
	// Taurus
	{ name: "Elnath", ra: 5.438, dec: 28.61, mag: 1.65 },
	{ name: "Tianguan", ra: 5.627, dec: 21.14, mag: 3.00 },
	// Leo
	{ name: "Denebola", ra: 11.818, dec: 14.57, mag: 2.14 },
	{ name: "Algieba", ra: 10.333, dec: 19.84, mag: 2.28 },
	{ name: "Zosma", ra: 11.235, dec: 20.52, mag: 2.56 },
	// Gemini
	{ name: "Alhena", ra: 6.629, dec: 16.40, mag: 1.93 },
	{ name: "Mebsuta", ra: 6.732, dec: 25.13, mag: 3.06 },
	{ name: "Tejat", ra: 6.383, dec: 22.51, mag: 2.88 },
	// Andromeda
	{ name: "Alpheratz", ra: 0.140, dec: 29.09, mag: 2.06 },
	{ name: "Mirach", ra: 1.163, dec: 35.62, mag: 2.05 },
	{ name: "Almach", ra: 2.065, dec: 42.33, mag: 2.10 },
	// Perseus
	{ name: "Mirfak", ra: 3.405, dec: 49.86, mag: 1.79 },
	{ name: "Algol", ra: 3.136, dec: 40.96, mag: 2.12 },
	// Pegasus
	{ name: "Markab", ra: 23.079, dec: 15.21, mag: 2.49 },
	{ name: "Scheat", ra: 23.063, dec: 28.08, mag: 2.42 },
	{ name: "Algenib", ra: 0.221, dec: 15.19, mag: 2.84 },
	{ name: "Enif", ra: 21.736, dec: 9.88, mag: 2.39 },
	// Aquila
	{ name: "Tarazed", ra: 19.771, dec: 10.61, mag: 2.72 },
	{ name: "Alshain", ra: 19.922, dec: 6.41, mag: 3.71 },
	// Canis Major
	{ name: "Mirzam", ra: 6.378, dec: -17.96, mag: 1.98 },
	{ name: "Wezen", ra: 7.140, dec: -26.39, mag: 1.84 },
	{ name: "Adhara", ra: 6.977, dec: -28.97, mag: 1.50 },
	{ name: "Aludra", ra: 7.402, dec: -29.30, mag: 2.45 },
	// Lyra
	{ name: "Sheliak", ra: 18.835, dec: 33.36, mag: 3.45 },
	{ name: "Sulafat", ra: 18.982, dec: 32.69, mag: 3.24 },
	// Draco
	{ name: "Eltanin", ra: 17.943, dec: 51.49, mag: 2.23 },
	{ name: "Rastaban", ra: 17.507, dec: 52.30, mag: 2.79 },
	{ name: "Eta Dra", ra: 16.400, dec: 61.51, mag: 2.74 },
	// Sagittarius
	{ name: "Kaus Australis", ra: 18.403, dec: -34.38, mag: 1.85 },
	{ name: "Nunki", ra: 18.921, dec: -26.30, mag: 2.02 },
	{ name: "Ascella", ra: 19.043, dec: -29.88, mag: 2.59 },
	{ name: "Kaus Media", ra: 18.350, dec: -29.83, mag: 2.70 },
	{ name: "Kaus Borealis", ra: 18.466, dec: -25.42, mag: 2.81 },
	// Aries
	{ name: "Hamal", ra: 2.120, dec: 23.46, mag: 2.00 },
	{ name: "Sheratan", ra: 1.911, dec: 20.81, mag: 2.64 },
	// Virgo
	{ name: "Vindemiatrix", ra: 13.036, dec: 10.96, mag: 2.83 },
	{ name: "Porrima", ra: 12.694, dec: -1.45, mag: 2.74 },
	// Hercules
	{ name: "Kornephoros", ra: 16.504, dec: 21.49, mag: 2.77 },
	{ name: "Zeta Her", ra: 16.688, dec: 31.60, mag: 2.81 },
	{ name: "Eta Her", ra: 16.715, dec: 38.92, mag: 3.49 },
	{ name: "Pi Her", ra: 17.251, dec: 36.81, mag: 3.16 },
	// Cancer (extra zodiac)
	{ name: "Tarf", ra: 8.275, dec: 9.19, mag: 3.52 },
	{ name: "Asellus Australis", ra: 8.745, dec: 18.15, mag: 3.94 },
	{ name: "Asellus Borealis", ra: 8.722, dec: 21.47, mag: 4.66 },
	// Libra (extra zodiac)
	{ name: "Zubeneschamali", ra: 15.283, dec: -9.38, mag: 2.61 },
	{ name: "Zubenelgenubi", ra: 14.847, dec: -16.04, mag: 2.75 },
	{ name: "Brachium", ra: 15.616, dec: -25.28, mag: 3.25 },
	// Capricornus (extra zodiac)
	{ name: "Deneb Algedi", ra: 21.784, dec: -16.13, mag: 2.81 },
	{ name: "Dabih", ra: 20.351, dec: -14.78, mag: 3.05 },
	{ name: "Algedi", ra: 20.300, dec: -12.51, mag: 3.57 },
	{ name: "Nashira", ra: 21.668, dec: -16.66, mag: 3.69 },
	// Aquarius (extra zodiac)
	{ name: "Sadalsuud", ra: 21.526, dec: -5.57, mag: 2.91 },
	{ name: "Sadalmelik", ra: 22.097, dec: -0.32, mag: 2.96 },
	{ name: "Skat", ra: 22.911, dec: -15.82, mag: 3.27 },
	// Pisces (extra zodiac)
	{ name: "Alpherg", ra: 1.524, dec: 15.35, mag: 3.62 },
	{ name: "Alrescha", ra: 2.034, dec: 2.76, mag: 3.82 },
	// Other bright stars
	{ name: "Sirius", ra: 6.752, dec: -16.72, mag: -1.46 },
	{ name: "Canopus", ra: 6.399, dec: -52.70, mag: -0.74 },
	{ name: "Arcturus", ra: 14.261, dec: 19.18, mag: -0.05 },
	{ name: "Vega", ra: 18.616, dec: 38.78, mag: 0.03 },
	{ name: "Capella", ra: 5.278, dec: 46.00, mag: 0.08 },
	{ name: "Procyon", ra: 7.655, dec: 5.22, mag: 0.34 },
	{ name: "Altair", ra: 19.846, dec: 8.87, mag: 0.77 },
	{ name: "Aldebaran", ra: 4.599, dec: 16.51, mag: 0.85 },
	{ name: "Spica", ra: 13.420, dec: -11.16, mag: 0.97 },
	{ name: "Pollux", ra: 7.755, dec: 28.03, mag: 1.14 },
	{ name: "Fomalhaut", ra: 22.961, dec: -29.62, mag: 1.16 },
	{ name: "Regulus", ra: 10.140, dec: 11.97, mag: 1.35 },
	{ name: "Castor", ra: 7.577, dec: 31.89, mag: 1.58 },
	{ name: "Polaris", ra: 2.530, dec: 89.26, mag: 1.98 }
];

// star names to map positions, for drawing the constellation lines
var starLookup = {};
starCatalog.forEach(function (s) {
	starLookup[s.name] = { lon: raToLon(s.ra), lat: s.dec };
});

// Constellation stick figures
var constellationEdges = {
	"Orion": [
		["Betelgeuse", "Bellatrix"], ["Betelgeuse", "Alnitak"],
		["Bellatrix", "Mintaka"], ["Alnitak", "Alnilam"],
		["Alnilam", "Mintaka"], ["Alnitak", "Saiph"], ["Mintaka", "Rigel"]
	],
	"Big Dipper": [
		["Dubhe", "Merak"], ["Merak", "Phecda"], ["Phecda", "Megrez"],
		["Megrez", "Dubhe"], ["Megrez", "Alioth"], ["Alioth", "Mizar"], ["Mizar", "Alkaid"]
	],
	"Cassiopeia": [
		["Caph", "Schedar"], ["Schedar", "Tsih"], ["Tsih", "Ruchbah"], ["Ruchbah", "Segin"]
	],
	"Scorpius": [
		["Acrab", "Dschubba"], ["Dschubba", "Antares"], ["Antares", "Larawag"], ["Larawag", "Shaula"]
	],
	"Crux": [["Acrux", "Gacrux"], ["Mimosa", "Imai"]],
	"Cygnus": [
		["Deneb", "Sadr"], ["Sadr", "Albireo"], ["Sadr", "Gienah Cyg"], ["Sadr", "Fawaris"]
	],
	"Summer Triangle": [["Vega", "Deneb"], ["Deneb", "Altair"], ["Altair", "Vega"]],
	"Taurus": [["Aldebaran", "Elnath"], ["Aldebaran", "Tianguan"]],
	"Leo": [
		["Regulus", "Algieba"], ["Algieba", "Zosma"], ["Zosma", "Denebola"], ["Regulus", "Denebola"]
	],
	"Gemini": [
		["Castor", "Pollux"], ["Castor", "Mebsuta"], ["Mebsuta", "Tejat"], ["Pollux", "Alhena"]
	],
	"Andromeda": [["Alpheratz", "Mirach"], ["Mirach", "Almach"]],
	"Perseus": [["Mirfak", "Algol"]],
	"Pegasus": [
		["Markab", "Scheat"], ["Scheat", "Alpheratz"], ["Alpheratz", "Algenib"], ["Algenib", "Markab"]
	],
	"Aquila": [["Altair", "Tarazed"], ["Altair", "Alshain"]],
	"Canis Major": [
		["Sirius", "Mirzam"], ["Sirius", "Wezen"], ["Wezen", "Adhara"], ["Wezen", "Aludra"]
	],
	"Lyra": [["Vega", "Sheliak"], ["Vega", "Sulafat"], ["Sheliak", "Sulafat"]],
	"Draco": [["Eltanin", "Rastaban"], ["Rastaban", "Eta Dra"]],
	"Sagittarius": [
		["Kaus Australis", "Kaus Media"], ["Kaus Media", "Kaus Borealis"],
		["Kaus Borealis", "Nunki"], ["Nunki", "Ascella"], ["Ascella", "Kaus Australis"]
	],
	"Aries": [["Hamal", "Sheratan"]],
	"Virgo": [["Spica", "Porrima"], ["Porrima", "Vindemiatrix"]],
	"Hercules": [
		["Kornephoros", "Zeta Her"], ["Zeta Her", "Eta Her"],
		["Eta Her", "Pi Her"], ["Pi Her", "Zeta Her"]
	],
	// Additional zodiac constellations
	"Cancer": [
		["Asellus Borealis", "Asellus Australis"], ["Asellus Australis", "Tarf"]
	],
	"Libra": [
		["Zubenelgenubi", "Zubeneschamali"], ["Zubenelgenubi", "Brachium"]
	],
	"Capricornus": [
		["Algedi", "Dabih"], ["Dabih", "Nashira"], ["Nashira", "Deneb Algedi"], ["Deneb Algedi", "Algedi"]
	],
	"Aquarius": [
		["Sadalmelik", "Sadalsuud"], ["Sadalsuud", "Skat"]
	],
	"Pisces": [
		["Alpherg", "Alrescha"]
	]
};

// the twelve zodiac constellations, drawn in the ecliptic's color
var zodiacSet = new Set([
	"Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
	"Libra", "Scorpius", "Sagittarius", "Capricornus", "Aquarius", "Pisces"
]);

// Build star data including random background stars

var starData = starCatalog.map(function(s) {
	return {
		longitude: raToLon(s.ra),
		latitude: s.dec,
		name: s.name,
		mag: s.mag
	};
});

// 400 faint random stars fill the rest of the sky
for (var i = 0; i < 400; i++) {
	var ra = Math.random() * 24; // anywhere around the sky
	// asin spreads the stars evenly over the sphere instead of bunching them at the poles
	var dec = Math.asin(2 * Math.random() - 1) * 180 / Math.PI;
	// magnitude 3.5 to 6.5: faint stars
	starData.push({ longitude: raToLon(ra), latitude: dec, mag: 3.5 + Math.random() * 3 });
}

// Build constellation MultiLineString GeoJSON
var constellationFeatures = [];
for (var name in constellationEdges) {
	var edges = constellationEdges[name];
	var coordinates = [];
	for (const [a, b] of edges) {
		var p1 = starLookup[a];
		var p2 = starLookup[b];
		if (p1 && p2) {
			coordinates.push([[p1.lon, p1.lat], [p2.lon, p2.lat]]); // one line segment for each pair of stars
		}
	}
	constellationFeatures.push({
		type: "Feature",
		geometry: { type: "MultiLineString", coordinates: coordinates },
		// the name for the tooltip; isZodiac picks the line's color
		properties: { name: name, isZodiac: zodiacSet.has(name) }
	});
}
var constellationGeoJSON = { type: "FeatureCollection", features: constellationFeatures };

// Build ecliptic curve from ecliptic longitude (split at antimeridian)
// the tilt of Earth's axis: the angle between the ecliptic and the celestial equator
var eps = 23.4393 * Math.PI / 180;
var eclipticRaw = [];
// a point every 2 degrees along the ecliptic, turned into right ascension and declination
for (var lambda = 0; lambda <= 360; lambda += 2) {
	var lr = lambda * Math.PI / 180;
	var dec = Math.asin(Math.sin(eps) * Math.sin(lr)) * 180 / Math.PI;
	var raDeg = Math.atan2(Math.cos(eps) * Math.sin(lr), Math.cos(lr)) * 180 / Math.PI;
	if (raDeg < 0) raDeg += 360;
	var lon = -raDeg; // to map longitude, as in raToLon
	if (lon < -180) lon += 360;
	eclipticRaw.push([lon, dec]);
}
var eclipticSegments = [];
var currentSeg = [];
for (var i = 0; i < eclipticRaw.length; i++) {
	var p = eclipticRaw[i];
	if (currentSeg.length === 0) {
		currentSeg.push(p);
	} else {
		var prev = currentSeg[currentSeg.length - 1];
		if (Math.abs(p[0] - prev[0]) > 180) { // a jump across the map: start a new segment
			eclipticSegments.push(currentSeg);
			currentSeg = [p];
		} else {
			currentSeg.push(p);
		}
	}
}
if (currentSeg.length > 0) eclipticSegments.push(currentSeg);

// Celestial equator (declination 0)
var equatorPoints = [];
for (var lon = -180; lon <= 180; lon += 5) { // a point every 5 degrees
	equatorPoints.push([lon, 0]);
}

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
	panX: "rotateX",    // a sideways drag turns the sky round
	panY: "translateY", // an up or down drag moves it
	projection: am5map.geoEquirectangular(), // a flat map: right ascension across, declination up and down
	homeGeoPoint: { longitude: 0, latitude: 0 }, // home view: centered on 0, 0...
	homeZoomLevel: 1    // ...at the fitted size
}));

// Background sphere
var bgSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
bgSeries.mapPolygons.template.setAll({
	fill: skyColor,    // the sky color...
	fillOpacity: 0.04, // ...as a faint tint
	strokeOpacity: 0   // no outline
});
// one polygon that covers the whole sky
bgSeries.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });

// Graticule
// https://www.amcharts.com/docs/v5/charts/map-chart/graticule-series/
var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
graticuleSeries.mapLines.template.setAll({
	stroke: skyColor,    // grid lines in the sky color...
	strokeOpacity: 0.15, // ...faint...
	strokeWidth: 0.5     // ...and thin
});

// Celestial equator
var equatorSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
equatorSeries.mapLines.template.setAll({
	stroke: equatorColor, // the theme's first color...
	strokeOpacity: 0.7,   // ...a little see-through...
	strokeWidth: 1.2      // ...1.2px wide
});
equatorSeries.data.push({
	geometry: { type: "LineString", coordinates: equatorPoints }
});

// Ecliptic
var eclipticSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
eclipticSeries.mapLines.template.setAll({
	stroke: eclipticColor,  // a contrasting color...
	strokeOpacity: 0.8,     // ...mostly opaque...
	strokeWidth: 1.3,       // ...1.3px wide...
	strokeDasharray: [4, 3] // ...and dashed: 4px dashes, 3px gaps
});
eclipticSeries.data.push({
	geometry: { type: "MultiLineString", coordinates: eclipticSegments }
});

// Constellation lines (the zodiac in the ecliptic's color, the others in the text color)
var constellationSeries = chart.series.push(am5map.MapLineSeries.new(root, {
	geoJSON: constellationGeoJSON // the stick figures built above
}));
constellationSeries.mapLines.template.setAll({
	stroke: textColor,    // the text color...
	strokeWidth: 0.9,     // ...thin...
	strokeOpacity: 0.4,   // ...and faint
	interactive: true,    // the lines react to the pointer
	tooltipText: "{name}" // hover a figure for its name
});
// zodiac figures take the ecliptic's color...
constellationSeries.mapLines.template.adapters.add("stroke", function (value, target) {
	var di = target.dataItem;
	if (di) {
		var ctx = di.dataContext;
		if (ctx && ctx.isZodiac) return eclipticColor;
	}
	return value;
});
// ...and show stronger than the others
constellationSeries.mapLines.template.adapters.add("strokeOpacity", function (value, target) {
	var di = target.dataItem;
	if (di) {
		var ctx = di.dataContext;
		if (ctx && ctx.isZodiac) return 0.85;
	}
	return value;
});
constellationSeries.mapLines.template.states.create("hover", {
	strokeOpacity: 1, // solid...
	strokeWidth: 1.7  // ...and thicker under the pointer
});

// Stars
var starSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

// one star: a dot sized and faded by its magnitude, and a name next to the brightest
starSeries.bullets.push(function (_root, _series, dataItem) {
	var ctx = dataItem.dataContext;
	var mag = ctx.mag != null ? ctx.mag : 5; // a star without a magnitude counts as a faint one
	var sName = ctx.name || "";
	// a lower magnitude is a brighter star: it gets a bigger dot
	var radius = Math.max(0.4, 4 - mag * 0.55);

	var container = am5.Container.new(_root, {});

	var circle = container.children.push(am5.Circle.new(_root, {
		radius: radius,
		fill: textColor, // the text color: works in light and dark
		// the brighter the star, the more opaque
		fillOpacity: mag < 1 ? 1 : mag < 2 ? 0.95 : mag < 3 ? 0.85 : 0.65
	}));

	// named stars get a tooltip with their name and magnitude
	if (sName) {
		circle.set("tooltipText", sName + " (mag " + mag.toFixed(1) + ")");
	}

	// only the brightest named stars, under magnitude 1, get a label
	if (sName && mag < 1.0) {
		container.children.push(am5.Label.new(_root, {
			text: sName,
			fillOpacity: 0.75,  // a little see-through
			fontSize: 9,        // tiny text
			x: radius + 4,      // just right of the dot...
			centerY: am5.p50,   // ...centered on its height
			populateText: false // the name is plain text, not a template
		}));
	}

	// Keep bullet always rendered (fading handled via clipped listener)
	var managing = false;
	container.onPrivate("visible", function () {
		if (managing) return;
		managing = true;
		container.setPrivate("visible", true);
		managing = false;
	});

	return am5.Bullet.new(_root, { sprite: container });
});

starSeries.data.setAll(starData);

// Smooth horizon fade for stars on the back of the globe (no-op on flat projection)
starSeries.events.on("datavalidated", function () {
	for (const di of starSeries.dataItems) {
		if (di.get("clipped")) {
			var sprite = di.bullets?.[0]?.get("sprite");
			if (sprite) sprite.set("opacity", 0.05);
		}
		di.on("clipped", function (clipped) {
			var sprite = di.bullets?.[0]?.get("sprite");
			if (!sprite) return;
			sprite.animate({ key: "opacity", to: clipped ? 0.05 : 1, duration: 400 });
		});
	}
});

// Slow auto-rotation (until the first drag)
var rotAnim = chart.animate({
	key: "rotationX",       // spin the sky...
	from: 0,
	to: 360,                // ...a full turn...
	duration: 180000,       // ...every 3 minutes...
	loops: Infinity,        // ...forever...
	easing: am5.ease.linear // ...at a steady speed
});

// stops the spin for good
function stopRotation() {
	if (rotAnim) {
		rotAnim.stop();
		rotAnim = undefined;
	}
}
chart.chartContainer.events.on("pointerdown", stopRotation); // the first press on the map stops it

// Zoom controls
// https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
zoomControl.homeButton.set("visible", true); // the home button is hidden by default

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
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
- https://cdn.amcharts.com/lib/5/map.js
- https://cdn.amcharts.com/lib/5/themes/Responsive.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
