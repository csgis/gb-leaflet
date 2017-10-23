import L from 'leaflet';

export function gl(opts, map, layers) {
  let layerMap = {};
  layers.forEach(l => {
    layerMap[l.name] = l;
  });
  L.control.layers([], layerMap).addTo(map);
}
