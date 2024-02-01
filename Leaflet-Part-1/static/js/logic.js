// Function to the map
function buildMap(markerLayer){
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
        "Earthquake Magnitude": markerLayer,
    };

    // Define a map object.
    let myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [streetMap, markerLayer]
        });
    
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}

function markerColor(thisMarker){
    console.log(thisMarker)
    if (thisMarker < 10){
        return "green"
    } else if (thisMarker < 30){
        return "blue"
    }
    else if (thisMarker < 50){
        return "yellow"
    }
    else if (thisMarker < 70){
        return "orange"
    }
    else{
        return "red"
    };
};


// Function to create the markers
function createMarkers(response){
    let eqData = response.features;
    let markers = [];

    for (let i = 0; i < eqData.length; i++) {
        // Setting the marker radius for the state by passing population into the markerSize function
        markers.push(
          L.circle([eqData[i].geometry.coordinates[1],eqData[i].geometry.coordinates[0]], {
            stroke: false,
            fillOpacity: 0.75,
            color: "white",
            fillColor: markerColor(eqData[i].geometry.coordinates[2]),
            radius: eqData[i].properties.mag*20000
          }).
          bindPopup("<h3> Magnitude: " + eqData[i].properties.mag + "</h3>" +
          "<p> Place: " + eqData[i].properties.place + "</p>" +
          "<p> Depth: " + eqData[i].geometry.coordinates[2] + "</p>")
        )};
    
    // Create marker layer
    buildMap(L.layerGroup(markers));
}

// Fetch the data using D3
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers)