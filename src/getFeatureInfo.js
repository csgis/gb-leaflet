import L from 'leaflet';
import WMS from 'leaflet.wms/src/leaflet.wms';
import {urlify} from './helper'

/* custom callback for leaflet.wms
 * see: https://github.com/heigeo/leaflet.wms/blob/gh-pages/src/leaflet.wms.js#L213
 */ 
function showFeatureInfo(latlng, info) {
      if (!this._map) {
          return;
      }
      if( !new RegExp(/<body>\s+<\/body>/g).test(info) )
        this._map.openPopup(urlify(info), latlng);
  }
  
export function bricjs(opts, map, layers) {
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

  layers.forEach(l => {
    let layer = l;
    if (layer instanceof L.TimeDimension.Layer) layer = layer._currentLayer;
    if (!opts.layers || !opts.layers.includes(l.id) || !(layer instanceof L.TileLayer.WMS)) return;
    let source = getSource(layer);
    getLayers(source).push(layer.options.layers);
  });

  map.on('click', function (e) {
    let sources = [];
    map.eachLayer(function (l) {
      let layer = l;
      if (layer instanceof L.TimeDimension.Layer) layer = layer._currentLayer;
      if (layer instanceof L.TileLayer.WMS) {
        let source = urlSources[layer._url];
        if (source && !sources.includes(source)) sources.push(source);
      }
    });
    sources.forEach(s => s.getFeatureInfo(e.containerPoint, e.latlng, sourceLayers[s], showFeatureInfo));
  });
}
