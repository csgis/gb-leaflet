import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function gl(opts) {
  let map = L.map(opts.id, opts.vendorOptions);

  if (opts.bounds) map.fitBounds(opts.bounds);

  return map;
}
