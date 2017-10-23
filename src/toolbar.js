import 'leaflet-toolbar';
import 'leaflet-toolbar/dist/leaflet.toolbar.css';

export default (opts, ...deps) => {
  let map = deps.shift();
  return new LeafletToolbar.Control({ // eslint-disable-line no-undef
    deps,
    position: 'topleft'
  }).addTo(map);
};
