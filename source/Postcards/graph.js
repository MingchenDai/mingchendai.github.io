import("./leaflet.js")
import("./leaflet.curve.js")

document.addEventListener('DOMContentLoaded', function () {
    const map = new L.Map('postcard-map').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    map.fitWorld();

    function getControlPoint(from, to, slope) {
        const effectiveSlope = to.x < from.x ? -slope : slope;
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const len = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);
        const midX = from.x + dx * 0.5;
        const midY = from.y + dy * 0.5;
        const sx = midX + len * effectiveSlope * Math.cos(angle);
        const sy = midY - len * effectiveSlope * Math.sin(angle);
        return new L.Point(sx, sy);
    }

    function createPopupContent(id, postcard, type) {
        const isSent = type === 'sent';
        const otherParty = isSent ? postcard.to : postcard.from;
        const direnctionLabel = isSent ? 'to' : 'from';

        let content = `<a href="https://www.postcrossing.com/postcards/${id}"><b>${id}</b></a> `;
        if (otherParty.username && otherParty.username.length > 0) {
            const profileUrl = 'https://www.postcrossing.com/user/' + otherParty.username;
            content += direnctionLabel + ` <a href="${profileUrl}">${otherParty.username}</a>`;
        } else {
            content += direnctionLabel + ` <span>account closed</span>`;
        }
        const date = new Date(Number(postcard.received_date)*1000);
        content+=`<br><i class="fa-regular fa-envelope-open"></i> ${date.toISOString().slice(0,10)}`
        content += `<br><i class="fa-regular fa-clock"></i> ${postcard.days} days `;

        content += `<i class="fa-regular fa-ruler"></i> ${postcard.dist}`;
        return content;
    }

    fetch('cardData.json')
        .then(response => response.json())
        .then(data => {
            const homes = data[0];
            const sent = data[1];
            const received = data[2];

            const homesGroup = new L.FeatureGroup().addTo(map);
            const markersGroup = new L.FeatureGroup().addTo(map);
            const curvesGroup = new L.FeatureGroup().addTo(map);
            var curveWeight = 0.7;


            const houseIcon = new L.divIcon({
                className: 'custom-emoji-marker',
                html: '🏠',
                iconSize: new L.Point(18, 18),
                iconAnchor: new L.Point(9, 9),
            });
            const iconReceived = new L.Icon({
                iconUrl: "receiver.svg",
                iconSize: new L.Point(26, 26),
                iconAnchor: new L.Point(13, 20.8),
            });
            const iconSent = new L.Icon({
                iconUrl: "sender.svg",
                iconSize: new L.Point(26, 26),
                iconAnchor: new L.Point(13, 20.8),
            });

            function processPostcards(postcards, options) {
                const {type, color, curveSlope, icon} = options;
                const animation = !matchMedia('(prefers-reduced-motion: reduce)').matches ? {
                    duration: 4000,
                    easing: 'ease-in-out'
                } : false;
                for (const [id, postcard] of Object.entries(postcards)) {
                    const isSent = type === 'sent';
                    const homeLocation = isSent ? homes[postcard.from] : homes[postcard.to];
                    const otherParty = isSent ? postcard.to : postcard.from;
                    if (!homeLocation || !otherParty) continue;
                    const startLatLng = new L.LatLng(homeLocation.lat, homeLocation.lon);
                    const endLatLng = new L.LatLng(otherParty.lat, otherParty.lon);
                    const marker = new L.Marker(endLatLng, {icon, title: id, alt: `Postcard ${id}`});
                    marker.bindPopup(createPopupContent(id, postcard, type));
                    markersGroup.addLayer(marker);
                    const controlPoint = getControlPoint(map.latLngToLayerPoint(startLatLng), map.latLngToLayerPoint(endLatLng), curveSlope);
                    const controlLatLng = map.layerPointToLatLng(controlPoint);
                    const curve = L.curve(
                        ['M', startLatLng, 'Q', controlLatLng, endLatLng],
                        {animate: animation, color: color, weight: 1}
                    );
                    curvesGroup.addLayer(curve);
                }
            }

            function updateMap() {
                homesGroup.clearLayers();
                markersGroup.clearLayers();
                curvesGroup.clearLayers();
                const activeHomes = new Set();
                const findActiveHomes = (postcards, property) => {
                    for (const postcard of Object.values(postcards)) {
                        activeHomes.add(postcard[property]);
                    }
                }
                findActiveHomes(received, 'to');
                findActiveHomes(sent, 'from');
                activeHomes.forEach(homeId => {
                    if (homes[homeId]) {
                        const homeMarker = new L.Marker([homes[homeId].lat, homes[homeId].lon], {
                            interactive: false,
                            icon: houseIcon,
                            title: "Home",
                            alt: "Home Location",
                        });
                        homesGroup.addLayer(homeMarker);
                    }
                })
                processPostcards(received, {type: 'received', color: '#3475B9', curveSlope: 0.6, icon: iconReceived});
                processPostcards(sent, {type: 'sent', color: '#D72147', curveSlope: -0.6, icon: iconSent})
            }

            function fitAllElements() {
                if (markersGroup.getLayers().length > 0) {
                    const allBounds = markersGroup.getBounds().extend(homesGroup.getBounds());
                    map.fitBounds(allBounds, {padding: [26, 26], animate: false});
                } else {
                    map.fitWorld();
                }
            }

            updateMap();
            fitAllElements();
            map.on('resize', fitAllElements);
        });
})