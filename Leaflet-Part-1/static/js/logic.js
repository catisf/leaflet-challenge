// Function to add a legend to the map
function addLegend(map){

    let legend = L.control({ position: "bottomright" });

    legend.onAdd = function() {
    
      let div = L.DomUtil.create("div", "info legend");
      let limits = [-10,10,30,50,70,90];
      let colors = ["#fde725","#7ad151","#22a884","#2a788e","#414487","#440154"];
    
      // Add a header to specify what the legend is showing
      div.innerHTML = "<h3>Earthquake Depth</h3>";

      // Loop through colours to assign a colour to each limit range
      for (let i = 0; i < colors.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '<br>' : '+');}

        return div;
  };
  
    // Adding the legend to the map
    legend.addTo(map);     
};
  


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

    addLegend(myMap)
}

function markerColor(thisMarker){
    
    // Define a colour for markers based on the depth of the earthquake
    // Starting with a lighter colour and moving towards darker tones
    if (thisMarker < 10){
        return "#fde725"
    } else if (thisMarker < 30){
        return "#7ad151"
    }
    else if (thisMarker < 50){
        return "#22a884"
    }
    else if (thisMarker < 70){
        return "#2a788e"
    }
    else if (thisMarker < 90){
        return "#414487"
    }
    else{
        return "#440154"
    };
};


// Function to create the markers
function createMarkers(response){
    let eqData = response.features;
    let markers = [];

    // loop through the data to create each circle
    for (let i = 0; i < eqData.length; i++) {
        // Setting the marker radius for the state by passing population into the markerSize function
        markers.push(
          L.circle([eqData[i].geometry.coordinates[1],eqData[i].geometry.coordinates[0]], {
            stroke: false,
            fillOpacity: 0.75,
            color: "black",
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

// Fetch the data using D3 and use it to build the map
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers)