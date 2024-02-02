# leaflet-challenge
### Challenge 15 of UoB Data Analytics bootcamp - Mapping

## Content:
1. [Overview](https://github.com/catisf/leaflet-challenge?tab=readme-ov-file#1-overview)
2. [Repository structure](https://github.com/catisf/leaflet-challenge?tab=readme-ov-file#2-repository-structure)
3. [Set up and execution](https://github.com/catisf/leaflet-challenge?tab=readme-ov-file#3-set-up-and-execution)
4. [Data source](https://github.com/catisf/leaflet-challenge?tab=readme-ov-file#4-data-source)
5. [Source code](https://github.com/catisf/leaflet-challenge?tab=readme-ov-file#5-source-code)

## 1. Overview
The main aim of this assignment was to develope a way to visualize data from the United States Geological Survey (USGS).

Part 1 developed a way to visualize an earthquake dataset. The map displays all earthquakes in the last 30 days. The markers size reflect the magnitude of the earthquake, while their colour reflects the earthquake depth. Popups provide further information on the location the earthquake took place, as well as the magnitude and depth values.

<p align="center">
  <img src = "https://github.com/catisf/leaflet-challenge/blob/main/screenshots/Part1.png" height = "75%" width = "75%">
</p>
<h6 align="center">Fig. 1 - Screenshot of Part 1 visualisation</h6>

Part 2 (advanced challenge) builds on Part 1 and gathers and adds data on tectonic plates. It also provides the user with more interactive options. The user can choose to view different map tiles (street or topographic) and different layers (earthquakes data/and or tectonic plates).

<p align="center">
  <img src = "https://github.com/catisf/leaflet-challenge/blob/main/screenshots/Part2.png" height = "50%" width = "50%">
</p>
<h6 align="center">Fig. 1 - Screenshot of Part 2 visualisation</h6>

## 2. Repository structure
This repository contains:


## 3. Set up and execution
### Part 1
1. Clone the repository to your local computer: in your Terminal type `git clone https://github.com/catisf/leaflet-challenge.git`
2. Open `index.html` in your favourite web browser
3. You can choose whether or not to display the earthquake magnitude data by unticking the box on the top right of the page.

### Part 2
Follow the same steps as for part 1. If you get an error (or the map is not displayed), try the following:
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



