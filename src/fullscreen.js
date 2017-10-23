import L from 'leaflet';
import 'leaflet-fullscreen';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';

export let gl = (opts, map) => L.control.fullscreen().addTo(map);
