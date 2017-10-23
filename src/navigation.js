import L from 'leaflet';
import 'leaflet-navbar/src/Leaflet.NavBar';
import 'leaflet-navbar/src/Leaflet.NavBar.css';

export function gl(opts, map) {
  L.control.navbar().addTo(map);
}
