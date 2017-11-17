import L from 'leaflet';

export function bricjs(opts, map, layers) {
  function fill(layerMap, layerArray) {
    layerArray.forEach(l => {
      layerMap[l.name] = l;
    });
  }
  let baseLayers = {};
  fill(baseLayers, layers.filter(l => l.isBaseLayer));

  let overlays = {};
  fill(overlays, layers.filter(l => !l.isBaseLayer));

  L.control.layers(baseLayers, overlays).addTo(map);
}
