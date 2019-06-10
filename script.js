// const PATH = "https://crossorigin.me/https://maps.googleapis.com/maps/api/geocode/json?"
const API_KEY = "AIzaSyDqiRMEOLbJ-TjANFLP3-3GZtsx-YkEQYs";

const O_PATH = "https://api.opencagedata.com/"
const O_API_KEY = "38336e1de3a147a7b157ab7dcc5d27a6";

//UI elements
const input = document.querySelector("input");
const button = document.querySelector("button");
const iframe = document.querySelector("iframe");



// //Google Maps
// button.addEventListener("click", async () => {
//   const searchname = input.value.split(" ").join("+");
//   console.log(searchname)
//   const response = await axios.get(`${PATH}?address=${searchname}&key=${API_KEY})`);
//   console.log(response);
//   const lat = response.results.geometry.location.lat;
//   const lng = response.results.geometry.location.lat;
//   console.log(lat, lng);
// })
//convert coordinates 
const lgnConvert = (lgn) => {
  if (lgn > 0) {
    return lgn - 180;
  } else {
    return lgn + 180;
  }
}
// below code totally works to return lat / lng opencagedata.com in case Google Maps fails
button.addEventListener("click", async () => {
  const searchname = input.value;
  console.log(searchname);
  const response = await axios.get(`${O_PATH}geocode/v1/json?q=${searchname}&key=${O_API_KEY}&language=en&pretty=1`)
  console.log(response.data);
  const lat = response.data.results[0].geometry.lat;
  const lng = response.data.results[0].geometry.lng;
  const antlat = -lat;
  const antlng = lgnConvert(lng);
  const url = `https://www.mapquest.com/embed/latlng/${antlat},${antlng}?center=${antlat},${antlng}&zoom=5&maptype=map`
  iframe.setAttribute("src", url)
})




