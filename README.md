A small [region file](https://github.com/osharaki/travel_regions#region-files) visualizer built with Leaflet.

## Usage

### Region files

A level 2 region file called `data.json` is already available. Simply opening `index.html` in a browser will display the regions it contains.

To display a different region file, you can generate one by following the instructions [here](https://github.com/osharaki/travel_regions) then copy its contents to `data.json`.

### Map features

By default, only regions and their IDs are drawn. To change this default
behavior, change the appropriate arguments in `addFeatures()` in `index.html`.

The function is defined as follows:

```JavaScript
addFeatures(map, data, drawRegions = true, drawRegionIDs = true, drawNodes =
false, colorCode = {})
```

`colorCode` allows you to manually assign colors to specific regions via their IDs. For
example:

```JavaScript
{
    "227": "RED",
    "250": "#79D62E"
}
```
