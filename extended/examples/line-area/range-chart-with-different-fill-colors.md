---
title: "Range Chart with Different Fill Colors"
source: "https://www.amcharts.com/demos/range-chart-with-different-fill-colors/"
category: "line-area"
scraped: "2026-10-08"
---

Two lines with the gap between them filled: green while Open is above Close, red while Close is on top. The color changes exactly where the lines cross.

When to color the gap: Coloring the space between two lines answers “which one is higher?” at a glance, and the width of the band shows by how much. It works for any pair of series in the same units, like income and spending, or a forecast and the actual figures.

Good for:
- Income against spending: surplus and deficit
- Actual figures against a target or forecast
- Two prices or rates that trade places

Think twice when:
- Lines that cross every few points: the colors flicker
- More than two series
- Series in different units: they can’t share an axis

Prompt: Create a range area chart of daily Open and Close values over about a year and a half. Fill the area between the two lines green where Open is above Close and red where Close is above Open, switching exactly where the lines cross. Add a cursor, tooltips and a horizontal scrollbar. Use the amCharts 5 library with its Responsive theme.

## JavaScript

```javascript
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root),
  am5themes_Responsive.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,      // drag the plot to pan sideways...
    panY: true,      // ...and up and down
    wheelX: "panX",  // a horizontal wheel or trackpad swipe pans...
    wheelY: "zoomX", // ...and the vertical wheel zooms in on the dates
  pinchZoomX:true // pinch on a touch screen to zoom in on the dates
  })
);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "none" // a drag pans the plot instead of zooming
  })
);
cursor.lineY.set("visible", false); // only the vertical cursor line, no horizontal one

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true, // fainter grid lines between the labeled ones
      minGridDistance: 70     // at least 70px between the date labels
    }),
    tooltip: am5.Tooltip.new(root, {}) // shows the date under the cursor on the axis
  })
);

var yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root, {
    renderer: am5xy.AxisRendererY.new(root, {})
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series1 = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Open",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "open",
    // filled between the open and close lines instead of down to the axis
    openValueYField: "close",
    valueXField: "date",
    stroke: root.interfaceColors.get("positive"), // the theme's "positive" color, green by default
    fill: root.interfaceColors.get("positive"),
    tooltip: am5.Tooltip.new(root, {
      labelText: "{name}: {valueY}" // the series name and its value
    })
  })
);

series1.fills.template.setAll({
  fillOpacity: 0.6, // the fill between the lines, 60% opaque
  visible: true     // a line series' fill is hidden by default
});

var series2 = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Close",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "close",
    valueXField: "date",
    stroke: root.interfaceColors.get("negative"), // the theme's "negative" color, red by default
    fill: root.interfaceColors.get("negative"),
    tooltip: am5.Tooltip.new(root, {
      labelText: "{name}: {valueY}" // the series name and its value
    })
  })
);

// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal" // a scrollbar along the top, to zoom in on the dates
}));

var data = [{"date":1730235600000,"open":804,"close":775},{"date":1730322000000,"open":808,"close":772},{"date":1730412000000,"open":804,"close":776},{"date":1730498400000,"open":807,"close":780},{"date":1730584800000,"open":811,"close":783},{"date":1730671200000,"open":813,"close":787},{"date":1730757600000,"open":810,"close":783},{"date":1730844000000,"open":815,"close":783},{"date":1730930400000,"open":813,"close":781},{"date":1731016800000,"open":810,"close":777},{"date":1731103200000,"open":811,"close":780},{"date":1731189600000,"open":808,"close":781},{"date":1731276000000,"open":807,"close":779},{"date":1731362400000,"open":809,"close":782},{"date":1731448800000,"open":804,"close":786},{"date":1731535200000,"open":802,"close":784},{"date":1731621600000,"open":797,"close":788},{"date":1731708000000,"open":798,"close":788},{"date":1731794400000,"open":794,"close":787},{"date":1731880800000,"open":793,"close":786},{"date":1731967200000,"open":794,"close":781},{"date":1732053600000,"open":799,"close":782},{"date":1732140000000,"open":803,"close":781},{"date":1732226400000,"open":802,"close":778},{"date":1732312800000,"open":803,"close":780},{"date":1732399200000,"open":799,"close":775},{"date":1732485600000,"open":794,"close":777},{"date":1732572000000,"open":792,"close":776},{"date":1732658400000,"open":793,"close":774},{"date":1732744800000,"open":792,"close":774},{"date":1732831200000,"open":795,"close":777},{"date":1732917600000,"open":791,"close":777},{"date":1733004000000,"open":787,"close":773},{"date":1733090400000,"open":783,"close":774},{"date":1733176800000,"open":780,"close":779},{"date":1733263200000,"open":784,"close":778},{"date":1733349600000,"open":781,"close":779},{"date":1733436000000,"open":780,"close":784},{"date":1733522400000,"open":781,"close":786},{"date":1733608800000,"open":778,"close":790},{"date":1733695200000,"open":777,"close":789},{"date":1733781600000,"open":776,"close":787},{"date":1733868000000,"open":775,"close":783},{"date":1733954400000,"open":773,"close":779},{"date":1734040800000,"open":772,"close":783},{"date":1734127200000,"open":776,"close":780},{"date":1734213600000,"open":777,"close":776},{"date":1734300000000,"open":780,"close":775},{"date":1734386400000,"open":776,"close":774},{"date":1734472800000,"open":779,"close":778},{"date":1734559200000,"open":779,"close":777},{"date":1734645600000,"open":780,"close":776},{"date":1734732000000,"open":778,"close":781},{"date":1734818400000,"open":775,"close":785},{"date":1734904800000,"open":780,"close":790},{"date":1734991200000,"open":777,"close":789},{"date":1735077600000,"open":776,"close":792},{"date":1735164000000,"open":780,"close":797},{"date":1735250400000,"open":776,"close":801},{"date":1735336800000,"open":772,"close":799},{"date":1735423200000,"open":768,"close":801},{"date":1735509600000,"open":768,"close":804},{"date":1735596000000,"open":767,"close":805},{"date":1735682400000,"open":768,"close":803},{"date":1735768800000,"open":765,"close":805},{"date":1735855200000,"open":763,"close":810},{"date":1735941600000,"open":758,"close":807},{"date":1736028000000,"open":762,"close":809},{"date":1736114400000,"open":761,"close":809},{"date":1736200800000,"open":760,"close":813},{"date":1736287200000,"open":758,"close":817},{"date":1736373600000,"open":756,"close":819},{"date":1736460000000,"open":760,"close":820},{"date":1736546400000,"open":759,"close":817},{"date":1736632800000,"open":756,"close":814},{"date":1736719200000,"open":758,"close":813},{"date":1736805600000,"open":756,"close":809},{"date":1736892000000,"open":761,"close":807},{"date":1736978400000,"open":759,"close":802},{"date":1737064800000,"open":763,"close":801},{"date":1737151200000,"open":763,"close":797},{"date":1737237600000,"open":762,"close":800},{"date":1737324000000,"open":757,"close":799},{"date":1737410400000,"open":761,"close":796},{"date":1737496800000,"open":763,"close":800},{"date":1737583200000,"open":766,"close":795},{"date":1737669600000,"open":766,"close":794},{"date":1737756000000,"open":762,"close":796},{"date":1737842400000,"open":765,"close":798},{"date":1737928800000,"open":760,"close":795},{"date":1738015200000,"open":757,"close":795},{"date":1738101600000,"open":756,"close":794},{"date":1738188000000,"open":751,"close":796},{"date":1738274400000,"open":753,"close":793},{"date":1738360800000,"open":752,"close":794},{"date":1738447200000,"open":755,"close":791},{"date":1738533600000,"open":760,"close":788},{"date":1738620000000,"open":763,"close":790},{"date":1738706400000,"open":762,"close":787},{"date":1738792800000,"open":764,"close":783},{"date":1738879200000,"open":760,"close":787},{"date":1738965600000,"open":762,"close":783},{"date":1739052000000,"open":763,"close":786},{"date":1739138400000,"open":763,"close":787},{"date":1739224800000,"open":759,"close":785},{"date":1739311200000,"open":761,"close":782},{"date":1739397600000,"open":766,"close":779},{"date":1739484000000,"open":770,"close":780},{"date":1739570400000,"open":775,"close":780},{"date":1739656800000,"open":775,"close":785},{"date":1739743200000,"open":777,"close":781},{"date":1739829600000,"open":782,"close":783},{"date":1739916000000,"open":779,"close":779},{"date":1740002400000,"open":777,"close":775},{"date":1740088800000,"open":778,"close":779},{"date":1740175200000,"open":777,"close":775},{"date":1740261600000,"open":775,"close":777},{"date":1740348000000,"open":772,"close":774},{"date":1740434400000,"open":773,"close":774},{"date":1740520800000,"open":769,"close":779},{"date":1740607200000,"open":769,"close":780},{"date":1740693600000,"open":764,"close":782},{"date":1740780000000,"open":763,"close":780},{"date":1740866400000,"open":762,"close":779},{"date":1740952800000,"open":762,"close":779},{"date":1741039200000,"open":758,"close":776},{"date":1741125600000,"open":761,"close":778},{"date":1741212000000,"open":764,"close":775},{"date":1741298400000,"open":760,"close":780},{"date":1741384800000,"open":760,"close":780},{"date":1741471200000,"open":762,"close":778},{"date":1741557600000,"open":759,"close":779},{"date":1741644000000,"open":755,"close":775},{"date":1741730400000,"open":758,"close":773},{"date":1741816800000,"open":755,"close":768},{"date":1741903200000,"open":758,"close":767},{"date":1741989600000,"open":760,"close":770},{"date":1742076000000,"open":758,"close":769},{"date":1742162400000,"open":758,"close":770},{"date":1742248800000,"open":761,"close":772},{"date":1742335200000,"open":765,"close":770},{"date":1742421600000,"open":769,"close":772},{"date":1742508000000,"open":771,"close":768},{"date":1742594400000,"open":770,"close":768},{"date":1742680800000,"open":769,"close":764},{"date":1742767200000,"open":771,"close":768},{"date":1742853600000,"open":775,"close":770},{"date":1742940000000,"open":779,"close":766},{"date":1743026400000,"open":778,"close":766},{"date":1743109200000,"open":776,"close":763},{"date":1743195600000,"open":778,"close":762},{"date":1743282000000,"open":779,"close":765},{"date":1743368400000,"open":782,"close":762},{"date":1743454800000,"open":778,"close":763},{"date":1743541200000,"open":774,"close":761},{"date":1743627600000,"open":772,"close":762},{"date":1743714000000,"open":772,"close":759},{"date":1743800400000,"open":775,"close":757},{"date":1743886800000,"open":774,"close":753},{"date":1743973200000,"open":772,"close":752},{"date":1744059600000,"open":770,"close":756},{"date":1744146000000,"open":772,"close":752},{"date":1744232400000,"open":773,"close":753},{"date":1744318800000,"open":775,"close":758},{"date":1744405200000,"open":778,"close":760},{"date":1744491600000,"open":779,"close":759},{"date":1744578000000,"open":776,"close":759},{"date":1744664400000,"open":778,"close":756},{"date":1744750800000,"open":773,"close":755},{"date":1744837200000,"open":770,"close":752},{"date":1744923600000,"open":768,"close":753},{"date":1745010000000,"open":768,"close":758},{"date":1745096400000,"open":768,"close":760},{"date":1745182800000,"open":770,"close":764},{"date":1745269200000,"open":772,"close":762},{"date":1745355600000,"open":777,"close":758},{"date":1745442000000,"open":776,"close":761},{"date":1745528400000,"open":779,"close":765},{"date":1745614800000,"open":777,"close":768},{"date":1745701200000,"open":775,"close":768},{"date":1745787600000,"open":774,"close":768},{"date":1745874000000,"open":779,"close":765},{"date":1745960400000,"open":783,"close":765},{"date":1746046800000,"open":787,"close":767},{"date":1746133200000,"open":787,"close":770},{"date":1746219600000,"open":785,"close":766},{"date":1746306000000,"open":784,"close":767},{"date":1746392400000,"open":779,"close":765},{"date":1746478800000,"open":782,"close":769},{"date":1746565200000,"open":780,"close":774},{"date":1746651600000,"open":777,"close":772},{"date":1746738000000,"open":782,"close":771},{"date":1746824400000,"open":779,"close":772},{"date":1746910800000,"open":781,"close":772},{"date":1746997200000,"open":785,"close":770},{"date":1747083600000,"open":784,"close":773},{"date":1747170000000,"open":781,"close":771},{"date":1747256400000,"open":784,"close":768},{"date":1747342800000,"open":786,"close":765},{"date":1747429200000,"open":785,"close":766},{"date":1747515600000,"open":785,"close":762},{"date":1747602000000,"open":787,"close":764},{"date":1747688400000,"open":784,"close":764},{"date":1747774800000,"open":781,"close":768},{"date":1747861200000,"open":779,"close":767},{"date":1747947600000,"open":776,"close":771},{"date":1748034000000,"open":777,"close":774},{"date":1748120400000,"open":777,"close":769},{"date":1748206800000,"open":775,"close":774},{"date":1748293200000,"open":775,"close":773},{"date":1748379600000,"open":774,"close":772},{"date":1748466000000,"open":771,"close":775},{"date":1748552400000,"open":767,"close":773},{"date":1748638800000,"open":768,"close":771},{"date":1748725200000,"open":770,"close":770},{"date":1748811600000,"open":769,"close":772},{"date":1748898000000,"open":771,"close":771},{"date":1748984400000,"open":770,"close":770},{"date":1749070800000,"open":772,"close":775},{"date":1749157200000,"open":770,"close":773},{"date":1749243600000,"open":771,"close":771},{"date":1749330000000,"open":770,"close":767},{"date":1749416400000,"open":770,"close":763},{"date":1749502800000,"open":772,"close":766},{"date":1749589200000,"open":776,"close":768},{"date":1749675600000,"open":776,"close":771},{"date":1749762000000,"open":781,"close":767},{"date":1749848400000,"open":782,"close":764},{"date":1749934800000,"open":780,"close":760},{"date":1750021200000,"open":784,"close":757},{"date":1750107600000,"open":780,"close":757},{"date":1750194000000,"open":781,"close":757},{"date":1750280400000,"open":783,"close":756},{"date":1750366800000,"open":784,"close":753},{"date":1750453200000,"open":789,"close":757},{"date":1750539600000,"open":788,"close":760},{"date":1750626000000,"open":785,"close":758},{"date":1750712400000,"open":785,"close":756},{"date":1750798800000,"open":789,"close":760},{"date":1750885200000,"open":789,"close":756},{"date":1750971600000,"open":786,"close":757},{"date":1751058000000,"open":786,"close":760},{"date":1751144400000,"open":790,"close":763},{"date":1751230800000,"open":793,"close":762},{"date":1751317200000,"open":788,"close":759},{"date":1751403600000,"open":784,"close":756},{"date":1751490000000,"open":788,"close":757},{"date":1751576400000,"open":785,"close":753},{"date":1751662800000,"open":788,"close":750},{"date":1751749200000,"open":788,"close":754},{"date":1751835600000,"open":790,"close":754},{"date":1751922000000,"open":794,"close":757},{"date":1752008400000,"open":790,"close":753},{"date":1752094800000,"open":791,"close":749},{"date":1752181200000,"open":794,"close":750},{"date":1752267600000,"open":798,"close":751},{"date":1752354000000,"open":802,"close":754},{"date":1752440400000,"open":799,"close":753},{"date":1752526800000,"open":799,"close":756},{"date":1752613200000,"open":803,"close":751},{"date":1752699600000,"open":798,"close":755},{"date":1752786000000,"open":802,"close":758},{"date":1752872400000,"open":802,"close":757},{"date":1752958800000,"open":806,"close":754},{"date":1753045200000,"open":806,"close":755},{"date":1753131600000,"open":810,"close":750},{"date":1753218000000,"open":815,"close":748},{"date":1753304400000,"open":814,"close":744},{"date":1753390800000,"open":811,"close":747},{"date":1753477200000,"open":806,"close":751},{"date":1753563600000,"open":808,"close":752},{"date":1753650000000,"open":809,"close":756},{"date":1753736400000,"open":808,"close":759},{"date":1753822800000,"open":809,"close":763},{"date":1753909200000,"open":811,"close":766},{"date":1753995600000,"open":811,"close":767},{"date":1754082000000,"open":809,"close":763},{"date":1754168400000,"open":809,"close":762},{"date":1754254800000,"open":813,"close":766},{"date":1754341200000,"open":814,"close":770},{"date":1754427600000,"open":811,"close":766},{"date":1754514000000,"open":810,"close":768},{"date":1754600400000,"open":806,"close":770},{"date":1754686800000,"open":807,"close":769},{"date":1754773200000,"open":811,"close":768},{"date":1754859600000,"open":815,"close":773},{"date":1754946000000,"open":817,"close":776},{"date":1755032400000,"open":813,"close":777},{"date":1755118800000,"open":815,"close":776},{"date":1755205200000,"open":814,"close":775},{"date":1755291600000,"open":815,"close":777},{"date":1755378000000,"open":814,"close":774},{"date":1755464400000,"open":810,"close":770},{"date":1755550800000,"open":809,"close":769},{"date":1755637200000,"open":810,"close":765},{"date":1755723600000,"open":812,"close":767},{"date":1755810000000,"open":817,"close":771},{"date":1755896400000,"open":816,"close":772},{"date":1755982800000,"open":812,"close":774},{"date":1756069200000,"open":811,"close":769},{"date":1756155600000,"open":814,"close":773},{"date":1756242000000,"open":813,"close":774},{"date":1756328400000,"open":815,"close":778},{"date":1756414800000,"open":812,"close":775},{"date":1756501200000,"open":809,"close":771},{"date":1756587600000,"open":810,"close":773},{"date":1756674000000,"open":813,"close":772},{"date":1756760400000,"open":809,"close":771},{"date":1756846800000,"open":808,"close":773},{"date":1756933200000,"open":813,"close":776},{"date":1757019600000,"open":814,"close":776},{"date":1757106000000,"open":813,"close":780},{"date":1757192400000,"open":816,"close":784},{"date":1757278800000,"open":817,"close":782},{"date":1757365200000,"open":816,"close":784},{"date":1757451600000,"open":814,"close":782},{"date":1757538000000,"open":813,"close":778},{"date":1757624400000,"open":810,"close":779},{"date":1757710800000,"open":807,"close":784},{"date":1757797200000,"open":811,"close":786},{"date":1757883600000,"open":809,"close":789},{"date":1757970000000,"open":808,"close":784},{"date":1758056400000,"open":807,"close":785},{"date":1758142800000,"open":811,"close":786},{"date":1758229200000,"open":807,"close":787},{"date":1758315600000,"open":812,"close":788},{"date":1758402000000,"open":815,"close":792},{"date":1758488400000,"open":814,"close":793},{"date":1758574800000,"open":819,"close":788},{"date":1758661200000,"open":815,"close":792},{"date":1758747600000,"open":813,"close":793},{"date":1758834000000,"open":817,"close":790},{"date":1758920400000,"open":819,"close":789},{"date":1759006800000,"open":816,"close":789},{"date":1759093200000,"open":813,"close":786},{"date":1759179600000,"open":816,"close":787},{"date":1759266000000,"open":815,"close":783},{"date":1759352400000,"open":817,"close":788},{"date":1759438800000,"open":819,"close":786},{"date":1759525200000,"open":816,"close":786},{"date":1759611600000,"open":818,"close":789},{"date":1759698000000,"open":820,"close":791},{"date":1759784400000,"open":821,"close":787},{"date":1759870800000,"open":816,"close":785},{"date":1759957200000,"open":820,"close":782},{"date":1760043600000,"open":819,"close":781},{"date":1760130000000,"open":821,"close":781},{"date":1760216400000,"open":818,"close":778},{"date":1760302800000,"open":813,"close":778},{"date":1760389200000,"open":809,"close":781},{"date":1760475600000,"open":804,"close":782},{"date":1760562000000,"open":804,"close":783},{"date":1760648400000,"open":799,"close":787},{"date":1760734800000,"open":795,"close":784},{"date":1760821200000,"open":798,"close":782},{"date":1760907600000,"open":801,"close":779},{"date":1760994000000,"open":803,"close":783},{"date":1761080400000,"open":807,"close":781},{"date":1761166800000,"open":805,"close":785},{"date":1761253200000,"open":803,"close":786},{"date":1761339600000,"open":804,"close":788},{"date":1761426000000,"open":804,"close":791},{"date":1761512400000,"open":808,"close":795},{"date":1761598800000,"open":805,"close":793},{"date":1761685200000,"open":806,"close":794},{"date":1761771600000,"open":809,"close":796},{"date":1761861600000,"open":810,"close":798},{"date":1761948000000,"open":808,"close":795},{"date":1762034400000,"open":811,"close":796},{"date":1762120800000,"open":809,"close":797},{"date":1762207200000,"open":804,"close":798},{"date":1762293600000,"open":807,"close":794},{"date":1762380000000,"open":803,"close":794},{"date":1762466400000,"open":803,"close":791},{"date":1762552800000,"open":804,"close":792},{"date":1762639200000,"open":809,"close":793},{"date":1762725600000,"open":811,"close":791},{"date":1762812000000,"open":808,"close":793},{"date":1762898400000,"open":803,"close":795},{"date":1762984800000,"open":805,"close":797},{"date":1763071200000,"open":809,"close":798},{"date":1763157600000,"open":807,"close":798},{"date":1763244000000,"open":804,"close":795},{"date":1763330400000,"open":801,"close":796},{"date":1763416800000,"open":798,"close":796},{"date":1763503200000,"open":794,"close":796},{"date":1763589600000,"open":791,"close":798},{"date":1763676000000,"open":787,"close":795},{"date":1763762400000,"open":784,"close":791},{"date":1763848800000,"open":785,"close":789},{"date":1763935200000,"open":789,"close":791},{"date":1764021600000,"open":785,"close":788},{"date":1764108000000,"open":788,"close":786},{"date":1764194400000,"open":791,"close":783},{"date":1764280800000,"open":796,"close":779},{"date":1764367200000,"open":792,"close":776},{"date":1764453600000,"open":788,"close":774},{"date":1764540000000,"open":793,"close":779},{"date":1764626400000,"open":795,"close":782},{"date":1764712800000,"open":799,"close":787},{"date":1764799200000,"open":800,"close":787},{"date":1764885600000,"open":798,"close":790},{"date":1764972000000,"open":801,"close":795},{"date":1765058400000,"open":801,"close":793},{"date":1765144800000,"open":799,"close":791},{"date":1765231200000,"open":797,"close":795},{"date":1765317600000,"open":801,"close":795},{"date":1765404000000,"open":800,"close":798},{"date":1765490400000,"open":803,"close":802},{"date":1765576800000,"open":799,"close":802},{"date":1765663200000,"open":800,"close":802},{"date":1765749600000,"open":797,"close":801},{"date":1765836000000,"open":796,"close":805},{"date":1765922400000,"open":797,"close":810},{"date":1766008800000,"open":797,"close":809},{"date":1766095200000,"open":799,"close":813},{"date":1766181600000,"open":803,"close":810},{"date":1766268000000,"open":802,"close":809},{"date":1766354400000,"open":798,"close":813},{"date":1766440800000,"open":795,"close":811},{"date":1766527200000,"open":793,"close":807},{"date":1766613600000,"open":790,"close":805},{"date":1766700000000,"open":791,"close":806},{"date":1766786400000,"open":790,"close":811},{"date":1766872800000,"open":793,"close":814},{"date":1766959200000,"open":789,"close":814},{"date":1767045600000,"open":785,"close":810},{"date":1767132000000,"open":782,"close":805},{"date":1767218400000,"open":778,"close":805},{"date":1767304800000,"open":783,"close":804},{"date":1767391200000,"open":784,"close":808},{"date":1767477600000,"open":787,"close":804},{"date":1767564000000,"open":786,"close":807},{"date":1767650400000,"open":782,"close":803},{"date":1767736800000,"open":786,"close":804},{"date":1767823200000,"open":785,"close":805},{"date":1767909600000,"open":786,"close":810},{"date":1767996000000,"open":782,"close":812},{"date":1768082400000,"open":779,"close":809},{"date":1768168800000,"open":775,"close":807},{"date":1768255200000,"open":772,"close":809},{"date":1768341600000,"open":776,"close":806},{"date":1768428000000,"open":775,"close":806},{"date":1768514400000,"open":771,"close":804},{"date":1768600800000,"open":775,"close":808},{"date":1768687200000,"open":774,"close":810},{"date":1768773600000,"open":775,"close":813},{"date":1768860000000,"open":777,"close":817},{"date":1768946400000,"open":779,"close":815},{"date":1769032800000,"open":781,"close":815},{"date":1769119200000,"open":779,"close":815},{"date":1769205600000,"open":778,"close":811},{"date":1769292000000,"open":773,"close":812},{"date":1769378400000,"open":769,"close":813},{"date":1769464800000,"open":772,"close":811},{"date":1769551200000,"open":767,"close":815},{"date":1769637600000,"open":764,"close":816},{"date":1769724000000,"open":759,"close":811},{"date":1769810400000,"open":759,"close":813},{"date":1769896800000,"open":763,"close":816},{"date":1769983200000,"open":764,"close":815},{"date":1770069600000,"open":761,"close":817},{"date":1770156000000,"open":759,"close":816},{"date":1770242400000,"open":759,"close":814},{"date":1770328800000,"open":761,"close":809},{"date":1770415200000,"open":764,"close":810},{"date":1770501600000,"open":763,"close":813},{"date":1770588000000,"open":759,"close":810},{"date":1770674400000,"open":757,"close":808},{"date":1770760800000,"open":758,"close":804},{"date":1770847200000,"open":757,"close":808},{"date":1770933600000,"open":755,"close":808},{"date":1771020000000,"open":753,"close":812},{"date":1771106400000,"open":751,"close":810},{"date":1771192800000,"open":754,"close":814},{"date":1771279200000,"open":750,"close":818},{"date":1771365600000,"open":746,"close":814},{"date":1771452000000,"open":742,"close":810},{"date":1771538400000,"open":743,"close":806},{"date":1771624800000,"open":740,"close":810},{"date":1771711200000,"open":744,"close":812},{"date":1771797600000,"open":740,"close":812},{"date":1771884000000,"open":742,"close":808},{"date":1771970400000,"open":741,"close":809},{"date":1772056800000,"open":738,"close":807},{"date":1772143200000,"open":738,"close":809},{"date":1772229600000,"open":737,"close":809},{"date":1772316000000,"open":733,"close":808},{"date":1772402400000,"open":730,"close":807},{"date":1772488800000,"open":729,"close":807},{"date":1772575200000,"open":725,"close":812},{"date":1772661600000,"open":720,"close":812},{"date":1772748000000,"open":716,"close":814},{"date":1772834400000,"open":711,"close":814},{"date":1772920800000,"open":710,"close":810},{"date":1773007200000,"open":714,"close":810},{"date":1773093600000,"open":712,"close":815},{"date":1773180000000,"open":715,"close":812},{"date":1773266400000,"open":718,"close":813},{"date":1773352800000,"open":717,"close":809}];
series1.data.setAll(data);
series2.data.setAll(data);

// create ranges
var i = 0;
var baseInterval = xAxis.get("baseInterval"); // one day
var baseDuration = xAxis.baseDuration();      // a day in milliseconds
var rangeDataItem;

// wherever close is above open, an axis range repaints that stretch of the fill in the close color
am5.array.each(series1.dataItems, function (s1DataItem) {
  var s1PreviousDataItem;
  var s2PreviousDataItem;

  var s2DataItem = series2.dataItems[i];

  if (i > 0) {
    s1PreviousDataItem = series1.dataItems[i - 1];
    s2PreviousDataItem = series2.dataItems[i - 1];
  }

  var startTime = am5.time // the start of this point's day
    .round(
      new Date(s1DataItem.get("valueX")),
      baseInterval.timeUnit,
      baseInterval.count
    )
    .getTime();

  // intersections
  if (s1PreviousDataItem && s2PreviousDataItem) {
    var x0 = // the middle of the previous day, where its point is drawn
      am5.time
        .round(
          new Date(s1PreviousDataItem.get("valueX")),
          baseInterval.timeUnit,
          baseInterval.count
        )
        .getTime() +
      baseDuration / 2;
    var y01 = s1PreviousDataItem.get("valueY");
    var y02 = s2PreviousDataItem.get("valueY");

    var x1 = startTime + baseDuration / 2; // the middle of this day
    var y11 = s1DataItem.get("valueY");
    var y12 = s2DataItem.get("valueY");

    var intersection = getLineIntersection(
      { x: x0, y: y01 },
      { x: x1, y: y11 },
      { x: x0, y: y02 },
      { x: x1, y: y12 }
    );

    // start or end the range where the two lines cross, not on the day itself
    startTime = Math.round(intersection.x);
  }

  // start range here
  if (s2DataItem.get("valueY") > s1DataItem.get("valueY")) {
    if (!rangeDataItem) {
      rangeDataItem = xAxis.makeDataItem({});
      var range = series1.createAxisRange(rangeDataItem); // a stretch of series1 drawn in other colors
      rangeDataItem.set("value", startTime);
      // Only the colors change: opacity and line width come from series1
      range.fills.template.setAll({
        fill: series2.get("fill"),
        visible: true // the range's fill is turned on, like the series' own
      });
      range.strokes.template.setAll({
        stroke: series1.get("stroke")
      });
    }
  } else {
    // the close is back under the open: end the colored range here
    if (rangeDataItem) {
      rangeDataItem.set("endValue", startTime);
    }

    rangeDataItem = undefined;
  }
  // end if last
  if (i == series1.dataItems.length - 1) {
    if (rangeDataItem) {
      rangeDataItem.set(
        "endValue",
        s1DataItem.get("valueX") + baseDuration / 2
      );
      rangeDataItem = undefined;
    }
  }

  i++;
});

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series1.appear(1000);
series2.appear(1000);
chart.appear(1000, 100);

// the point where line A1-A2 crosses line B1-B2
function getLineIntersection(pointA1, pointA2, pointB1, pointB2) {
  let x =
    ((pointA1.x * pointA2.y - pointA2.x * pointA1.y) * (pointB1.x - pointB2.x) -
      (pointA1.x - pointA2.x) *
        (pointB1.x * pointB2.y - pointB1.y * pointB2.x)) /
    ((pointA1.x - pointA2.x) * (pointB1.y - pointB2.y) -
      (pointA1.y - pointA2.y) * (pointB1.x - pointB2.x));
  let y =
    ((pointA1.x * pointA2.y - pointA2.x * pointA1.y) * (pointB1.y - pointB2.y) -
      (pointA1.y - pointA2.y) *
        (pointB1.x * pointB2.y - pointB1.y * pointB2.x)) /
    ((pointA1.x - pointA2.x) * (pointB1.y - pointB2.y) -
      (pointA1.y - pointA2.y) * (pointB1.x - pointB2.x));
  return { x: x, y: y };
}
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
