---
title: Postcards
date : 2025-08-26 10:33:43
---

## Postcrossing

I use [Postcrossing](https://www.postcrossing.com/) to swap postcards with people all over the world. Click [here](https://www.postcrossing.com/user/Tresol) to visit my Postcrossing homepage.

### Map

Here is an interactive map of all the postcards I've sent and received.

<!-- Postcard Map -->
<script src="leaflet.js"></script>
<script src="leaflet.curve.js"></script>
<div id="postcard-map" style="height: 600px; width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"></div>
<div id="info-tooltip" style="position: absolute; display: none; background: white; border: 1px solid #ccc; border-radius: 4px; padding: 10px; font-family: sans-serif; font-size: 12px; pointer-events: none; z-index: 1000;"></div>
<link rel="stylesheet" href="https://unpkg.com/leaflet%401.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
<script src="graph.js"></script>

Blue tracks and icons are for received postcards while those red for sent ones. You can check detailed information of a postcard by clicking on the icon.

JavaScript map framework is provided by [Leaflet](https://leafletjs.com/) and map data is from [OpenStreetMap](https://www.openstreetmap.org/).

<!-- Postcard Statistics -->

### Statistics

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
	<div>
        <div><b>Item</b></div>
		<div><b>Total Travel Distance</b></div>
        <div><b>Year Travel Distance</b></div>
        <div><b>Total Cards</b></div>
        <div><b>Month Cards</b></div>
	</div>
	<div>
            <div><b>Sent</b></div>
			<div id="dist-total-sent">Loading…</div>
			<div id="dist-year-sent">Loading…</div>
            <div id="count-total-sent">Loading…</div>
            <div id="count-month-sent">Loading…</div>
		</div>
        <div>
            <div><b>Received</b></div>
			<div id="dist-total-recv">Loading…</div>
			<div id="dist-year-recv">Loading…</div>
            <div id="count-total-recv">Loading…</div>
		<div id="count-month-recv">Loading…</div>
	</div>
</div>

### Latest Postcards

<div style="margin-top: 12px; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 12px;">
	<div>
		<div><b>Latest Sent</b></div>
		<ul id="latest-sent" style="margin: 0; padding-left: 18px;"></ul>
        More at <a href="https://www.postcrossing.com/user/Tresol/sent">Postcrossing Sent Postcards</a>.
	</div>
	<div>
		<div><b>Latest Received</b></div>
		<ul id="latest-recv" style="margin: 0; padding-left: 18px;"></ul>
        More at <a href="https://www.postcrossing.com/user/Tresol/received">Postcrossing Received Postcards</a>.
	</div>
</div>

### Digest

All received postcards via Postcrossing are displayed can be found in my [Postcrossing Homepage](https://www.postcrossing.com/user/Tresol). However, here are some highlights and digest.

- [2024 Digest](/PostcrossingDigest/2024/)
- [2025 Digest](/PostcrossingDigest/2025/)

Postcards are catagorized by year and sorted by date in descending order. If an image of a postcard is available, it will be displayed. You can identify the country of the sender from the alphabetic code in its ID.

<!-- ### Postcards to Myself

Reason to send postcards to myself is complex. It is embarrassing to admit that I sometimes do it just because I have no friends interested in rceiving postcards. However, sending postcards to myself also serves as a way to document my own life and experiences. It allows me to capture moments and thoughts that I want to remember in the future.

Digests will be available soon! -->
