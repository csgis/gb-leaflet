import L from 'leaflet';
import 'leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.src';
import 'leaflet.coordinates/dist/Leaflet.Coordinates-0.1.5.css';

const DEFAULT_OPTS = {
  position: 'bottomleft', // optional default "bootomright"
  decimals: 6, // optional default 4
  decimalSeperator: '.', // optional default "."
  labelTemplateLat: 'Lat: {y}', // optional default "Lat: {y}"
  labelTemplateLng: 'Lon: {x}', // optional default "Lng: {x}"
  enableUserInput: false, // optional default true
  useDMS: false, // optional default false
  useLatLngOrder: true, // ordering of labels, default false-> lng-lat
  markerType: L.marker, // optional default L.marker
  markerProps: {} // optional default {},
};

export function bricjs(opts, map) {
  L.control.coordinates(Object.assign({}, DEFAULT_OPTS, opts)).addTo(map);
}
