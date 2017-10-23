import 'leaflet-toolbar';
import 'leaflet-toolbar/dist/leaflet.toolbar.css';

export function gl(opts, ...deps) {
  let map = deps.shift();
  return new LeafletToolbar.Control({ // eslint-disable-line no-undef
    actions: deps,
    position: 'topleft'
  }).addTo(map);
}
