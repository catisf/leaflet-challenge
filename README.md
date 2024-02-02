# leaflet-challenge
### Challenge 15 of UoB Data Analytics bootcamp - Mapping

## Content:
1. [Overview](https://github.com/catisf/leaflet-challenge?tab=readme-ov-file#1-overview)
2. [Repository structure](https://github.com/catisf/leaflet-challenge?tab=readme-ov-file#2-repository-structure)
3. [Set up and execution](https://github.com/catisf/leaflet-challenge?tab=readme-ov-file#3-set-up-and-execution)
4. [Data source](https://github.com/catisf/leaflet-challenge?tab=readme-ov-file#4-data-source)
5. [Source code](https://github.com/catisf/leaflet-challenge?tab=readme-ov-file#5-source-code)

## 1. Overview
The main aim of this assignment was to develop a way to visualize data from the United States Geological Survey (USGS).

In Part 1 I developed a way to visualize an earthquake dataset. The map displays all earthquakes in the last 30 days. The markers' size reflects the magnitude of the earthquake, while their colour reflects the earthquake depth. Clicking on a marker provides further information on the location of the earthquake, as well its magnitude and depth values.<br/>

<p align="center">
  <img src = "https://github.com/catisf/leaflet-challenge/blob/main/screenshots/Part1.png" height = "75%" width = "75%">
</p>
<h6 align="center">Fig. 1 - Screenshot of Part 1 visualisation</h6>

Part 2 (advanced challenge) builds on Part 1 and gathers and adds data on tectonic plates. It also provides the user with more interactive options: the user can choose to view different map tiles (street or topographic) and different layers (earthquake data/and or tectonic plates).

<p align="center">
  <img src = "https://github.com/catisf/leaflet-challenge/blob/main/screenshots/Part2.png" height = "75%" width = "75%">
</p>
<h6 align="center">Fig. 2 - Screenshot of Part 2 visualisation</h6>

## 2. Repository structure
This repository contains:
- [`Leaflet-Part-1`](https://github.com/catisf/leaflet-challenge/tree/main/Leaflet-Part-1), with all the files needed to run the earthquake data visualisation, including html `index.html`, css code `static/css/style.css`, and javascript `static/js/logic.js` code;
- [`Leaflet-Part-2`](https://github.com/catisf/leaflet-challenge/tree/main/Leaflet-Part-2), contains files needed to run the earthquake and tectonic plates data visualisation. This included html `index.html`, css code `static/css/style.css`, and javascript `static/js/logic.js` code, as well as a data file `PB2002_plates.json` with tectonic plates data;
- [`screenshots`](https://github.com/catisf/leaflet-challenge/tree/main/screenshots) folder, with screenshot images of the visualisations. 


## 3. Set up and execution
### Part 1
1. Clone the repository to your local computer. In your Terminal type `git clone https://github.com/catisf/leaflet-challenge.git`
2. Open `index.html` in your favourite web browser
3. You can choose whether or not to display the earthquake data by unticking the box on the top right of the page.

### Part 2
Follow the same steps as for Part 1. If you get an error (or the map is not displayed), try the following:
1. In the terminal, navigate to your Part2 folder and type `python -m http.server`
> [!NOTE]
> You will need to have python installed.
2. Open http://localhost:port. As an example, if Python serves you port 8000, you would visit http://localhost:8000 to access the map. 
3. Enjoy the map! You can change the map layer, and whether you want to see earthquake magnitude, tectonic plates or both by ticking/unticking the box on the top right of the page. 

## 4. Data source
- Earthquake data: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
- Tectonic plates data: https://github.com/fraxen/tectonicplates/

## 5. Source code
Code to fetch json data from a local file was adapted from [here](https://stackoverflow.com/questions/55966676/how-can-i-assign-the-contents-of-a-geojson-file-to-a-variable-in-javascript).



