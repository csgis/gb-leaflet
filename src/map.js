import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function bricjs(opts) {
  let map = L.map(opts.parent, opts.vendorOptions);

  if (opts.bounds) map.fitBounds(opts.bounds);

  return map;
}
