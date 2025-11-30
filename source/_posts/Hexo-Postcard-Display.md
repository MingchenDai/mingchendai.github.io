---
title: Display Postcard Map in Hexo Blog
date: 2025-11-28 19:11:45
tags:
  - Hexo
  - Blog
categories: Exploration
---

This post introduces how to display a postcard map in a Hexo blog using data exported from [Postcrossing](https://www.postcrossing.com/) or in a custom format.  

<!-- more -->

> A demo can be checked at [Postcard](/postcard) page and source code can be found at `source/postcard` folder of my [Hexo Blog Repository](https://github.com/mingchendai/mingchendai.github.io).

## Overview

The Postcard feature shows a world map with markers for each postcard you have received or want to display. It is implemented as a **standalone Hexo page** backed by:

- A JSON data file describing postcards.
- A static HTML layout for the map page.
- JavaScript using [Leaflet](https://leafletjs.com/) and a curve plugin to render the map and connections.
- Supporting CSS/JS assets copied under `public/postcard`.

In this repository, the implementation lives under:

- `source/postcard/index.html` – main postcard map page.
- `source/postcard/cardData.json` – postcard data (title, description, coordinates, etc.).
- `source/postcard/leaflet.js`, `source/postcard/leaflet.curve.js` – Leaflet library and plugin.
- `source/postcard/graph.js` – main JavaScript to load postcard data and draw the map.

When Hexo generates the site, these files are copied directly into `public/postcard`, which makes the page available at `/postcard/`.

## File Structure

Below is a more detailed description of each file so you can understand or customize the implementation.

### `source/postcard/index.html`

This file is a standalone HTML entry for the postcard map. It typically includes:

- A container `<div>` for the Leaflet map.
- Links to the required CSS (Leaflet styles and any custom styles).
- `<script>` tags that load:
  - `leaflet.js` and `leaflet.curve.js`.
  - `cardData.json` (via AJAX/fetch in `graph.js`).
  - `graph.js` which initializes the map and markers.

It is treated as a static asset by Hexo, so the content is copied to `public/postcard/index.html` without template processing.

### `source/postcard/cardData.json`

This JSON file contains all postcard data with same format of Postcrossing. In fact, it is an array consisting of:

- A dictionary of homes, in the other words, places of user.
- A dictionary of sent postcards.
- A dictionary of received postcards.

If you are not a Postcrossing user, you can still create your own postcard data in the same format, but please make sure to follow the structure which can be refered from `source/postcard/cardData.json` in this blog repository.

`graph.js` reads this JSON and turns each entry into a Leaflet marker and, optionally, curved lines connecting locations.

### `source/postcard/leaflet.js` and `source/postcard/leaflet.curve.js`

These files provide the map rendering capability:

- `leaflet.js`: Core Leaflet library that handles interactive maps, tiles, zooming, and markers.
- `leaflet.curve.js`: A plugin for drawing curved lines/arcs between points, useful for visualizing connections between postcards.

You can replace these with newer versions from the Leaflet website/CDN if needed, but make sure the versions are compatible with each other and your `graph.js` code.

### `source/postcard/graph.js`
This is the main script controlling the postcard map:

- Initializes the Leaflet map (center, zoom level, tile layer).
- Loads `cardData.json` (usually with fetch).
- For each postcard entry:
  - Adds a marker at (lat, lng).
  - Binds a popup showing title and description.
- Optionally draws arcs/curves between locations using `leaflet.curve.js`.

If you want to customize behavior (cluster markers, change popup format, different tile provider, etc.), this is the primary file to modify.

## Use Implementation in Hexo

### Prerequisites

- A working Hexo blog (Node.js + Hexo installed).
- Basic familiarity with Hexo’s folder structure (source, public, etc.).
- Git access to this repository to copy files.


### Copy the Postcard Assets

Create the postcard folder in your own Hexo project:

```bash
mkdir -p source/postcard
```

Copy the implementation files from this repository (either by cloning or manually downloading):

- `source/postcard/index.html`
- `source/postcard/cardData.json`
- `source/postcard/leaflet.js`
- `source/postcard/leaflet.curve.js`
- `source/postcard/graph.js`

After copying, your own project should contain:

```pgsql
your-blog/
  source/
    postcard/
      index.html
      cardData.json
      leaflet.js
      leaflet.curve.js
      graph.js
```

Hexo treats anything under `source/` (that is not a post or special template) as a static asset, so `source/postcard` will be copied as‑is to `public/postcard` on build.

### Add or Edit Postcard Data

Open `source/postcard/cardData.json` and add your own postcard entries.

For Postcrossing users, visit `view-source:https://www.postcrossing.com/user/your_username/map` and search keyword `homes`, `sentPostcards` and `receivedPostcards` to find your own data in JSON format, then arrange them in the order:

```json
[
    { /* homes data */ },
    { /* sentPostcards data */ },
    { /* receivedPostcards data */ }
]
```

> Postcrossing does not provide an official API for exporting postcard data, so you may need to manually copy the JSON from the page source.

For non-Postcrossing users, create your own postcard entries following the same format.

A valid data sample looks like this:

```json
[
  {
    "900001": { "lat": 40.7128, "lon": -74.0060 },
    "900002": { "lat": 51.5074, "lon": -0.1278 },
    "900003": { "lat": 35.6895, "lon": 139.6917 }
  },
  {
    "US-999999": {
      "from": 900001,
      "to": {
        "username": "Sample_User_A",
        "lat": 48.8566,
        "lon": 2.3522
      },
      "received_date": "1700000000",
      "days": 12,
      "dist": "5,836 km"
    }
  },
  {
    "JP-888888": {
      "from": {
        "username": "Sample_User_B",
        "lat": -33.8688,
        "lon": 151.2093
      },
      "to": 900003,
      "received_date": "1705000000",
      "days": 27,
      "dist": "7,821 km"
    }
  }
]
``` 

### Generate and Preview Your Site

Run Hexo’s usual commands in your blog root, then visit: `localhost:<port>/postcard/` to see your postcard map. You should now see your own interactive postcard map.
