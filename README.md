# leaflet-challenge


In this assignment, we generated a json file from the https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php webpage. 

For my analysis, I chose to generate a json for all earthquakes in the last 7 days. 

The json features longitude, latitude, magnitude and depth were the main targets of the analysis. 

Using leaflet, I created a map layer and functions to create markers based on pulled information from the features of the json. 

Logitude and latitude were pulled for each earthquake and used for placing the markers. The markers were formatted to show their size based on the magnitude of the earthquake and color based on the depth of the earthquake. 

Functions were also created to generate a legend based on the color scaling and added to the map.

I reviewed several leaflet articles and info pages to help best produce this map:
- https://leafletjs.com/examples/choropleth/ this page was crucial for understanding the getColor function for adding marker color gradiants
- https://leafletjs.com/examples/geojson/ this page helped better utilize the GeoJSON object including functions such as pointToLayer, onEachFeature, etc.
- https://leafletjs.com/reference.html#domutil a page specific for utilzing DomUtility functions
- https://stackoverflow.com/questions/68162805/how-to-add-legend-in-leaflet-map helpful notes for troubleshooting legend challenges and the use of div.innerHTML code lines
