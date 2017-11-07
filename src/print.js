import L from 'leaflet';
import 'jquery';
// import 'leaflet-print';
// import 'leaflet-print/dist/leaflet.print.css';
import 'leaflet-print/dist/leaflet.print.css';
import 'leaflet-print/src/print.Provider';
import 'leaflet-print/src/Control.Print';

const DEFAULT_PROVIDER_OPTS = {
  autoLoad: true,
  dpi: 300,
  url: '/geoserver/pdf',
  outputFilename: 'map'
};

export function gl(opts, map) {
  let printProvider = L.print.provider(Object.assign({}, DEFAULT_PROVIDER_OPTS, opts.provider));
  let f = printProvider._getLayers.bind(printProvider);
  let rs = opts.urlRegexes;
  let matches = layer => !rs || rs.some(r => layer._url.match(r));
  printProvider._getLayers = function (x) {
    return f(x).filter(l => !l.isBaseLayer && matches(l));
  };

  let printControl = L.control.print({
    provider: printProvider
  });

  map.addControl(printControl);
}
