import L from 'leaflet';

let tile = l => L.tileLayer(l.url, {
  id: l.id,
  attribution: l.attribution
});

let wms = l => L.tileLayer.wms(l.url, {
  layers: l.layers,
  attribution: l.attribution,
  transparent: true,
  format: 'image/png'
});

export function gl(layers, map) {
  let leafletLayers = [];
  layers.forEach(l => {
    let layer;

    if (l.type === 'tile') {
      layer = tile(l);
    } else if (l.type === 'wms') {
      layer = wms(l);
    }

    if (layer) {
      layer.id = l.id;
      layer.name = l.name;
      leafletLayers.push(layer);
      layer.addTo(map);
    }
  });

  return leafletLayers;
}
