import L from 'leaflet';
import 'leaflet-fullscreen';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';

export default (opts, deps) => deps.map.then(map => L.control.fullscreen().addTo(map));
