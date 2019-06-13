///API credential
mapboxgl.accessToken = 'pk.eyJ1IjoiZmFsbHdhbGwiLCJhIjoiY2p3cWdsc25sMTlpZDN4bWc3d2ttNjFyYSJ9.MbCUR8jEU5qasNsLFkKBqA';
const path = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
///UI element
const input = document.querySelector("input");
const button = document.querySelector("button");
const noise = document.querySelector("#noise");
const description = document.querySelector("#exp");
const nav = document.querySelector("nav");


//button event listener begins
button.addEventListener("click", async () => {
  description.innerHTML = "";     //clear previous search result
  noise.style.display = "none";     //remove noise effect once search initiates
  const searchable = input.value.replace(" ", "%20");     //format entered location
  const response = await axios.get(`${path}${searchable}.json?access_token=${mapboxgl.accessToken}`)
  const coordinates = response.data.features[0].geometry.coordinates;     //return the array of coordiantes
  let lng = coordinates[0];     //latitude
  let lat = coordinates[1];     //longitude
  //below: function to covert coordinate to antipode's coordinate
  const lngConvert = (lng) => {
    if (lng > 0) {
      return lng - 180;
    } else {
      return lng + 180;
    }
  }

  antlat = -lat;            //antipode's latitude
  antlng = lngConvert(lng); //antipode's longitude 
  //below: second API call from antipodes' coordinates;
  const antresponse = await axios.get(`${path}${antlng},${antlat}.json?types=country&access_token=${mapboxgl.accessToken}`);
  const countryname = antresponse.data.features;   ///return the array of inf or empty array
  let countryitem;
  /// if location is not in a specific country
  if (countryname.length) {     //empty array returns 0;
    countryitem = countryname[0].place_name;
  } else {
    countryitem = "somewhere in the water";
  }

  ///formating antipode's country name and coordinates;
  const antlat3 = antlat.toFixed(3);
  const antlng3 = antlng.toFixed(3);
  const placename = input.value.toUpperCase();
  const countryUpper = countryitem.toUpperCase();
  ///display antipode's info in text
  const desc = document.createElement("div");   //text info
  const globe = document.createElement("img");  //rorating globe
  desc.innerHTML = `<br>
  The antipode of ${placename} is (${antlat3}, ${antlng3}). <br>
  That's ${countryUpper}.
  `
  globe.setAttribute("src", "globe.png");
  globe.setAttribute("title", " Copyright 2019 Tibby Xu ");
  description.append(desc);
  description.append(globe);

  ///mapbox stuff;
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [antlng, antlat],
    zoom: 2
  });


  ///mapbox: add icon to antipodes' coordinate;
  map.loadImage('cat.png', function (error, image) {
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
        "icon-size": 0.1
      }
    });
  });
  input.value = "";
});

//click nav
nav.addEventListener("click", () => {
  const popup = document.createElement("div");
  popup.setAttribute("id", "popup");
  popup.innerHTML = `
  <br>
  
  <h2>THE PRONUNCIATION</h2>
  <h3><a href="https://www.dictionary.com/browse/antipode">Antipode Antipodes</a></h3>
  <h2>ANTIPODAL CITIES</h2>
  <ul>
  <li>Christchurch (New Zealand) — A Coruña (Spain)</li>
  <li>Levin (New Zealand) — Ávila (Spain)</li>
  <li>Hamilton (New Zealand) — Córdoba (Spain)</li>
  <li>Hong Kong — La Quiaca (Argentina)</li>
  <li>Lianyungang (China) — Junín (Argentina)</li>
  <li>Madrid (Spain) — Weber (New Zealand)</li>
  </ul>
  <h2>Read more on <a href="https://en.wikipedia.org/wiki/Antipodes">Wikipedia</a>...<h2>
  <h3>And, no, you can't <a href="https://www.atlasobscura.com/articles/the-hole-truth-about-why-we-dig-to-china">dig to China</a>.</h3>
  `
  document.body.append(popup);

  popup.addEventListener("click", () => { popup.remove(); })
})






