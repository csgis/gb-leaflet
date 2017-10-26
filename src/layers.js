import L from 'leaflet';
import 'leaflet-timedimension/dist/leaflet.timedimension.src';
import 'leaflet-timedimension/dist/leaflet.timedimension.control.css';
import 'leaflet-bing-layer';
import 'iso8601-js-period';

let tile = l => L.tileLayer(l.url, {
  id: l.id,
  attribution: l.attribution
});

function wms(l) {
  let layer = L.tileLayer.wms(l.url, Object.assign({}, l.params, {
    layers: l.params.layers,
    attribution: l.attribution,
    transparent: l.params.transparent !== false,
    format: l.params.format || 'image/png'
  }));
  return l.time ? L.timeDimension.layer.wms(layer) : layer;
}

function bing(l) {
  return L.tileLayer.bing(l.key);
}

export function gl(layers, map) {
  let leafletLayers = [];
  layers.forEach(l => {
    let layer;

    if (l.type === 'tile') {
      layer = tile(l);
    } else if (l.type === 'wms') {
      layer = wms(l);
    } else if (l.type === 'bing') {
      layer = bing(l);
    }

    if (layer) {
      layer.id = l.id;
      layer.name = l.name;
      layer.isBaseLayer = l.isBaseLayer;
      leafletLayers.push(layer);
      layer.addTo(map);
    }
  });

  return leafletLayers;
}
