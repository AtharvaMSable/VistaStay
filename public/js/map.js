mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  style: "mapbox://styles/mapbox/streets-v12",
  zoom: 9, // starting zoom
});

// Create a new marker.
const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates) //listing/geomertyu / coordinatre
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h4>${listing.title}</h4><p>You'll be living here!</p>`
    )
  )
  .addTo(map);
