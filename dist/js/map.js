async function initMap() {
  // Home location of map
  const home = { lat: 29.4241, lng: -98.4936 };

  // Set up the map, zoom and center
  const map = new google.maps.Map(document.querySelector(".map"), {
    zoom: 4,
    center: home
  });

  //Fetch records from mongoDB
  let pins = await getData();

  //iterate over the records and turn each one into a marker.
  for (i = 0; i < pins.length; i++) {
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(pins[i].lat, pins[i].long),
      map: map
    });
  }
}

function getData() {
  return fetch("https://fierce-crag-41814.herokuapp.com/get").then(response =>
    response.json()
  );
}
