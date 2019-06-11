mapboxgl.accessToken = 'pk.eyJ1IjoiZmFsbHdhbGwiLCJhIjoiY2p3cWdsc25sMTlpZDN4bWc3d2ttNjFyYSJ9.MbCUR8jEU5qasNsLFkKBqA';

const path = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const input = document.querySelector("input");
const button = document.querySelector("button");
// const originalmap = document.querySelector("#map1");

// let antlat;
// let antlng;

//beginning off ant coordinates
button.addEventListener("click", async () => {
  const searchable = input.value.replace(" ", "%20");
  const response = await axios.get(`${path}${searchable}.json?access_token=${mapboxgl.accessToken}`)

  const coordinates = response.data.features[0].geometry.coordinates;
  let lng = coordinates[0];
  let lat = coordinates[1];
  const lngConvert = (lng) => {
    if (lng > 0) {
      return lng - 180;
    } else {
      return lng + 180;
    }
  }
  console.log(lng, lat);
  antlat = -lat;
  antlng = lngConvert(lng);

  // var map1 = new mapboxgl.Map({
  //   container: 'map',
  //   style: 'mapbox://styles/mapbox/streets-v11',
  //   center: [lng, lat],
  //   zoom: 2
  // });

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [antlng, antlat],
    zoom: 2
  });

  // var map1 = new mapboxgl.Map({
  //   container: 'map',
  //   style: 'mapbox://styles/mapbox/streets-v11',
  //   center: [lng, lat],
  //   zoom: 2
  // });
  // originalmap.append(map1);

  // map.addControl(new mapboxgl.NavigationControl());

  map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png', function (error, image) {
    if (error) throw error;
    map.addImage('cat', image);
    map.addLayer({
      "id": "points",
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": [{
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [antlng, antlat]
            }
          }]
        }
      },
      "layout": {
        "icon-image": "cat",
        "icon-size": 0.2
      }
    });
  });
  input.value = "";
});






