import L from 'leaflet';
import 'jquery';
import 'leaflet-print';
import 'leaflet-print/dist/leaflet.print.css';

export function gl(opts, map) {
  let printProvider = L.print.provider({
    method: 'GET',
    url: opts.url,
    autoLoad: true,
    dpi: 90
  });

  let printControl = L.control.print({
    provider: printProvider
  });

  map.addControl(printControl);
}
