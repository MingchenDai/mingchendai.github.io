---
title: Postcards
date : 2025-08-26 10:33:43
---

> I use [Postcrossing](https://www.postcrossing.com/) to swap postcards with people all over the world. Click [here](https://www.postcrossing.com/user/Tresol) to visit my Postcrossing homepage.

Here is an interactive map of all the postcards I've sent and received. Last update time of this page is 2025-11-28 18:32, BJT.
<script src="leaflet.js"></script>
<script src="leaflet.curve.js"></script>
<div id="postcard-map" style="height: 600px; width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"></div>
<div id="info-tooltip" style="position: absolute; display: none; background: white; border: 1px solid #ccc; border-radius: 4px; padding: 10px; font-family: sans-serif; font-size: 12px; pointer-events: none; z-index: 1000;"></div>
<link rel="stylesheet" href="https://unpkg.com/leaflet%401.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
<script src="graph.js"></script>

Blue tracks and icons are for received postcards while those red for sent ones. You can check detailed information of a postcard by clicking on the icon.

JavaScript map framework is provided by [Leaflet](https://leafletjs.com/) and map data is from [OpenStreetMap](https://www.openstreetmap.org/).