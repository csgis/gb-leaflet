import 'leaflet-toolbar';
import 'leaflet-toolbar/dist/leaflet.toolbar.css';

export default (opts, deps) => {
  let promises = [deps.map];
  for (let name in deps) {
    if (opts.includes(name)) promises.push(deps[name]);
  }

  Promise.all(promises).then(([map, ...actions]) => {
    return new LeafletToolbar.Control({ // eslint-disable-line no-undef
      actions,
      position: 'topleft'
    }).addTo(map);
  });
};
