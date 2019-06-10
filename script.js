mapboxgl.accessToken = 'pk.eyJ1IjoiZmFsbHdhbGwiLCJhIjoiY2p3cWdsc25sMTlpZDN4bWc3d2ttNjFyYSJ9.MbCUR8jEU5qasNsLFkKBqA';

const path = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const input = document.querySelector("input");
const button = document.querySelector("button");

let antlat;
let antlng;

//beginning off ant coordinates
button.addEventListener("click", async () => {
  const searchable = input.value.replace(" ", "%20");
  const response = await axios.get(`${path}${searchable}.json?access_token=${mapboxgl.accessToken}`)

  const coordinates = response.data.features[0].geometry.coordinates;
  let lng = coordinates[0];
  let lat = coordinates[1]
  const lngConvert = (lgn) => {
    if (lng > 0) {
      return lng - 180;
    } else {
      return lng + 180;
    }
  }
  console.log(lng, lat);
  antlat = -lat;
  antlng = lngConvert(lng);

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [antlng, antlat],
    zoom: 2
  });

  map.addControl(new mapboxgl.NavigationControl());

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
        "icon-size": 0.25
      }
    });
  });
  input.value = "";
});


//end of ant coordinates


//map



/* given a query in the form "lng, lat" or "lat, lng" returns the matching
* geographic coordinate(s) as search results in carmen geojson format,
* https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
*/
// var coordinatesGeocoder = function (query) {
  // match anything which looks like a decimal degrees coordinate pair
  // var matches = query.match(/^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i);
  // if (!matches) {
  //   return null;
  // }

  // function coordinateFeature(lng, lat) {
  //   return {
  //     center: [lng, lat],
  //     geometry: {
  //       type: "Point",
  //       coordinates: [lng, lat]
  //     },
  //     place_name: 'Lat: ' + lat + ' Lng: ' + lng, // eslint-disable-line camelcase
  //     place_type: ['coordinate'], // eslint-disable-line camelcase
  //     properties: {},
  //     type: 'Feature'
  //   };
  // }

  // var coord1 = Number(matches[1]);
  // var coord2 = Number(matches[2]);
  // var geocodes = [];

  // if (coord1 < -90 || coord1 > 90) {
  //   // must be lng, lat
  //   geocodes.push(coordinateFeature(coord1, coord2));
  // }

  // if (coord2 < -90 || coord2 > 90) {
  //   // must be lat, lng
  //   geocodes.push(coordinateFeature(coord2, coord1));
  // }

  // if (geocodes.length === 0) {
  //   // else could be either lng, lat or lat, lng
  //   geocodes.push(coordinateFeature(coord1, coord2));
  //   geocodes.push(coordinateFeature(coord2, coord1));
  // }

//   return geocodes;
// };

// map.addControl(new MapboxGeocoder({
//   accessToken: mapboxgl.accessToken,
//   localGeocoder: coordinatesGeocoder,
//   zoom: 4,
//   placeholder: "Try: -40, 170",
//   mapboxgl: mapboxgl
// }));




