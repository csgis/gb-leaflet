import L from 'leaflet';
import 'leaflet-zoombox';
import 'leaflet-zoombox/L.Control.ZoomBox.css';
import './zoomBox.css';

export function bricjs(opts, map) {
  L.control.zoomBox({ modal: false }).addTo(map);
}
