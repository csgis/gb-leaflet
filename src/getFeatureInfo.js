import L from 'leaflet';
import WMS from 'leaflet.wms/src/leaflet.wms';

export function gl(opts, map, layers) {
  // source -> layer names
  let sourceLayers = {};
  // url -> source
  let urlSources = {};

  function getSource(layer) {
    let url = layer._url;
    if (!urlSources[url]) {
      urlSources[url] = WMS.source(url, {
        untiled: false,
        transparent: true,
        format: 'image/png',
        info_format: 'text/html',
        feature_count: 10
      });
      urlSources[url].addTo(map);
    }
    return urlSources[url];
  }

  function getLayers(source) {
    if (!sourceLayers[source]) {
      sourceLayers[source] = [];
    }
    return sourceLayers[source];
  }

  layers.forEach(layer => {
    if (!opts.layers || !opts.layers.includes(layer.id) || !(layer instanceof L.TileLayer.WMS)) return;
    let source = getSource(layer);
    getLayers(source).push(layer.options.layers);
  });

  map.on('click', function (e) {
    let sources = [];
    map.eachLayer(function (layer) {
      if (layer instanceof L.TileLayer.WMS) {
        let source = urlSources[layer._url];
        if (source && !sources.includes(source)) sources.push(source);
      }
    });
    sources.forEach(s => s.getFeatureInfo(e.containerPoint, e.latlng, sourceLayers[s], s.showFeatureInfo));
  });
}
