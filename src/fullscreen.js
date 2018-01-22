import L from 'leaflet';
import 'leaflet-fullscreen';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';

export function bricjs(opts, map) {
  return L.control.fullscreen().addTo(map);
}
