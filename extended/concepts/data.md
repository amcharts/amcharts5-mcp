---
title: "Data"
source: "https://www.amcharts.com/docs/v5/concepts/data/"
scraped: "2026-03-15"
---

This tutorial will look at how data is loaded, updated, and used in amCharts 5.

## The data object

All amCharts 5 components that use data have a property named `data`.

It's not a simple storage for data but rather object based on class `ListData`.

Any data manipulation - setting data, inserting, removing, or updating values for data points - is done via many of the `ListData` methods. The object will take care of the rest - no need to let the chart know we've updated something - it will just happen.

In this tutorial, we will cover the most common of `ListData`'s methods, but make sure you visit its [full class reference](https://www.amcharts.com/docs/v5/reference/datalist/#Methods) for more options.

## Setting data

Data set set via `ListData` object of the component that is direct user of the data.

For example, in XY Chart the users of data are its series, not the chart itself.

Chart's [legend](https://www.amcharts.com/docs/v5/concepts/legend/) is another example of a data user.

To set initial data or replace all of the current data, we use `setAll()` method:

series.data.setAll(\[{
  category: "Research",
  value: 1000
}, {
  category: "Marketing",
  value: 1200
}, {
  category: "Sales",
  value: 850
}\]);

series.data.setAll(\[{
  category: "Research",
  value: 1000
}, {
  category: "Marketing",
  value: 1200
}, {
  category: "Sales",
  value: 850
}\]);

Using `setAll()` will overwrite any data that may have been set previously. The series will be immediately redrawn to reflect the new data.

IMPORTANT It's a good practice to make sure that setting data happens as late into code as possible. Once you set data, all related objects are created, so any configuration settings applied afterwards might not carry over.

## Data order

IMPORTANT[Date axis](https://www.amcharts.com/docs/v5/charts/xy-chart/axes/date-axis/) expects series data to be sorted in ascending order. Otherwise, chart will be prone to all kinds of plotting anomalies.

## Incremental updates

### Adding single data point

To add a single data point to the end of the data, we use `push()` method:

series.data.push({
  category: "HR",
  value: 500
});

series.data.push({
  category: "HR",
  value: 500
});

Should we want to add data points to the beginning of data, we would use `unshift()` instead:

series.data.unshift({
  category: "HR",
  value: 500
});

series.data.unshift({
  category: "HR",
  value: 500
});

We can insert new data point at specific index, too. For that we'd use `insertIndex()`. The function takes index (zero-based) and value to insert into data:

series.data.insertIndex(2, {
  category: "HR",
  value: 500
});

series.data.insertIndex(2, {
  category: "HR",
  value: 500
});

### Adding multiple data points

Similarly, to add multiple data points to the end of the data, we can use `pushAll()` method:

series.data.pushAll(\[{
  category: "HR",
  value: 500
}, {
  category: "Logistics",
  value: 450
}\]);

series.data.pushAll(\[{
  category: "HR",
  value: 500
}, {
  category: "Logistics",
  value: 450
}\]);

## Updating existing data

To update existing data points, we use method `setIndex()`.

The method takes index (zero-based) and new data as parameters. For example, let's update values of the second data point:

series.data.setIndex(1, {
  category: "Marketing",
  value: 1000
});

series.data.setIndex(1, {
  category: "Marketing",
  value: 1000
});

Calling `setIndex()` will take care of all the recalculation and redrawing of the required elements. It will even animate from one value to another, if we have animations enabled.


## Removing data items

If we need to remove data items, we can use `removeIndex()` method:

series.data.removeIndex(0);

series.data.removeIndex(0);

The above will remove the first data item from series.

## Pre-processing data

`ListData` comes with a capability to pre-process the data before it is passed onto a chart.

For that it has a property: `processor`. It can be set to an instance of `DataProcessor`, which can do the following:

-   Convert string-based dates or `Date` objects into timestamps, which is expected format for time-based data in amCharts 5.
-   Convert string-based numbers into proper numeric values.
-   Replace empty values with something else.

### Creating a processor

Like with any object in amCharts 5, data processor is created using its `new()` static method:

series.data.processor = am5.DataProcessor.new(root, {});

series.data.processor = am5.DataProcessor.new(root, {});

The above will create the processor, which will do nothing, until we set some of its properties.

IMPORTANT In amCharts 5, data is parsed and processed immediately after it is set (e.g. via `data.setAll()` call), so the processor needs to be set **before** setting actual data, or it won't kick in.

### Data mutation

Data processor will manipulate values in the source array!

If you need your source data to remain intact, you may need to make a hard copy of the data and pass it into series instead.

This is also why you don't need to define data processors for multiple series if they use the same data.

// Source data
let data = \[{
  date: "2021-01-01",
  value: "1000"
}, {
  date: "2021-01-02",
  value: "800"
}\];

// Creating processor only for the first series
series1.data.processor = am5.DataProcessor.new(root, {
  numericFields: \["value"\]
});

// Setting data
series1.data.setAll(data);
series2.data.setAll(data);
series3.data.setAll(data);

// Source data
var data = \[{
  date: "2021-01-01",
  value: "1000"
}, {
  date: "2021-01-02",
  value: "800"
}\];

// Creating processor only for the first series
series1.data.processor = am5.DataProcessor.new(root, {
  numericFields: \["value"\]
});

// Setting data
series1.data.setAll(data);
series2.data.setAll(data);
series3.data.setAll(data);

### Parsing numeric values

Chart expects numbers in data where numeric data fields are used. If we have values supplied as strings in our data, the chart will fail.

We can use data processor to automatically convert those strings into numeric values, by setting `numericFields` property:

// Processor needs to be set before data
series.data.processor = am5.DataProcessor.new(root, {
  numericFields: \["value"\]
});

series.data.setAll(\[{
  date: "2021-01-01",
  value: "1000"
}, {
  date: "2021-01-02",
  value: "800"
}\]);

// Processor needs to be set before data
series.data.processor = am5.DataProcessor.new(root, {
  numericFields: \["value"\]
});

series.data.setAll(\[{
  date: "2021-01-01",
  value: "1000"
}, {
  date: "2021-01-02",
  value: "800"
}\]);

### Parsing dates

If we use a date axis in our chart, the values that specify date/time will need to come in JavaScript timestamp format, which is number of milliseconds since "UNIX epoch".

If our data is in any other way we may need to tell data processor to convert those dates into timestamp.

To specify what fields hold dates we use `dateFields`:

// Processor needs to be set before data
series.data.processor = am5.DataProcessor.new(root, {
  numericFields: \["value"\],
  dateFields: \["date"\]
});

series.data.setAll(\[{
  date: new Date(2021, 0, 1),
  value: "1000"
}, {
  date: new Date(2021, 0, 2),
  value: "800"
}\]);

// Processor needs to be set before data
series.data.processor = am5.DataProcessor.new(root, {
  numericFields: \["value"\],
  dateFields: \["date"\]
});

series.data.setAll(\[{
  date: new Date(2021, 0, 1),
  value: "1000"
}, {
  date: new Date(2021, 0, 2),
  value: "800"
}\]);

The above example uses `Date` objects to specify dates.

If our data holds dates as strings, we will additionally have to specify `dateFormat` so that processor knows how to parse it into a timestamp:

// Processor needs to be set before data
series.data.processor = am5.DataProcessor.new(root, {
  numericFields: \["value"\],
  dateFields: \["date"\],
  dateFormat: "yyyy-MM-dd"
});

series.data.setAll(\[{
  date: "2021-01-01",
  value: "1000"
}, {
  date: "2021-01-02",
  value: "800"
}\]);

// Processor needs to be set before data
series.data.processor = am5.DataProcessor.new(root, {
  numericFields: \["value"\],
  dateFields: \["date"\],
  dateFormat: "yyyy-MM-dd"
});

series.data.setAll(\[{
  date: "2021-01-01",
  value: "1000"
}, {
  date: "2021-01-02",
  value: "800"
}\]);

MORE INFO The date format is described in "[Formatting dates](https://www.amcharts.com/docs/v5/concepts/formatters/formatting-dates/)" tutorial.

The following format codes are supported when parsing dates:

Period

Code

No.

Example

Comment

**era**

G

1

AD

"AD" or "BC"

**year**

y

1..n

1996

Calendar year.

Y

1..n

1997

Week year.

**month**

M

1..2

09

One or two digit month number.

3

Sep

Short month name.

4

September

Full month name.

**week**

w

1..2

27

Week of the year.

W

1

3

Week of the month.

**day**

d

1..2

1

Day of the month.

D

1..3

345

Day of the year.

**am/pm**

a

1

AM

"AM" or "PM"

2

A.M.

"A.M." or "P.M."

3

A

"A" or "P"

**hour**

h

1..2

11

Hour \[1-12\].

H

1..2

13

Hour \[0-23\].

K

1..2

0

Hour \[0-11\].

k

1..2

24

Hour \[1-24\].

**minute**

m

1..2

59

Minute.

**second**

s

1..2

12

Second.

S

1..2

3456

Fractional Second.

x

1..n

1507908460868

Timestamp.

n

1..3

029

Milliseconds.

**zone**

Z

1

GMT-08:00

Time zone in GMT format.

2

\-0800

Time zone in RFC 822 format.

**other**

i

1

2017-10-14T05:24:17.872Z

Date/time formatted according to [ISO8601 format](http://en.wikipedia.org/wiki/ISO_8601).

NOTE If `dateFormat` is not set, and processor encounters a string-based value it needs to parse, it will use chart-wide date format (`root.dateFormatter.dateFormat`).


### Parsing colors

Colors in amCharts 4 are represented by `Color` objects. If you need data processor to automatically convert string-based or hex color codes to `Color` objects, you can use `colorFields`.

Data processor recognizes the following formats:

-   Hex strings: `"#ff0000"`
-   RGBA notation: `"rgb(255, 0, 0)"` or `"rgba(255, 0, 0, 1)"`
-   Hex numbers: `0xff0000` or `16711680`

// Processor needs to be set before data
series.data.processor = am5.DataProcessor.new(root, {
  numericFields: \["value"\],
  colorFields: \["color"\]
});

series.data.setAll(\[{
  date: "2021-01-01",
  value: "1000",
  color: "#ff0000"
}, {
  date: "2021-01-02",
  value: "800",
  color: "#ff0000"
}\]);

// Processor needs to be set before data
series.data.processor = am5.DataProcessor.new(root, {
  numericFields: \["value"\],
  colorFields: \["color"\]
});

series.data.setAll(\[{
  date: "2021-01-01",
  value: "1000",
  color: "#ff0000"
}, {
  date: "2021-01-02",
  value: "800",
  color: "#ff0000"
}\]);

### Deep processing

Processor can convert input values from deeper objects, too.

`numericFields`, `dateFields`, and `colorFields` accept strings using dot notation to identify hierarchy.

For example consider data like this:

\[{
  date: new Date(2021, 0, 1),
  value: 1000,
  columnSettings: {
    fill: "#d6e681"
  }
}, {
  date: new Date(2021, 0, 2),
  value: 800,
  columnSettings: {
    fill: "#babf95"
  }
}, {
  date: new Date(2021, 0, 3),
  value: 700,
  columnSettings: {
    fill: "#c4ad83"
  }
}, {
  date: new Date(2021, 0, 4),
  value: 1200,
  columnSettings: {
    fill: "#c6b677"
  }
}, {
  date: new Date(2021, 0, 5),
  value: 740,
  columnSettings: {
    fill: "#dbb957"
  }
}\]

We can use `"columnSettings.fill"` to allow processor to get to resolving `fill` color:

series.data.processor = am5.DataProcessor.new(root, {
  numericFields: \["value"\],
  dateFields: \["date"\],
  colorFields: \["columnSettings.fill"\]
});

series.data.processor = am5.DataProcessor.new(root, {
  numericFields: \["value"\],
  dateFields: \["date"\],
  colorFields: \["columnSettings.fill"\]
});

### Replacing empty values

In some cases we need to replace empty values (e.g. `null` or empty strings) with something else. That's where processors `emptyAs` setting comes in:

// Processor needs to be set before data
series.data.processor = am5.DataProcessor.new(root, {
  emptyAs: 0
});

series.data.setAll(\[{
  category: "Research",
  value: 1000
}, {
  category: "Marketing",
  value: null
}, {
  category: "Sales",
  value: 850
}\]);

// Processor needs to be set before data
series.data.processor = am5.DataProcessor.new(root, {
  emptyAs: 0
});

series.data.setAll(\[{
  category: "Research",
  value: 1000
}, {
  category: "Marketing",
  value: null
}, {
  category: "Sales",
  value: 850
}\]);

In the above, without the processor, a data point for "Marketing" would be not plotted. With data processor, it will be replaced with a zero, which is a proper numeric value and thus will plot the data point.

## External data

### Loading

amCharts 5 comes with a helper utility `am5.net.load()`.

It takes at least one argument (a URL of the request) and returns a `Promise` object with net load result (`INetLoadResult`).

am5.net.load("/data/mydata.json").then(function(result) {
  // This gets executed when data finishes loading
  // ... do something
  console.log(result.response);
}).catch(function(result) {
  // This gets executed if there was an error loading URL
  // ... handle error
  console.log("Error loading " + result.xhr.responseURL);
});

am5.net.load("/data/mydata.json").then(function(result) {
  // This gets executed when data finishes loading
  // ... do something
  console.log(result.response);
}).catch(function(result) {
  // This gets executed if there was an error loading URL
  // ... handle error
  console.log("Error loading " + result.xhr.responseURL);
});

The `result` passed to handler functions is an object that implements `INetLoadResult` interface. It contains a bunch of useful references, but the most important one is `response`, which contains the actual output of the requested URL.

MORE INFO There are more to `am5.net.load()` than the bare minimum outlined above. Please refer to "[Getting the most out of net.load utility](https://www.amcharts.com/docs/v5/concepts/data/net-load-utility/)" tutorial for information about passing in target data user object, setting HTTP request options, and more.

### Parsing

Now that we've set up loading of data, we need to parse it before it can be used by chart.

amCharts 5 comes with two build-in parsers: CSV and JSON.

Those are represented by classes `CSVParser` and `JSONParser` respetively, both of which have a static method `parse()` so they do not need to be instantiated as objects.

`parse()` method takes two parameters:

-   `data` - input data as a string.
-   `options` (optional) - format-specific options.

It returns parsed data, which can be set directly to its intended user, e.g. series:

am5.net.load("/data/mydata.json").then(function(result) {
  // This gets executed when data finishes loading
  series.data.setAll(am5.JSONParser.parse(result.response));
}).catch(function(result) {
  // This gets executed if there was an error loading URL
  // ... handle error
  console.log("Error loading " + result.xhr.responseURL);
});

am5.net.load("/data/mydata.json").then(function(result) {
  // This gets executed when data finishes loading
  series.data.setAll(am5.JSONParser.parse(result.response));
}).catch(function(result) {
  // This gets executed if there was an error loading URL
  // ... handle error
  console.log("Error loading " + result.xhr.responseURL);
});

CSV format can have a lot of configuration options, such as column delimiters, column names, etc.

am5.net.load("/data/mydata.csv").then(function(result) {
  // This gets executed when data finishes loading
  series.data.setAll(am5.CSVParser.parse(result.response, {
    delimiter: ";",
    reverse: true,
    skipEmpty: true,
    useColumnNames: true
  }));
}).catch(function(result) {
  // This gets executed if there was an error loading URL
  // ... handle error
  console.log("Error loading " + result.xhr.responseURL);
});

am5.net.load("/data/mydata.csv").then(function(result) {
  // This gets executed when data finishes loading
  series.data.setAll(am5.CSVParser.parse(result.response, {
    delimiter: ";",
    reverse: true,
    skipEmpty: true,
    useColumnNames: true
  }));
}).catch(function(result) {
  // This gets executed if there was an error loading URL
  // ... handle error
  console.log("Error loading " + result.xhr.responseURL);
});

We can also use standalone data parser to parse date/numeric/color fields in data after it is parsed:

am5.net.load("/data/mydata.csv").then(function(result) {
  
  // Parse data
  let data = am5.CSVParser.parse(result.response, {
    delimiter: ";",
    reverse: true,
    skipEmpty: true,
    useColumnNames: true
  });

  // Process data
  let processor = am5.DataProcessor.new(root, {
    dateFields: \["date"\],
    dateFormat: "yyyy-MM-dd",
    numericFields: \["value", "volume"\]
  });
  processor.processMany(data);

  // Use parsed/processed data
  series.data.setAll(data);

});

am5.net.load("/data/mydata.csv").then(function(result) {
  
  // Parse data
  var data = am5.CSVParser.parse(result.response, {
    delimiter: ";",
    reverse: true,
    skipEmpty: true,
    useColumnNames: true
  });

  // Process data
  var processor = am5.DataProcessor.new(root, {
    dateFields: \["date"\],
    dateFormat: "yyyy-MM-dd",
    numericFields: \["value", "volume"\]
  });
  processor.processMany(data);

  // Use parsed/processed data
  series.data.setAll(data);

});

### External data example

The following Gantt chart example combines a few techniques described above, like loading and parsing external data, as well as using data processor to parse date and color fields.


## User data

Each element in amCharts 5 can have any arbitrary data attached to it using its `userData` setting.

This setting is not used by chart in any way, and acts purely as custom data storage for later retrieval/use from the object.

It can be set using `set()` or `setAll()` methods:

chart.set("userData", {
  foo: "bar"
});

chart.set("userData", {
  foo: "bar"
});

Or via `new()` syntax:

let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  extraTooltipPrecision: 1,
  userData: {
    foo: "bar",
    someArbitraryValue: 100
  },
  renderer: am5xy.AxisRendererY.new(root, {
    minGridDistance: 30
  })
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  extraTooltipPrecision: 1,
  userData: {
    foo: "bar",
    someArbitraryValue: 100
  },
  renderer: am5xy.AxisRendererY.new(root, {
    minGridDistance: 30
  })
}));

As with any other setting, it can be retrieved using `get()` method:

chart.get("userData");

chart.get("userData");

## Related content

-   [Getting the most out of net.load utility](https://www.amcharts.com/docs/v5/concepts/data/net-load-utility/)
-   [Binding element's settings to values in data](https://www.amcharts.com/docs/v5/concepts/settings/template-fields/)
-   [Show "no data" warning on a chart](https://www.amcharts.com/docs/v5/tutorials/show-no-data-warning-on-a-chart/)
-   [Gantt chart with external data](https://www.amcharts.com/docs/v5/tutorials/gantt-chart-with-external-data/) (demo)
