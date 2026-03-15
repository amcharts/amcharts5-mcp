---
title: "Range Chart with Different Fill Colors"
source: "https://www.amcharts.com/demos/range-chart-with-different-fill-colors/"
category: "line-area"
scraped: "2026-03-15"
---

Range charts are great for displaying the delta between two values at a specific point. Data sets with a small number of discreet values are easy to represent with a floating column chart and those are easy to color according to the trend in data. But when you have more and/or continuous (eg. date-based) values floating columns become less than optimal. 
So, you display the range as an area chart. But now you have a problem of displaying the positive/negative trends in data differently. Luckily, you are using amCharts and it has all the tools you need to complete the task.
Key implementation details
As mentioned, we are displaying the range via an area chart (LineSeries with both valueYField and openValueYField set, and a non-transparent fill). And to color the parts differently we go through the data, determine intersection points where open value becomes less than close (and vice versa), and create axis ranges on the series to fill those sections differently.
Line series
Series axis ranges

## JavaScript

```javascript

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(
  am5xy.XYChart.new(root, {
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX",
  pinchZoomX:true
  })
);

chart.get("colors").set("step", 5);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set(
  "cursor",
  am5xy.XYCursor.new(root, {
    behavior: "none"
  })
);
cursor.lineY.set("visible", false);

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(
  am5xy.DateAxis.new(root, {
    baseInterval: { timeUnit: "day", count: 1 },
    renderer: am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true,
      minGridDistance: 70
    }),
    tooltip: am5.Tooltip.new(root, {})
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
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "open",
    openValueYField: "close",
    valueXField: "date",
    stroke: root.interfaceColors.get("positive"),
    fill: root.interfaceColors.get("positive"),
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}"
    })
  })
);

series1.fills.template.setAll({
  fillOpacity: 0.6,
  visible: true
});

var series2 = chart.series.push(
  am5xy.LineSeries.new(root, {
    name: "Series",
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "close",
    valueXField: "date",
    stroke: root.interfaceColors.get("negative"),
    fill: root.interfaceColors.get("negative"),
    tooltip: am5.Tooltip.new(root, {
      labelText: "{valueY}"
    })
  })
);

//series1.strokes.template.set("strokeWidth", 2);
//series2.strokes.template.set("strokeWidth", 2);


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

var data = [{"date":1635541200000,"open":804,"close":775},{"date":1635627600000,"open":808,"close":772},{"date":1635717600000,"open":804,"close":776},{"date":1635804000000,"open":807,"close":780},{"date":1635890400000,"open":811,"close":783},{"date":1635976800000,"open":813,"close":787},{"date":1636063200000,"open":810,"close":783},{"date":1636149600000,"open":815,"close":783},{"date":1636236000000,"open":813,"close":781},{"date":1636322400000,"open":810,"close":777},{"date":1636408800000,"open":811,"close":780},{"date":1636495200000,"open":808,"close":781},{"date":1636581600000,"open":807,"close":779},{"date":1636668000000,"open":809,"close":782},{"date":1636754400000,"open":804,"close":786},{"date":1636840800000,"open":802,"close":784},{"date":1636927200000,"open":797,"close":788},{"date":1637013600000,"open":798,"close":788},{"date":1637100000000,"open":794,"close":787},{"date":1637186400000,"open":793,"close":786},{"date":1637272800000,"open":794,"close":781},{"date":1637359200000,"open":799,"close":782},{"date":1637445600000,"open":803,"close":781},{"date":1637532000000,"open":802,"close":778},{"date":1637618400000,"open":803,"close":780},{"date":1637704800000,"open":799,"close":775},{"date":1637791200000,"open":794,"close":777},{"date":1637877600000,"open":792,"close":776},{"date":1637964000000,"open":793,"close":774},{"date":1638050400000,"open":792,"close":774},{"date":1638136800000,"open":795,"close":777},{"date":1638223200000,"open":791,"close":777},{"date":1638309600000,"open":787,"close":773},{"date":1638396000000,"open":783,"close":774},{"date":1638482400000,"open":780,"close":779},{"date":1638568800000,"open":784,"close":778},{"date":1638655200000,"open":781,"close":779},{"date":1638741600000,"open":780,"close":784},{"date":1638828000000,"open":781,"close":786},{"date":1638914400000,"open":778,"close":790},{"date":1639000800000,"open":777,"close":789},{"date":1639087200000,"open":776,"close":787},{"date":1639173600000,"open":775,"close":783},{"date":1639260000000,"open":773,"close":779},{"date":1639346400000,"open":772,"close":783},{"date":1639432800000,"open":776,"close":780},{"date":1639519200000,"open":777,"close":776},{"date":1639605600000,"open":780,"close":775},{"date":1639692000000,"open":776,"close":774},{"date":1639778400000,"open":779,"close":778},{"date":1639864800000,"open":779,"close":777},{"date":1639951200000,"open":780,"close":776},{"date":1640037600000,"open":778,"close":781},{"date":1640124000000,"open":775,"close":785},{"date":1640210400000,"open":780,"close":790},{"date":1640296800000,"open":777,"close":789},{"date":1640383200000,"open":776,"close":792},{"date":1640469600000,"open":780,"close":797},{"date":1640556000000,"open":776,"close":801},{"date":1640642400000,"open":772,"close":799},{"date":1640728800000,"open":768,"close":801},{"date":1640815200000,"open":768,"close":804},{"date":1640901600000,"open":767,"close":805},{"date":1640988000000,"open":768,"close":803},{"date":1641074400000,"open":765,"close":805},{"date":1641160800000,"open":763,"close":810},{"date":1641247200000,"open":758,"close":807},{"date":1641333600000,"open":762,"close":809},{"date":1641420000000,"open":761,"close":809},{"date":1641506400000,"open":760,"close":813},{"date":1641592800000,"open":758,"close":817},{"date":1641679200000,"open":756,"close":819},{"date":1641765600000,"open":760,"close":820},{"date":1641852000000,"open":759,"close":817},{"date":1641938400000,"open":756,"close":814},{"date":1642024800000,"open":758,"close":813},{"date":1642111200000,"open":756,"close":809},{"date":1642197600000,"open":761,"close":807},{"date":1642284000000,"open":759,"close":802},{"date":1642370400000,"open":763,"close":801},{"date":1642456800000,"open":763,"close":797},{"date":1642543200000,"open":762,"close":800},{"date":1642629600000,"open":757,"close":799},{"date":1642716000000,"open":761,"close":796},{"date":1642802400000,"open":763,"close":800},{"date":1642888800000,"open":766,"close":795},{"date":1642975200000,"open":766,"close":794},{"date":1643061600000,"open":762,"close":796},{"date":1643148000000,"open":765,"close":798},{"date":1643234400000,"open":760,"close":795},{"date":1643320800000,"open":757,"close":795},{"date":1643407200000,"open":756,"close":794},{"date":1643493600000,"open":751,"close":796},{"date":1643580000000,"open":753,"close":793},{"date":1643666400000,"open":752,"close":794},{"date":1643752800000,"open":755,"close":791},{"date":1643839200000,"open":760,"close":788},{"date":1643925600000,"open":763,"close":790},{"date":1644012000000,"open":762,"close":787},{"date":1644098400000,"open":764,"close":783},{"date":1644184800000,"open":760,"close":787},{"date":1644271200000,"open":762,"close":783},{"date":1644357600000,"open":763,"close":786},{"date":1644444000000,"open":763,"close":787},{"date":1644530400000,"open":759,"close":785},{"date":1644616800000,"open":761,"close":782},{"date":1644703200000,"open":766,"close":779},{"date":1644789600000,"open":770,"close":780},{"date":1644876000000,"open":775,"close":780},{"date":1644962400000,"open":775,"close":785},{"date":1645048800000,"open":777,"close":781},{"date":1645135200000,"open":782,"close":783},{"date":1645221600000,"open":779,"close":779},{"date":1645308000000,"open":777,"close":775},{"date":1645394400000,"open":778,"close":779},{"date":1645480800000,"open":777,"close":775},{"date":1645567200000,"open":775,"close":777},{"date":1645653600000,"open":772,"close":774},{"date":1645740000000,"open":773,"close":774},{"date":1645826400000,"open":769,"close":779},{"date":1645912800000,"open":769,"close":780},{"date":1645999200000,"open":764,"close":782},{"date":1646085600000,"open":763,"close":780},{"date":1646172000000,"open":762,"close":779},{"date":1646258400000,"open":762,"close":779},{"date":1646344800000,"open":758,"close":776},{"date":1646431200000,"open":761,"close":778},{"date":1646517600000,"open":764,"close":775},{"date":1646604000000,"open":760,"close":780},{"date":1646690400000,"open":760,"close":780},{"date":1646776800000,"open":762,"close":778},{"date":1646863200000,"open":759,"close":779},{"date":1646949600000,"open":755,"close":775},{"date":1647036000000,"open":758,"close":773},{"date":1647122400000,"open":755,"close":768},{"date":1647208800000,"open":758,"close":767},{"date":1647295200000,"open":760,"close":770},{"date":1647381600000,"open":758,"close":769},{"date":1647468000000,"open":758,"close":770},{"date":1647554400000,"open":761,"close":772},{"date":1647640800000,"open":765,"close":770},{"date":1647727200000,"open":769,"close":772},{"date":1647813600000,"open":771,"close":768},{"date":1647900000000,"open":770,"close":768},{"date":1647986400000,"open":769,"close":764},{"date":1648072800000,"open":771,"close":768},{"date":1648159200000,"open":775,"close":770},{"date":1648245600000,"open":779,"close":766},{"date":1648332000000,"open":778,"close":766},{"date":1648414800000,"open":776,"close":763},{"date":1648501200000,"open":778,"close":762},{"date":1648587600000,"open":779,"close":765},{"date":1648674000000,"open":782,"close":762},{"date":1648760400000,"open":778,"close":763},{"date":1648846800000,"open":774,"close":761},{"date":1648933200000,"open":772,"close":762},{"date":1649019600000,"open":772,"close":759},{"date":1649106000000,"open":775,"close":757},{"date":1649192400000,"open":774,"close":753},{"date":1649278800000,"open":772,"close":752},{"date":1649365200000,"open":770,"close":756},{"date":1649451600000,"open":772,"close":752},{"date":1649538000000,"open":773,"close":753},{"date":1649624400000,"open":775,"close":758},{"date":1649710800000,"open":778,"close":760},{"date":1649797200000,"open":779,"close":759},{"date":1649883600000,"open":776,"close":759},{"date":1649970000000,"open":778,"close":756},{"date":1650056400000,"open":773,"close":755},{"date":1650142800000,"open":770,"close":752},{"date":1650229200000,"open":768,"close":753},{"date":1650315600000,"open":768,"close":758},{"date":1650402000000,"open":768,"close":760},{"date":1650488400000,"open":770,"close":764},{"date":1650574800000,"open":772,"close":762},{"date":1650661200000,"open":777,"close":758},{"date":1650747600000,"open":776,"close":761},{"date":1650834000000,"open":779,"close":765},{"date":1650920400000,"open":777,"close":768},{"date":1651006800000,"open":775,"close":768},{"date":1651093200000,"open":774,"close":768},{"date":1651179600000,"open":779,"close":765},{"date":1651266000000,"open":783,"close":765},{"date":1651352400000,"open":787,"close":767},{"date":1651438800000,"open":787,"close":770},{"date":1651525200000,"open":785,"close":766},{"date":1651611600000,"open":784,"close":767},{"date":1651698000000,"open":779,"close":765},{"date":1651784400000,"open":782,"close":769},{"date":1651870800000,"open":780,"close":774},{"date":1651957200000,"open":777,"close":772},{"date":1652043600000,"open":782,"close":771},{"date":1652130000000,"open":779,"close":772},{"date":1652216400000,"open":781,"close":772},{"date":1652302800000,"open":785,"close":770},{"date":1652389200000,"open":784,"close":773},{"date":1652475600000,"open":781,"close":771},{"date":1652562000000,"open":784,"close":768},{"date":1652648400000,"open":786,"close":765},{"date":1652734800000,"open":785,"close":766},{"date":1652821200000,"open":785,"close":762},{"date":1652907600000,"open":787,"close":764},{"date":1652994000000,"open":784,"close":764},{"date":1653080400000,"open":781,"close":768},{"date":1653166800000,"open":779,"close":767},{"date":1653253200000,"open":776,"close":771},{"date":1653339600000,"open":777,"close":774},{"date":1653426000000,"open":777,"close":769},{"date":1653512400000,"open":775,"close":774},{"date":1653598800000,"open":775,"close":773},{"date":1653685200000,"open":774,"close":772},{"date":1653771600000,"open":771,"close":775},{"date":1653858000000,"open":767,"close":773},{"date":1653944400000,"open":768,"close":771},{"date":1654030800000,"open":770,"close":770},{"date":1654117200000,"open":769,"close":772},{"date":1654203600000,"open":771,"close":771},{"date":1654290000000,"open":770,"close":770},{"date":1654376400000,"open":772,"close":775},{"date":1654462800000,"open":770,"close":773},{"date":1654549200000,"open":771,"close":771},{"date":1654635600000,"open":770,"close":767},{"date":1654722000000,"open":770,"close":763},{"date":1654808400000,"open":772,"close":766},{"date":1654894800000,"open":776,"close":768},{"date":1654981200000,"open":776,"close":771},{"date":1655067600000,"open":781,"close":767},{"date":1655154000000,"open":782,"close":764},{"date":1655240400000,"open":780,"close":760},{"date":1655326800000,"open":784,"close":757},{"date":1655413200000,"open":780,"close":757},{"date":1655499600000,"open":781,"close":757},{"date":1655586000000,"open":783,"close":756},{"date":1655672400000,"open":784,"close":753},{"date":1655758800000,"open":789,"close":757},{"date":1655845200000,"open":788,"close":760},{"date":1655931600000,"open":785,"close":758},{"date":1656018000000,"open":785,"close":756},{"date":1656104400000,"open":789,"close":760},{"date":1656190800000,"open":789,"close":756},{"date":1656277200000,"open":786,"close":757},{"date":1656363600000,"open":786,"close":760},{"date":1656450000000,"open":790,"close":763},{"date":1656536400000,"open":793,"close":762},{"date":1656622800000,"open":788,"close":759},{"date":1656709200000,"open":784,"close":756},{"date":1656795600000,"open":788,"close":757},{"date":1656882000000,"open":785,"close":753},{"date":1656968400000,"open":788,"close":750},{"date":1657054800000,"open":788,"close":754},{"date":1657141200000,"open":790,"close":754},{"date":1657227600000,"open":794,"close":757},{"date":1657314000000,"open":790,"close":753},{"date":1657400400000,"open":791,"close":749},{"date":1657486800000,"open":794,"close":750},{"date":1657573200000,"open":798,"close":751},{"date":1657659600000,"open":802,"close":754},{"date":1657746000000,"open":799,"close":753},{"date":1657832400000,"open":799,"close":756},{"date":1657918800000,"open":803,"close":751},{"date":1658005200000,"open":798,"close":755},{"date":1658091600000,"open":802,"close":758},{"date":1658178000000,"open":802,"close":757},{"date":1658264400000,"open":806,"close":754},{"date":1658350800000,"open":806,"close":755},{"date":1658437200000,"open":810,"close":750},{"date":1658523600000,"open":815,"close":748},{"date":1658610000000,"open":814,"close":744},{"date":1658696400000,"open":811,"close":747},{"date":1658782800000,"open":806,"close":751},{"date":1658869200000,"open":808,"close":752},{"date":1658955600000,"open":809,"close":756},{"date":1659042000000,"open":808,"close":759},{"date":1659128400000,"open":809,"close":763},{"date":1659214800000,"open":811,"close":766},{"date":1659301200000,"open":811,"close":767},{"date":1659387600000,"open":809,"close":763},{"date":1659474000000,"open":809,"close":762},{"date":1659560400000,"open":813,"close":766},{"date":1659646800000,"open":814,"close":770},{"date":1659733200000,"open":811,"close":766},{"date":1659819600000,"open":810,"close":768},{"date":1659906000000,"open":806,"close":770},{"date":1659992400000,"open":807,"close":769},{"date":1660078800000,"open":811,"close":768},{"date":1660165200000,"open":815,"close":773},{"date":1660251600000,"open":817,"close":776},{"date":1660338000000,"open":813,"close":777},{"date":1660424400000,"open":815,"close":776},{"date":1660510800000,"open":814,"close":775},{"date":1660597200000,"open":815,"close":777},{"date":1660683600000,"open":814,"close":774},{"date":1660770000000,"open":810,"close":770},{"date":1660856400000,"open":809,"close":769},{"date":1660942800000,"open":810,"close":765},{"date":1661029200000,"open":812,"close":767},{"date":1661115600000,"open":817,"close":771},{"date":1661202000000,"open":816,"close":772},{"date":1661288400000,"open":812,"close":774},{"date":1661374800000,"open":811,"close":769},{"date":1661461200000,"open":814,"close":773},{"date":1661547600000,"open":813,"close":774},{"date":1661634000000,"open":815,"close":778},{"date":1661720400000,"open":812,"close":775},{"date":1661806800000,"open":809,"close":771},{"date":1661893200000,"open":810,"close":773},{"date":1661979600000,"open":813,"close":772},{"date":1662066000000,"open":809,"close":771},{"date":1662152400000,"open":808,"close":773},{"date":1662238800000,"open":813,"close":776},{"date":1662325200000,"open":814,"close":776},{"date":1662411600000,"open":813,"close":780},{"date":1662498000000,"open":816,"close":784},{"date":1662584400000,"open":817,"close":782},{"date":1662670800000,"open":816,"close":784},{"date":1662757200000,"open":814,"close":782},{"date":1662843600000,"open":813,"close":778},{"date":1662930000000,"open":810,"close":779},{"date":1663016400000,"open":807,"close":784},{"date":1663102800000,"open":811,"close":786},{"date":1663189200000,"open":809,"close":789},{"date":1663275600000,"open":808,"close":784},{"date":1663362000000,"open":807,"close":785},{"date":1663448400000,"open":811,"close":786},{"date":1663534800000,"open":807,"close":787},{"date":1663621200000,"open":812,"close":788},{"date":1663707600000,"open":815,"close":792},{"date":1663794000000,"open":814,"close":793},{"date":1663880400000,"open":819,"close":788},{"date":1663966800000,"open":815,"close":792},{"date":1664053200000,"open":813,"close":793},{"date":1664139600000,"open":817,"close":790},{"date":1664226000000,"open":819,"close":789},{"date":1664312400000,"open":816,"close":789},{"date":1664398800000,"open":813,"close":786},{"date":1664485200000,"open":816,"close":787},{"date":1664571600000,"open":815,"close":783},{"date":1664658000000,"open":817,"close":788},{"date":1664744400000,"open":819,"close":786},{"date":1664830800000,"open":816,"close":786},{"date":1664917200000,"open":818,"close":789},{"date":1665003600000,"open":820,"close":791},{"date":1665090000000,"open":821,"close":787},{"date":1665176400000,"open":816,"close":785},{"date":1665262800000,"open":820,"close":782},{"date":1665349200000,"open":819,"close":781},{"date":1665435600000,"open":821,"close":781},{"date":1665522000000,"open":818,"close":778},{"date":1665608400000,"open":813,"close":778},{"date":1665694800000,"open":809,"close":781},{"date":1665781200000,"open":804,"close":782},{"date":1665867600000,"open":804,"close":783},{"date":1665954000000,"open":799,"close":787},{"date":1666040400000,"open":795,"close":784},{"date":1666126800000,"open":798,"close":782},{"date":1666213200000,"open":801,"close":779},{"date":1666299600000,"open":803,"close":783},{"date":1666386000000,"open":807,"close":781},{"date":1666472400000,"open":805,"close":785},{"date":1666558800000,"open":803,"close":786},{"date":1666645200000,"open":804,"close":788},{"date":1666731600000,"open":804,"close":791},{"date":1666818000000,"open":808,"close":795},{"date":1666904400000,"open":805,"close":793},{"date":1666990800000,"open":806,"close":794},{"date":1667077200000,"open":809,"close":796},{"date":1667167200000,"open":810,"close":798},{"date":1667253600000,"open":808,"close":795},{"date":1667340000000,"open":811,"close":796},{"date":1667426400000,"open":809,"close":797},{"date":1667512800000,"open":804,"close":798},{"date":1667599200000,"open":807,"close":794},{"date":1667685600000,"open":803,"close":794},{"date":1667772000000,"open":803,"close":791},{"date":1667858400000,"open":804,"close":792},{"date":1667944800000,"open":809,"close":793},{"date":1668031200000,"open":811,"close":791},{"date":1668117600000,"open":808,"close":793},{"date":1668204000000,"open":803,"close":795},{"date":1668290400000,"open":805,"close":797},{"date":1668376800000,"open":809,"close":798},{"date":1668463200000,"open":807,"close":798},{"date":1668549600000,"open":804,"close":795},{"date":1668636000000,"open":801,"close":796},{"date":1668722400000,"open":798,"close":796},{"date":1668808800000,"open":794,"close":796},{"date":1668895200000,"open":791,"close":798},{"date":1668981600000,"open":787,"close":795},{"date":1669068000000,"open":784,"close":791},{"date":1669154400000,"open":785,"close":789},{"date":1669240800000,"open":789,"close":791},{"date":1669327200000,"open":785,"close":788},{"date":1669413600000,"open":788,"close":786},{"date":1669500000000,"open":791,"close":783},{"date":1669586400000,"open":796,"close":779},{"date":1669672800000,"open":792,"close":776},{"date":1669759200000,"open":788,"close":774},{"date":1669845600000,"open":793,"close":779},{"date":1669932000000,"open":795,"close":782},{"date":1670018400000,"open":799,"close":787},{"date":1670104800000,"open":800,"close":787},{"date":1670191200000,"open":798,"close":790},{"date":1670277600000,"open":801,"close":795},{"date":1670364000000,"open":801,"close":793},{"date":1670450400000,"open":799,"close":791},{"date":1670536800000,"open":797,"close":795},{"date":1670623200000,"open":801,"close":795},{"date":1670709600000,"open":800,"close":798},{"date":1670796000000,"open":803,"close":802},{"date":1670882400000,"open":799,"close":802},{"date":1670968800000,"open":800,"close":802},{"date":1671055200000,"open":797,"close":801},{"date":1671141600000,"open":796,"close":805},{"date":1671228000000,"open":797,"close":810},{"date":1671314400000,"open":797,"close":809},{"date":1671400800000,"open":799,"close":813},{"date":1671487200000,"open":803,"close":810},{"date":1671573600000,"open":802,"close":809},{"date":1671660000000,"open":798,"close":813},{"date":1671746400000,"open":795,"close":811},{"date":1671832800000,"open":793,"close":807},{"date":1671919200000,"open":790,"close":805},{"date":1672005600000,"open":791,"close":806},{"date":1672092000000,"open":790,"close":811},{"date":1672178400000,"open":793,"close":814},{"date":1672264800000,"open":789,"close":814},{"date":1672351200000,"open":785,"close":810},{"date":1672437600000,"open":782,"close":805},{"date":1672524000000,"open":778,"close":805},{"date":1672610400000,"open":783,"close":804},{"date":1672696800000,"open":784,"close":808},{"date":1672783200000,"open":787,"close":804},{"date":1672869600000,"open":786,"close":807},{"date":1672956000000,"open":782,"close":803},{"date":1673042400000,"open":786,"close":804},{"date":1673128800000,"open":785,"close":805},{"date":1673215200000,"open":786,"close":810},{"date":1673301600000,"open":782,"close":812},{"date":1673388000000,"open":779,"close":809},{"date":1673474400000,"open":775,"close":807},{"date":1673560800000,"open":772,"close":809},{"date":1673647200000,"open":776,"close":806},{"date":1673733600000,"open":775,"close":806},{"date":1673820000000,"open":771,"close":804},{"date":1673906400000,"open":775,"close":808},{"date":1673992800000,"open":774,"close":810},{"date":1674079200000,"open":775,"close":813},{"date":1674165600000,"open":777,"close":817},{"date":1674252000000,"open":779,"close":815},{"date":1674338400000,"open":781,"close":815},{"date":1674424800000,"open":779,"close":815},{"date":1674511200000,"open":778,"close":811},{"date":1674597600000,"open":773,"close":812},{"date":1674684000000,"open":769,"close":813},{"date":1674770400000,"open":772,"close":811},{"date":1674856800000,"open":767,"close":815},{"date":1674943200000,"open":764,"close":816},{"date":1675029600000,"open":759,"close":811},{"date":1675116000000,"open":759,"close":813},{"date":1675202400000,"open":763,"close":816},{"date":1675288800000,"open":764,"close":815},{"date":1675375200000,"open":761,"close":817},{"date":1675461600000,"open":759,"close":816},{"date":1675548000000,"open":759,"close":814},{"date":1675634400000,"open":761,"close":809},{"date":1675720800000,"open":764,"close":810},{"date":1675807200000,"open":763,"close":813},{"date":1675893600000,"open":759,"close":810},{"date":1675980000000,"open":757,"close":808},{"date":1676066400000,"open":758,"close":804},{"date":1676152800000,"open":757,"close":808},{"date":1676239200000,"open":755,"close":808},{"date":1676325600000,"open":753,"close":812},{"date":1676412000000,"open":751,"close":810},{"date":1676498400000,"open":754,"close":814},{"date":1676584800000,"open":750,"close":818},{"date":1676671200000,"open":746,"close":814},{"date":1676757600000,"open":742,"close":810},{"date":1676844000000,"open":743,"close":806},{"date":1676930400000,"open":740,"close":810},{"date":1677016800000,"open":744,"close":812},{"date":1677103200000,"open":740,"close":812},{"date":1677189600000,"open":742,"close":808},{"date":1677276000000,"open":741,"close":809},{"date":1677362400000,"open":738,"close":807},{"date":1677448800000,"open":738,"close":809},{"date":1677535200000,"open":737,"close":809},{"date":1677621600000,"open":733,"close":808},{"date":1677708000000,"open":730,"close":807},{"date":1677794400000,"open":729,"close":807},{"date":1677880800000,"open":725,"close":812},{"date":1677967200000,"open":720,"close":812},{"date":1678053600000,"open":716,"close":814},{"date":1678140000000,"open":711,"close":814},{"date":1678226400000,"open":710,"close":810},{"date":1678312800000,"open":714,"close":810},{"date":1678399200000,"open":712,"close":815},{"date":1678485600000,"open":715,"close":812},{"date":1678572000000,"open":718,"close":813},{"date":1678658400000,"open":717,"close":809}];
series1.data.setAll(data);
series2.data.setAll(data);

// create ranges
var i = 0;
var baseInterval = xAxis.get("baseInterval");
var baseDuration = xAxis.baseDuration();
var rangeDataItem;

am5.array.each(series1.dataItems, function (s1DataItem) {
  var s1PreviousDataItem;
  var s2PreviousDataItem;

  var s2DataItem = series2.dataItems[i];

  if (i > 0) {
    s1PreviousDataItem = series1.dataItems[i - 1];
    s2PreviousDataItem = series2.dataItems[i - 1];
  }

  var startTime = am5.time
    .round(
      new Date(s1DataItem.get("valueX")),
      baseInterval.timeUnit,
      baseInterval.count
    )
    .getTime();

  // intersections
  if (s1PreviousDataItem && s2PreviousDataItem) {
    var x0 =
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

    var x1 = startTime + baseDuration / 2;
    var y11 = s1DataItem.get("valueY");
    var y12 = s2DataItem.get("valueY");

    var intersection = getLineIntersection(
      { x: x0, y: y01 },
      { x: x1, y: y11 },
      { x: x0, y: y02 },
      { x: x1, y: y12 }
    );

    startTime = Math.round(intersection.x);
  }

  // start range here
  if (s2DataItem.get("valueY") > s1DataItem.get("valueY")) {
    if (!rangeDataItem) {
      rangeDataItem = xAxis.makeDataItem({});
      var range = series1.createAxisRange(rangeDataItem);
      rangeDataItem.set("value", startTime);
      range.fills.template.setAll({
        fill: series2.get("fill"),
        fillOpacity: 0.6,
        visible: true
      });
      range.strokes.template.setAll({
        stroke: series1.get("stroke"),
        strokeWidth: 1
      });
    }
  } else {
    // if negative range started
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
}
```

## Required resources

- https://cdn.amcharts.com/lib/5/index.js
- https://cdn.amcharts.com/lib/5/xy.js
- https://cdn.amcharts.com/lib/5/themes/Animated.js
