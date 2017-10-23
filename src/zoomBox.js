import L from 'leaflet';
import 'leaflet-zoombox';
import 'leaflet-zoombox/L.Control.ZoomBox.css';
import './zoomBox.css';

export default (opts, deps) => deps.map.then(map => L.control.zoomBox({modal: false}).addTo(map));
