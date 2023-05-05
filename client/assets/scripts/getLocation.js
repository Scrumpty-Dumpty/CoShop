let c = function (pos) {
  let latitude = pos.coords.latitude;
  let longitude = pos.coords.longitude;
  let coords = latitude + "," + longitude;

  document
    .getElementById("googleMap")
    .setAttribute(
      "src",
      "https://maps.google.co.uk?q=" + coords + "&z=60&output=embed"
    );
};

function getLocation() {
  navigator.geolocation.getCurrentPosition(c);
  return false;
}
