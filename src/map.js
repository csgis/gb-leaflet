import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function gl(opts) {
  return L.map(opts.id, opts.vendorOptions);
}

// export default function factory(opts) {
//
// }
