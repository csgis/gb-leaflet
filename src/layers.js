import L from 'leaflet';
import WMS from 'leaflet.wms';

let tile = l => L.tileLayer(l.url, {
  id: l.id,
  attribution: l.attribution
});

let sources = {};

function wms(l) {
  if (!sources[l.url]) {
    sources[l.url] = WMS.source(l.url, {
      transparent: true,
      format: 'image/png',
      info_format: 'text/html',
      feature_count: 10
    });
  }
  return sources[l.url].getLayer(l.layers);
}

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
