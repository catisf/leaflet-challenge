// Define the url to get the GeoJSON data
let eqData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Fetch the data using D3
d3.json(eqData).then(function (data){
    console.log(data);

    let eqData = data.features;
    
    let markers = [];

    for (let i = 0; i < eqData.length; i++) {
        // Setting the marker radius for the state by passing population into the markerSize function
        markers.push(
          L.circle([eqData[i].geometry.coordinates[1],eqData[i].geometry.coordinates[0]], {
            stroke: false,
            fillOpacity: 0.75,
            color: "white",
            fillColor: "red",
            radius: eqData[i].properties.mag*10000
          }).
          bindPopup("<h3> Magnitude: " + eqData[i].properties.mag + "</h3>" +
          "<p> Place: " + eqData[i].properties.place + "</p>")
        )};
    
    // Create marker layer
    let eqLayer = L.layerGroup(markers);

    // Create a tile layer.
    let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

   // Create a baseMaps object.
    let baseMaps = {
        "Street Map": streetMap,
    };

    // Create an overlay object.
    let overlayMaps = {
        "Earthquake Magnitude": eqLayer,
    };

    // Define a map object.
    let myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [streetMap, eqLayer]
        });
    
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    
});
