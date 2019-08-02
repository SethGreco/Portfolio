async function initMap() {
  // The location of Uluru
  const home = { lat: 29.4241, lng: -98.4936 };

  let pins = await getData();
  var cords = [];
  for (i = 0; i < pins.length; i++) {
    cords.push([pins[0].lat, pins[0].long]);
  }
  // The map, centered at Uluru
  const map = new google.maps.Map(document.querySelector(".map"), {
    zoom: 4,
    center: home
  });
  // The marker, positioned at Uluru

  for (i = 0; i < cords.length; i++) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(cords[i][0], cords[i][1]),
      map: map
    });
  }
}

function getData() {
  return fetch("http://localhost:3000/get").then(response => response.json());
}
