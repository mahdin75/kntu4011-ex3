var map = new ol.Map({
  target: "map",
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([37.41, 8.82]),
    zoom: 4,
  }),
});
map.on("click", function (evt) {
  const coordinates = ol.proj.toLonLat(evt.coordinate);
  revserseGeocode(coordinates);
});

var vectorSource = new ol.source.Vector({});

var dinamicPinLayer = new ol.layer.Vector({
  source: vectorSource,
});

map.addLayer(dinamicPinLayer);

function addMarker(coordinates) {
  vectorSource.clear();
  const iconGeometry = new ol.geom.Point(ol.proj.fromLonLat(coordinates));
  var iconFeature = new ol.Feature({
    geometry: iconGeometry,
  });
  var iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 20],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      size: [24, 24],
      opacity: 1,
      src: "./marker.png",
    }),
  });
  iconFeature.setStyle(iconStyle);
  vectorSource.addFeatures([iconFeature]);
}
