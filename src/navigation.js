import L from 'leaflet';
import 'leaflet-navbar/src/Leaflet.NavBar';
import 'leaflet-navbar/src/Leaflet.NavBar.css';

export function bricjs(opts, map) {
  L.control.navbar({
    center: map.getCenter(),
    zoom: map.getZoom()
  }).addTo(map);
}
