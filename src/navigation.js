import L from 'leaflet';
import 'leaflet-navbar/src/Leaflet.NavBar';
import 'leaflet-navbar/src/Leaflet.NavBar.css';

export default (opts, deps) => deps.map.then(map => L.control.navbar().addTo(map));
