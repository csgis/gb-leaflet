import L from 'leaflet';

export default (opts, deps) => Promise.all([
  deps.map, deps.layers
]).then(([map, layers]) => {
  let layerMap = {};
  layers.forEach(l => {
    layerMap[l.name] = l;
  });
  L.control.layers([], layerMap).addTo(map);
});
