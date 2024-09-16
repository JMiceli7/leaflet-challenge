// Initializing map 
let map;

function createMarkers(response) {
    // Pull features property from json
    let earthquakes = response.features;

    // Initialize array to hold earthquake markers
    let earthquakeMarkers = [];

    // Loop through the features array
    for (let index = 0; index < earthquakes.length; index++) {
        let earthquake = earthquakes[index];

        // Extract latitude, longitude, magnitude, and depth
        let lat = earthquake.geometry.coordinates[1];
        let lon = earthquake.geometry.coordinates[0];
        let magnitude = earthquake.properties.mag;
        let depth = earthquake.geometry.coordinates[2];
        let place = earthquake.properties.place;

        // Create a marker for each earthquake, and bind a popup with the magnitude and location
        let earthquakeMarker = L.circleMarker([lat, lon], {
            // Size by magnitude
            radius: magnitude * 5,
            // Color by depth
            fillColor: getColor(depth),
            color: "black",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.6
        })
            .bindPopup(`<h3>Location: ${place}</h3><h4>Magnitude: ${magnitude}</h4><h4>Depth: ${depth} km</h4>`);

        // Add the marker to the earthquakeMarkers array
        earthquakeMarkers.push(earthquakeMarker);
    }

    // Create a layer group from the earthquake markers array and pass it to the createMap function
    createMap(L.layerGroup(earthquakeMarkers));
}

// Create function for applying color formatting based on depth
function getColor(depth) {
    return depth > 70 ? 'red' :
        depth > 30 ? 'orange' :
            depth > 10 ? 'yellow' :
                'green';
}

// Create function for creating legend
function createLegend() {
    let legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
        let div = L.DomUtil.create('div', 'info legend');
        let depths = [0, 10, 30, 70];
        let labels = [];

        // Loop through the depth ranges to make a label for each color and range
        for (let i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
        }

        return div;
    };
    // Add legend to the map
    legend.addTo(map);
}

// Create function for creating map object
function createMap(earthquakeLayer) {
    map = L.map('map', {
        center: [37.0902, -95.7129],
        zoom: 4
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add earthquake markers to the map
    earthquakeLayer.addTo(map);

    // Add the legend after adding the markers
    createLegend();
}

// Load GeoJSON data and create markers
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
    .then(response => response.json())
    .then(data => createMarkers(data));
