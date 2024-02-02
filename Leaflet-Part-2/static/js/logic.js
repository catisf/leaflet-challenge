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


// Function to build the map
function buildMap([layer1, layer2]){
    // Create a tile layers
    let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

    let topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

   // Create a baseMaps object.
    let baseMaps = {
        "Street Map": streetMap,
        "Topographic": topoMap,
    };

    // Create an overlay object.
    let overlayMaps = {
        "Earthquake Magnitude": layer1,
        "Tectonic Plates": layer2,
    };

    // Define a map object.
    let myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [streetMap, topoMap, layer1, layer2]
        });
    
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    addLegend(myMap)
}

// Define marker colour
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


// Function to create the markers and plates layers
function createLayers(data1, data2){
    
    // create earthquake markers
    let eqData = data1.features;
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
          bindPopup("<h3> Location: " + eqData[i].properties.place + 
          "</br> _________________________________</h3>" +
          "<p> Magnitude: " + eqData[i].properties.mag + "</p>" +
          "<p> Depth: " + eqData[i].geometry.coordinates[2] + "</p>")
        )};
    
    // create tectonic plates layer
    let platesData = data2.features;
    let plates = [];

    for (let j = 0; j < platesData.length; j++) {
        
        let thisPlate = platesData[j].geometry.coordinates[0];
        console.log(thisPlate)
        let polygon = [];

        for (let l = 0; l < thisPlate.length; l++) {
            //console.log(thisPlate[l]);
            polygon.push([thisPlate[l][1],thisPlate[l][0]]);
        };

        plates.push(
            L.polygon([polygon], {
                color: "black",
                fillOpacity: 0,
                weight: 2.5,
              })
        );
    };
    
    // Create layer groups and call buildMap function
    let markerLayer = L.layerGroup(markers)
    let platesLayer = L.layerGroup(plates)
    buildMap([markerLayer, platesLayer]);

}

// function to get the tectonic plates data using the fetch API
function fetchJSON(url) {
    return fetch(url)
      .then(function(response) {
        return response.json();
      });
  }

// Fetch the data using D3 and use it to build the map
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (eqData){

  let platesData = fetchJSON("PB2002_plates.json"). then(function(platesData){
    console.log(platesData)
    createLayers (eqData, platesData)
  }); 
});