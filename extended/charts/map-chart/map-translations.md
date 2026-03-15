---
title: "Map name translations"
source: "https://www.amcharts.com/docs/v5/charts/map-chart/map-translations/"
scraped: "2026-03-15"
---

Maps in amCharts 5 will display names of the countries and other places in English by default. This tutorial will show how you can use bundled translation files to display country names in different languages.

## Loading translation files

Translation files are included with the Geodata package, in a sub-directory `lang`.

Loading those will depend on your development environment:

import am5geodata\_lang\_ES from "@amcharts/amcharts5-geodata/lang/ES"; 

<script src="https://cdn.amcharts.com/lib/5/geodata/lang/ES.js"></script>

NOTE If you are using `<script>` tag to load translation data, global variables will be created, e.g. `am5geodata_lang_ES`. Much like with geodata itself.

## Applying translations

To apply translations, simply set `geodataNames` setting on your map series:

let polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata\_worldLow,
    geodataNames: am5geodata\_lang\_ES
  })
);

var polygonSeries = chart.series.push(
  am5map.MapPolygonSeries.new(root, {
    geoJSON: am5geodata\_worldLow,
    geodataNames: am5geodata\_lang\_ES
  })
);

That's all there is to it. Now the country names, will be shown in the language you loaded, rather than defaults contained in map files.

## Available translations

Language

Code/Filename

Global variable

AFRIKAANS

`AF`

`am5geodata_lang_AF`

AMHARIC

`AM`

`am5geodata_lang_AM`

ARABIC

`AR`

`am5geodata_lang_AR`

AZERBAIJANI

`AZ`

`am5geodata_lang_AZ`

BELARUSIAN

`BE`

`am5geodata_lang_BE`

BULGARIAN

`BG`

`am5geodata_lang_BG`

BENGALI

`BN`

`am5geodata_lang_BN`

TIBETAN STANDARD

`BO`

`am5geodata_lang_BO`

CATALAN

`CA`

`am5geodata_lang_CA`

CZECH

`CS`

`am5geodata_lang_CS`

WELSH

`CY`

`am5geodata_lang_CY`

DANISH

`DA`

`am5geodata_lang_DA`

GERMAN

`DE`

`am5geodata_lang_DE`

EWE

`EE`

`am5geodata_lang_EE`

GREEK

`EL`

`am5geodata_lang_EL`

ENGLISH

`EN`

`am5geodata_lang_EN`

ESPERANTO

`EO`

`am5geodata_lang_EO`

SPANISH

`ES`

`am5geodata_lang_ES`

ESTONIAN

`ET`

`am5geodata_lang_ET`

BASQUE

`EU`

`am5geodata_lang_EU`

PERSIAN

`FA`

`am5geodata_lang_FA`

FINNISH

`FI`

`am5geodata_lang_FI`

FAROESE

`FO`

`am5geodata_lang_FO`

FRENCH

`FR`

`am5geodata_lang_FR`

IRISH

`GA`

`am5geodata_lang_GA`

GALICIAN

`GL`

`am5geodata_lang_GL`

GUJARATI

`GU`

`am5geodata_lang_GU`

HEBREW

`HE`

`am5geodata_lang_HE`

HINDI

`HI`

`am5geodata_lang_HI`

CROATIAN

`HR`

`am5geodata_lang_HR`

HUNGARIAN

`HU`

`am5geodata_lang_HU`

ARMENIAN

`HY`

`am5geodata_lang_HY`

INTERLINGUA

`IA`

`am5geodata_lang_IA`

INDONESIAN

`ID`

`am5geodata_lang_ID`

ICELANDIC

`IS`

`am5geodata_lang_IS`

ITALIAN

`IT`

`am5geodata_lang_IT`

JAPANESE

`JA`

`am5geodata_lang_JA`

GEORGIAN

`KA`

`am5geodata_lang_KA`

KIKUYU

`KI`

`am5geodata_lang_KI`

KHMER

`KM`

`am5geodata_lang_KM`

KANNADA

`KN`

`am5geodata_lang_KN`

KOREAN

`KO`

`am5geodata_lang_KO`

GANDA

`LG`

`am5geodata_lang_LG`

LAO

`LO`

`am5geodata_lang_LO`

LITHUANIAN

`LT`

`am5geodata_lang_LT`

LATVIAN

`LV`

`am5geodata_lang_LV`

MACEDONIAN

`MK`

`am5geodata_lang_MK`

MALAYALAM

`ML`

`am5geodata_lang_ML`

MARATHI

`MR`

`am5geodata_lang_MR`

MALAY

`MS`

`am5geodata_lang_MS`

MALTESE

`MT`

`am5geodata_lang_MT`

BURMESE

`MY`

`am5geodata_lang_MY`

NORWEGIAN BOKMAL

`NB`

`am5geodata_lang_NB`

NEPALI

`NE`

`am5geodata_lang_NE`

DUTCH

`NL`

`am5geodata_lang_NL`

NORWEGIAN NYNORSK

`NN`

`am5geodata_lang_NN`

NORWEGIAN

`NO`

`am5geodata_lang_NO`

ORIYA

`OR`

`am5geodata_lang_OR`

POLISH

`PL`

`am5geodata_lang_PL`

PORTUGUESE

`PT`

`am5geodata_lang_PT`

ROMANSH

`RM`

`am5geodata_lang_RM`

ROMANIAN

`RO`

`am5geodata_lang_RO`

RUSSIAN

`RU`

`am5geodata_lang_RU`

NORTHERN SAMI

`SE`

`am5geodata_lang_SE`

SLOVAK

`SK`

`am5geodata_lang_SK`

SLOVENE

`SL`

`am5geodata_lang_SL`

SHONA

`SN`

`am5geodata_lang_SN`

ALBANIAN

`SQ`

`am5geodata_lang_SQ`

SERBIAN

`SR`

`am5geodata_lang_SR`

SWEDISH

`SV`

`am5geodata_lang_SV`

TAMIL

`TA`

`am5geodata_lang_TA`

TELUGU

`TE`

`am5geodata_lang_TE`

THAI

`TH`

`am5geodata_lang_TH`

TIGRINYA

`TI`

`am5geodata_lang_TI`

TAGALOG

`TL`

`am5geodata_lang_TL`

TURKISH

`TR`

`am5geodata_lang_TR`

UKRAINIAN

`UK`

`am5geodata_lang_UK`

URDU

`UR`

`am5geodata_lang_UR`

VIETNAMESE

`VI`

`am5geodata_lang_VI`

CHINESE SIMPLIFIED

`cn_ZH`

`am5geodata_lang_cn_ZH`

CHINESE TRADITIONAL

`tw_ZH`

`am5geodata_lang_tw_ZH`

## Example


## Credits

The translations included in geodata language package is made from IP2Location™ Country Multilingual Database which available from [https://www.ip2location.com](https://www.ip2location.com/).
